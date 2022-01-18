import jwt from 'jsonwebtoken';
import { config } from '../common/config';
import { AppJwtPayload } from '../types/types';

export const sign = (payload: AppJwtPayload) =>
  jwt.sign(payload, String(config.JWT_SECRET_KEY));
