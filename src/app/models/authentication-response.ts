export interface AuthenticationResponse {
  userID: string;
  personName: string;
  email: string;
  gender: string;
  token: string;
  isSuccessful: boolean;
}
