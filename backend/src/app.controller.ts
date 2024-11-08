import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/status')
  @ApiOperation({
    summary: 'Returns the status of the API',
  })
  getStatus(): any {
    return this.appService.getStatus();
  }
}
