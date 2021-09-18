import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { reservesProviders } from './reverves.providers';
import { ReservesService } from './reserves.service';
import { ReservesController } from './reserves.controller';

@Module({
  controllers: [ReservesController],
  imports: [DatabaseModule],
  providers: [...reservesProviders, ReservesService],
})
export class PhotoModule {}
