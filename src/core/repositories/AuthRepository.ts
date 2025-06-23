import type { User } from "@entities/User";

export interface AuthRepository {
  register(email: string, password: string, userName: string): Promise<User>;
  login(email: string, password: string): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}
