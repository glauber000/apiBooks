import { Injectable, Inject, BadRequestException } from '@nestjs/common';
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

  async createReservation(createReservesDto: CreateReservesDto) {
    await this.reservationsPerDay(createReservesDto);
    await this.validationReservationsPerUser(
      createReservesDto.date,
      createReservesDto.user,
      createReservesDto.period,
    );
    const reservations = await this.reservationsPerPeriod(createReservesDto);
    if (reservations.length < 1) {
      await this.reservesRepository.save(createReservesDto);
      return {
        message: 'Salvo com sucesso a primeira vez do turno!',
      };
    } else {
      this.verifyTotalPerPeriod(reservations.length, createReservesDto.period);
      await this.reservesRepository.save(createReservesDto);
      return {
        message: 'Salvo com sucesso!',
      };
    }
  }

  private async reservationsPerPeriod(createReservesDto: CreateReservesDto) {
    return await this.reservesRepository.find({
      where: {
        date: createReservesDto.date,
        period: createReservesDto.period,
      },
    });
  }

  private async reservationsPerDay(createReservesDto: CreateReservesDto) {
    const limit = (await this.configurationService.findOne()).limitPerDay * 2;
    const reservations = await this.reservesRepository.find({
      where: {
        date: createReservesDto.date,
      },
    });

    if (reservations.length > limit - 1)
      throw new BadRequestException(
        `Excedido o limite de reservas no dia ${createReservesDto.date}`,
      );
  }

  private async validationReservationsPerUser(
    date: Date,
    user: Users,
    period: string,
  ) {
    const reservationsPerUser = await this.reservesRepository.find({
      where: {
        date: date,
        user: user,
        period: period,
      },
    });
    if (reservationsPerUser.length > 0) {
      throw new BadRequestException(
        `Usuário já possui reserva para o respectivo periodo: ${period}`,
      );
    }
  }

  private async verifyTotalPerPeriod(total: number, period: string) {
    const limit = (await this.configurationService.findOne()).limitPerDay;
    console.log(total);
    console.log(limit);
    if (total >= limit) {
      throw new BadRequestException(
        `Excedido o limite de reservas no respectivo turno ${period}`,
      );
    }
  }
}
