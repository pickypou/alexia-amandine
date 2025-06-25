import type {  Created }from '@entities/created';

export interface CreatedRepository {
  getAll(): Promise<Created[]>;
  getById(id: string): Promise<Created | null>;
  add(created: Created): Promise<Created | boolean>;
  update(id: string, couture: Created): Promise<Created | null>;
  delete(id: string): Promise<boolean>;
  custom(id: string): Promise<boolean>
}