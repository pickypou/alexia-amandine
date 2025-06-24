

export interface Couture {
  id: string;
  name: string;
  description: string;
  price: number;
  customizable: boolean;
  imageUrl: string | File;
  category : string;
  custom: boolean;
}