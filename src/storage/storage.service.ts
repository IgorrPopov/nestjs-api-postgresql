import { Bucket, Storage } from '@google-cloud/storage';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Stream } from 'stream';
import { storageBucketName } from './config/storage.config';

@Injectable()
export class StorageService {
  private readonly storage: Storage;
  private readonly bucket: Bucket;

  constructor() {
    this.storage = new Storage();
    this.bucket = this.storage.bucket(storageBucketName);
  }

  public async uploadFile(file: Express.Multer.File): Promise<void> {
    try {
      await this.bucket.file(file.originalname).save(file.buffer); 
    } catch (error) {
      throw new BadRequestException('Unable to upload file unexpected error occurred');
    }
  }

  public async downloadFile(fileName: string): Promise<Buffer> {
    const stream = this.bucket.file(fileName).createReadStream();    
          
    try {
      return await this.streamToBuffer(stream);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  private streamToBuffer(stream: Stream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      let buffer = Buffer.alloc(0);
        
      stream.on('data', (data: Buffer) => { 
        buffer = Buffer.concat([buffer, data]); 
      });
    
      stream.on('error', (data: Buffer) => { 
        reject(data);
      });
    
      stream.on('end', () => { 
        resolve(buffer); 
      });
    });
  }
}
