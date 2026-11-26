import { appStore } from '../state/store';
import { QuotationState } from '../types';

export class PreviewRenderer {
  constructor() {
    appStore.subscribe((state) => this.render(state));
  }

  private render(state: QuotationState) {
    (document.getElementById('pv-refNo') as HTMLElement).innerText = state.refNo;
    (document.getElementById('pv-date') as HTMLElement).innerText = state.date;
    (document.getElementById('pv-client') as HTMLElement).innerText = state.clientDetails;
    (document.getElementById('pv-subject') as HTMLElement).innerText = `Sub : ${state.subject}`;
    (document.getElementById('pv-size') as HTMLElement).innerText = state.sizeSpecification;

    (document.getElementById('pv-costNum') as HTMLElement).innerText = state.totalCost.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    (document.getElementById('pv-costWords') as HTMLElement).innerText = state.costInWords;
    (document.getElementById('pv-delivery') as HTMLElement).innerText = state.deliveryTerms;
    (document.getElementById('pv-payment') as HTMLElement).innerText = state.paymentTerms;

    // Render columns
    this.renderPricedList('pv-material-list', state.materials, state.itemPrices.material);
    this.renderPricedList('pv-body-list', state.body, state.itemPrices.body);
    this.renderPricedList('pv-panel-list', state.panel, state.itemPrices.panel);
    this.renderPricedList('pv-labour-list', state.labourCharges, state.itemPrices.labour);

    // Letterhead visibility handling
    const header = document.getElementById('pv-header');
    const spacer = document.getElementById('pv-header-spacer');
    if (state.blankLetterheadMode) {
      header?.classList.add('hide-letterhead');
      spacer?.classList.remove('hidden');
    } else {
      header?.classList.remove('hide-letterhead');
      spacer?.classList.add('hidden');
    }
  }

  private renderNumberedList(elementId: string, items: string[]) {
    const container = document.getElementById(elementId) as HTMLElement;
    container.innerHTML = items
      .map((item, idx) => `
        <div class="flex">
          <span class="w-5 text-slate-500 font-mono">${String(idx + 1).padStart(2, '0')})</span>
          <span>${item}</span>
        </div>
      `)
      .join('');
  }

  private renderMaterialList(materials: string[], materialPrices: Record<string, number>) {
    const container = document.getElementById('pv-material-list') as HTMLElement;
    container.innerHTML = materials
      .map((material, idx) => {
        const price = materialPrices[material] ?? 0;
        return `
        <div class="flex justify-between gap-2">
          <span class="w-5 shrink-0 text-slate-500 font-mono">${String(idx + 1).padStart(2, '0')})</span>
          <span class="flex-1">${material}</span>
          ${price > 0 ? `<span class="shrink-0">₹${price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>` : ''}
        </div>
      `;
      })
      .join('');
  }

  private renderPricedList(elementId: string, items: string[], itemPrices: Record<string, number>) {
    const container = document.getElementById(elementId) as HTMLElement;
    container.innerHTML = items
      .map((item, idx) => {
        const price = itemPrices[item] ?? 0;
        return `
        <div class="flex justify-between gap-2">
          <span class="w-5 shrink-0 text-slate-500 font-mono">${String(idx + 1).padStart(2, '0')})</span>
          <span class="flex-1">${item}</span>
          ${price > 0 ? `<span class="shrink-0">₹${price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>` : ''}
        </div>
      `;
      })
      .join('');
  }
}