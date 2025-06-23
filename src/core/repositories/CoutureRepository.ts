import type { Couture }from '@entities/Couture';

export interface CoutureRepository {
  getAllCoutures(): Promise<Couture[]>;
  getCoutureById(id: string): Promise<Couture | null>;
  addCouture(couture: Couture): Promise<Couture | boolean>;
  updateCouture(id: string, couture: Couture): Promise<Couture | null>;
  deleteCouture(id: string): Promise<boolean>;
}