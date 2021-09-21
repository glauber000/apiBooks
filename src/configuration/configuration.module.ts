import { Module } from '@nestjs/common';
import { AuthGuard } from 'src/providers/auth.guard';
import { usersProviders } from 'src/users/users.providers';
import { UsersService } from 'src/users/users.service';
import { DatabaseModule } from '../database/database.module';
import { ConfigurationController } from './configuration.controller';
import { configurationProviders } from './configuration.providers';
import { ConfigurationService } from './configuration.service';

@Module({
  controllers: [ConfigurationController],
  imports: [DatabaseModule],
  providers: [
    ...configurationProviders,
    ConfigurationService,
    AuthGuard,
    ...usersProviders,
    UsersService,
  ],
})
export class ConfigurationModule {}
