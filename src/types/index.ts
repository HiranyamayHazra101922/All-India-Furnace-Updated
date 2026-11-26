export type Category = 'material' | 'body' | 'panel' | 'labour';

export interface ComponentItem {
  id: string;
  name: string;
  defaultCategory: Category;
}

export interface QuotationState {
  refNo: string;
  date: string;
  clientDetails: string;
  subject: string;
  sizeSpecification: string;
  materials: string[];
  itemPrices: Record<Category, Record<string, number>>;
  body: string[];
  panel: string[];
  labourCharges: string[];
  totalCost: number;
  costInWords: string;
  deliveryTerms: string;
  paymentTerms: string;
  blankLetterheadMode: boolean;
}