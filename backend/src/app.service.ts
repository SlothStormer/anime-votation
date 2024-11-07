import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(): any {
    return {
      message: 'API functionando! 🎉🎉🎉',
      status: 200,
    };
  }
}
