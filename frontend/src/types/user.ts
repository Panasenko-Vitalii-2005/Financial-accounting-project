export interface User {
  id: number;
  email: string;
  username: string;
  createdAt?: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}
