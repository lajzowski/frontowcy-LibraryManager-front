export interface UserI {
  id: string;
  firstname: string;
  lastname: string;
  cardNumber: number;
  rule: string;
  email: string;
  token: string | null;
}
