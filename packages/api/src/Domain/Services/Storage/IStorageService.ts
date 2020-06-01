import { RequestHandler } from 'express';

export interface IStorageService {
  getConfig(path: string): RequestHandler;
}
