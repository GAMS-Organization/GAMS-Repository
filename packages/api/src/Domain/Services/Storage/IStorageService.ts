import { RequestHandler } from 'express';

export interface IStorageService {
  getConfig(): RequestHandler;
}
