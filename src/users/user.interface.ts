export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: number;
  country?: string;
  city?: string;
}
