import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostgresModule } from './postgres/postgres.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGO_DATABASE_URL'),
                dbName: 'innogram',
            }),
            inject: [ConfigService],
        }),
        CacheModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                store: () =>
                    new KeyvRedis(
                        configService.get<string>('REDIS_DATABASE_URL'),
                    ),
                isGlobal: true,
            }),
            inject: [ConfigService],
        }),

        PostgresModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
