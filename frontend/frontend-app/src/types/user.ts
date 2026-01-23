export interface User {
  id:  number;
  name: string;
  email: string;
  role: string;
}

export interface UserCreate {
  name: string;
  email: string;
  role: string;
}

export interface UserUpdate {
  name?: string;
  email?: string;
  role?: string;
}