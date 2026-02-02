// Interfaz transformada
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    isValid: boolean;
  };
  [key: string]: any;
}