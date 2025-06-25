

export interface Created {
  id: string;
  name: string;
  description: string;
  price:  number;
  customizable: boolean;
  imageUrl: string | File ;
  category : string;
  collection : string
  custom: boolean;
}