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

export interface UserToResponse {
  id: string;
  name: string;
  login: string;
}
export interface TaskToResponse {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
}
export interface TokenToResponse {
  token: string;
}
