import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/providers/auth.guard';
import { Configuration } from './configuration.entity';
import { ConfigurationService } from './configuration.service';
import { UpdateConfigurationDto } from './dto/update.configuration.dto';

@Controller('configuration')
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  @Get()
  findOne(): Promise<Configuration> {
    return this.configurationService.findOne();
  }

  @Put('/alter/:id')
  @UseGuards(AuthGuard)
  alterConfig(
    @Body() updateConfigurationDto: UpdateConfigurationDto,
    @Param('id') id: number,
  ) {
    return this.configurationService.alterConfig(updateConfigurationDto, id);
  }
}
