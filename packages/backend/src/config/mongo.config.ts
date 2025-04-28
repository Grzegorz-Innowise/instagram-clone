import { ConfigService } from '@nestjs/config';

export const getMongoConfig = (configService: ConfigService) => ({
    uri: configService.get<string>('MONGO_DATABASE_URL'),
    dbName: configService.get<string>('MONGO_DB_NAME'),
});
