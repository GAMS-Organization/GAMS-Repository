import multer from 'multer';
import { injectable } from 'inversify';
import { RequestHandler } from 'express';
import { IStorageService } from './IStorageService';

@injectable()
class StorageService implements IStorageService {
  public getConfig(): RequestHandler {
    const storage = multer.diskStorage({
      destination: function(_req, _file, cb) {
        cb(null, '/home/');
      },
      filename: function(_req, file, cb) {
        cb(null, file.originalname + '-' + Date.now());
      },
    });

    const upload = multer({ storage: storage });

    return upload.single('file');
  }
}

export default StorageService;
