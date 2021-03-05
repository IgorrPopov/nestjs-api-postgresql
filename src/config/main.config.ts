import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const projectId = 'cloud-store-test-app';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'api-db',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true
};

export { typeOrmConfig, projectId }; 