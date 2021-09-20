import { Injectable, Inject } from '@nestjs/common';
import { ConfigurationService } from 'src/configuration/configuration.service';
import { Repository } from 'typeorm';
import { CreateReservesDto } from './dto/create.reserves.dto';
import { Reserves } from './reserves.entity';

@Injectable()
export class ReservesService {
  constructor(
    @Inject('RESERVES_REPOSITORY')
    private reservesRepository: Repository<Reserves>,
    private readonly configurationService: ConfigurationService,
  ) {}

  async findAll(): Promise<Reserves[]> {
    return this.reservesRepository.find();
  }

  async insert(createReservesDto: CreateReservesDto) {
    const limit = (await this.configurationService.findOne()).limitPerDay;
    const reservations = await this.reservesRepository.find({
      where: {
        date: createReservesDto.date,
        period: createReservesDto.period,
      },
    });
    const reservationsPerUser = await this.reservesRepository.find({
      where: {
        date: createReservesDto.date,
        user: createReservesDto.user,
      },
    });
    if (reservationsPerUser.length > 0) {
      return {
        message: `Usuário já possui reserva para o respectivo dia: ${createReservesDto.date}`,
        error: false,
      };
    } else {
      if (reservations.length <= 0) {
        await this.reservesRepository.save(createReservesDto);
        return {
          message: 'Salvo com sucesso a primeira vez do turno!',
          error: false,
        };
      } else {
        console.log(reservations);
        let countMorning = 0;
        let countEverning = 0;
        reservations.map((x) => {
          if (x.period === 'MORNING') countMorning++;
          else if (x.period === 'EVERNING') countEverning++;
        });
        if (createReservesDto.period == 'MORNING') {
          if (countMorning < limit) {
            await this.reservesRepository.save(createReservesDto);
            return {
              message: 'Salvo!',
              error: false,
            };
          } else {
            return {
              message: 'Excedido o limite de reservas pela manhã!',
              error: true,
            };
          }
        } else {
          if (countEverning < limit) {
            await this.reservesRepository.save(createReservesDto);
            return {
              message: 'Salvo!',
              error: false,
            };
          } else {
            return {
              message: 'Excedido o limite de reservas pela tarde!',
              error: true,
            };
          }
        }
      }
    }
  }
}
