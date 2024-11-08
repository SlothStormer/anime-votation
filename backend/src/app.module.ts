import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VotesModule } from './votes/votes.module';
import { EndingsModule } from './endings/endings.module';

@Module({
  imports: [AuthModule, UsersModule, VotesModule, EndingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
