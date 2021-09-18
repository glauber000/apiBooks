import { Connection } from 'typeorm';
import { Reserves } from './reserves.entity';

export const reservesProviders = [
  {
    provide: 'RESERVES_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Reserves),
    inject: ['DATABASE_CONNECTION'],
  },
];
