import multer from 'multer';
import { injectable } from 'inversify';
import { RequestHandler } from 'express';
import { IStorageService } from './IStorageService';
import * as path from 'path';

@injectable()
class StorageService implements IStorageService {
  public getConfig(name: string): RequestHandler {
    const storage = multer.diskStorage({
      destination: function(_req, _file, cb) {
        cb(null, path.resolve(process.cwd(), `localStorage/${name}`));
      },
      filename: function(_req, file, cb) {
        cb(null, file.originalname);
      },
    });

    const upload = multer({ storage: storage });

    return upload.single('file');
  }
}

export default StorageService;
