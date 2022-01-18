import jwt from 'jsonwebtoken';
import { config } from '../common/config';
import { AppJwtPayload } from '../types/types';

export const verify = (token: string) =>
  jwt.verify(token, String(config.JWT_SECRET_KEY)) as AppJwtPayload;
