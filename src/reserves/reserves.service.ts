import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateReservesDto } from './dto/create.reserves.dto';
import { Reserves } from './reserves.entity';

@Injectable()
export class ReservesService {
  constructor(
    @Inject('RESERVES_REPOSITORY')
    private reservesRepository: Repository<Reserves>,
  ) {}

  async findAll(): Promise<Reserves[]> {
    return this.reservesRepository.find();
  }

  async insert(createReservesDto: CreateReservesDto) {
    const reservesUser = await this.reservesRepository.find(
      createReservesDto.user,
    );
    if (reservesUser.length <= 0) {
      this.reservesRepository.save(createReservesDto);
      return {
        message: 'Salvo com sucesso a primeira reserva!',
        error: false,
      };
    } else {
      const hour = new Date(createReservesDto.date).getHours();
      let morningCount = 0;
      let eveningCount = 0;
      const date = new Date(createReservesDto.date);
      const dateFormated =
        date.getFullYear().toString() +
        '/' +
        (date.getMonth() + 1).toString().padStart(0) +
        '/' +
        date.getDate().toString().padStart(0);
      if (hour >= 6 && hour < 12) {
        reservesUser.map((x) => {
          if (
            x.date.getHours() >= 6 &&
            x.date.getHours() < 12 &&
            x.date.getFullYear().toString() +
              '/' +
              (x.date.getMonth() + 1).toString().padStart(0) +
              '/' +
              x.date.getDate().toString().padStart(0) ==
              dateFormated
          )
            morningCount++;
        });
        if (morningCount < 2) {
          this.reservesRepository.save(createReservesDto);
          return {
            message: 'Salvo com sucesso!',
            error: false,
          };
        } else {
          return {
            message: 'Você ja atingiu o limite de reservas pela manhã!',
            error: true,
          };
        }
      } else if (hour >= 12 && hour < 18) {
        reservesUser.map((x) => {
          if (
            x.date.getHours() >= 12 &&
            x.date.getHours() < 18 &&
            x.date.getFullYear().toString() +
              '/' +
              (x.date.getMonth() + 1).toString().padStart(0) +
              '/' +
              x.date.getDate().toString().padStart(0) ==
              dateFormated
          )
            eveningCount++;
        });
        if (eveningCount < 2) {
          this.reservesRepository.save(createReservesDto);
          return {
            message: 'Salvo com sucesso!',
            error: false,
          };
        }
        return {
          message: 'Você ja atingiu o limite de reservas pela tarde!',
          error: true,
        };
      } else {
        return {
          message: 'Horário não disponível para reserva',
          error: true,
        };
      }
    }
  }
}
