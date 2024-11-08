import { Injectable } from '@nestjs/common';

interface Status {
  message: string;
  upTime: string;
  status: number;
}

@Injectable()
export class AppService {
  private startUpTime = Date.now();

  private formatUptime(ms: number): string {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  getStatus(): Status {
    const upTimeMs = Date.now() - this.startUpTime;
    return {
      message: 'API funcionando! 🎉🎉',
      upTime: this.formatUptime(upTimeMs),
      status: 200,
    };
  }
}
