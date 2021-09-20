import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { reservesProviders } from './reverves.providers';
import { ReservesService } from './reserves.service';
import { ReservesController } from './reserves.controller';
import { configurationProviders } from 'src/configuration/configuration.providers';
import { ConfigurationService } from 'src/configuration/configuration.service';

@Module({
  controllers: [ReservesController],
  imports: [DatabaseModule],
  providers: [
    ...reservesProviders,
    ReservesService,
    ...configurationProviders,
    ConfigurationService,
  ],
})
export class ReservesModule {}
