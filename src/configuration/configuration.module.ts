import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ConfigurationController } from './configuration.controller';
import { configurationProviders } from './configuration.providers';
import { ConfigurationService } from './configuration.service';

@Module({
  controllers: [ConfigurationController],
  imports: [DatabaseModule],
  providers: [...configurationProviders, ConfigurationService],
})
export class ConfigurationModule {}
