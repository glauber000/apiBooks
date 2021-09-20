import { Connection } from 'typeorm';
import { Configuration } from './configuration.entity';

export const configurationProviders = [
  {
    provide: 'CONFIGURATION_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(Configuration),
    inject: ['DATABASE_CONNECTION'],
  },
];
