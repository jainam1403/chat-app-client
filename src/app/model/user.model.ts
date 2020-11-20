export interface UserDetails {
  _id: string;
  phone_number: number;
  exp: number;
  iat: number;
}

export interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  phone_number: any;
  password: string;
}
