import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Move } from './models/move.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('init')
  init(): string {
    return this.appService.init();
  }

  @Get('reset')
  reset(): string {
    return this.appService.reset();
  }

  @Post('setMove')
  async setMove(@Body() move: Move){
    return this.appService.setMove(move);
  }
}
