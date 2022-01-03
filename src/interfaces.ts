interface IUser {
  exp: number;
  iat: number;
  token: string;
}

interface IMember {
  firstName: string;
  lastName: string;
  address: string;
  ssn: string;
}

export type { IUser, IMember }
