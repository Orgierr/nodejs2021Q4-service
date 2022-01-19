import jwt from 'jsonwebtoken';
import { config } from '../common/config';
import { logger } from '../logger/logger';
import { AppJwtPayload } from '../types/types';

export const verify = (token: string) => {
  try {
    return jwt.verify(token, String(config.JWT_SECRET_KEY)) as AppJwtPayload;
  } catch (error) {
    logger.error(error);
    return false;
  }
};
