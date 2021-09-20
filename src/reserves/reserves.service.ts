import { Injectable, Inject } from '@nestjs/common';
import { ConfigurationService } from 'src/configuration/configuration.service';
import { Users } from 'src/users/users.entity';
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

  async reservationsPerUser(
    date: Date,
    user: Users,
    period: string,
  ): Promise<Reserves[]> {
    return await this.reservesRepository.find({
      where: {
        date: date,
        user: user,
        period: period,
      },
    });
  }

  async verifyTotal(total: number, createReservesDto: CreateReservesDto) {
    const limit = (await this.configurationService.findOne()).limitPerDay;
    if (total < limit) {
      await this.reservesRepository.save(createReservesDto);
      return {
        message: 'Salvo!',
        error: false,
      };
    } else {
      return {
        message: `Excedido o limite de reservas no respectivo turno ${createReservesDto.period}!`,
        error: true,
      };
    }
  }

  async insert(createReservesDto: CreateReservesDto) {
    const reservations = await this.reservesRepository.find({
      where: {
        date: createReservesDto.date,
        period: createReservesDto.period,
      },
    });
    const reservationsPerUser = await this.reservationsPerUser(
      createReservesDto.date,
      createReservesDto.user,
      createReservesDto.period,
    );
    if (reservationsPerUser.length > 0) {
      return {
        message: `Usuário já possui reserva para o respectivo periodo: ${createReservesDto.period}`,
        error: false,
      };
    } else {
      if (reservations.length < 1) {
        await this.reservesRepository.save(createReservesDto);
        return {
          message: 'Salvo com sucesso a primeira vez do turno!',
          error: false,
        };
      } else {
        let countMorning = 0;
        let countEverning = 0;
        reservations.map((x) => {
          if (x.period === 'MORNING') countMorning++;
          else if (x.period === 'EVERNING') countEverning++;
        });
        if (createReservesDto.period == 'MORNING') {
          return this.verifyTotal(countMorning, createReservesDto);
        } else {
          return this.verifyTotal(countEverning, createReservesDto);
        }
      }
    }
  }
}
