import { JwtPayload } from 'jsonwebtoken';
export type IdParamsType = { id: string };
export type TaskParamsType = { boardId: string; taskId: string };
export type UserAuthType = { login: string; password: string };
export type ExceptionResponse = {
  statusCode: number;
  message: string;
};

export interface AppJwtPayload extends JwtPayload {
  userId: string;
  login: string;
}

export interface TokenToResponse {
  token: string;
}
