export class AuthCredsDto {
  user: {
    id: string;
    email: string;
    name: string;
    surname: string;
    role: string;
  };
  accessToken: string;
}
