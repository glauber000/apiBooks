import { Controller, Get } from '@nestjs/common';
import { Configuration } from './configuration.entity';
import { ConfigurationService } from './configuration.service';

@Controller('configuration')
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  @Get()
  findOne(): Promise<Configuration> {
    return this.configurationService.findOne();
  }
}
