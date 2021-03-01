import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'api-db',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true,
};

export { typeOrmConfig }; 