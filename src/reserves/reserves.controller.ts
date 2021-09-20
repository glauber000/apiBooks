import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateReservesDto } from './dto/create.reserves.dto';
import { Reserves } from './reserves.entity';
import { ReservesService } from './reserves.service';

@Controller('reserves')
export class ReservesController {
  constructor(private readonly reservesService: ReservesService) {}

  @Get()
  getHello(): Promise<Reserves[]> {
    return this.reservesService.findAll();
  }

  @Post()
  createReservation(@Body() createReservesDto: CreateReservesDto) {
    return this.reservesService.createReservation(createReservesDto);
  }
}
