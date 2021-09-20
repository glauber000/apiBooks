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
    const limit = (await this.configurationService.findOne()).limitPerDay;
    await this.reservationsPerDay(createReservesDto, limit);
    await this.validationReservationsPerUser(
      createReservesDto.date,
      createReservesDto.user,
      createReservesDto.period,
    );
    await this.validateReservationsPerPeriod(createReservesDto, limit);
    await this.reservesRepository.save(createReservesDto);
    return {
      message: 'Salvo com sucesso!',
    };
  }

  private async validateReservationsPerPeriod(
    createReservesDto: CreateReservesDto,
    limit: number,
  ) {
    const reservation = await this.reservesRepository.find({
      where: {
        date: createReservesDto.date,
        period: createReservesDto.period,
      },
    });
    if (reservation.length >= limit) {
      throw new BadRequestException(
        `Excedido o limite de reservas no respectivo turno ${createReservesDto.period}`,
      );
    }
  }

  private async reservationsPerDay(
    createReservesDto: CreateReservesDto,
    limit: number,
  ) {
    limit = limit * 2;
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
    const reservationsPerUser = await this.reservesRepository.findOne({
      where: {
        date: date,
        user: user,
        period: period,
      },
    });
    if (reservationsPerUser) {
      throw new BadRequestException(
        `Usuário já possui reserva para o respectivo periodo: ${period}`,
      );
    }
  }
}
