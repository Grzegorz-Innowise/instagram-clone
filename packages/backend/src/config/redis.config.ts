import { ConfigService } from '@nestjs/config';
import KeyvRedis from '@keyv/redis';

export const getConfigRedis = (configService: ConfigService) => ({
    store: () => new KeyvRedis(configService.get<string>('REDIS_DATABASE_URL')),
    isGlobal: true,
});
