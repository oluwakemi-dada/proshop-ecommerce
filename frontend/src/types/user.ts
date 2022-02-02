export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface UserWithToken extends User {
  token: string;
}

export interface UserWithPassword extends User {
	password: string;
}