import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('test-cache')
    async testCache() {
        const result = await this.appService.checkCache();
        console.log('Wynik z testCache:', result);
        return result;
    }

    @Post('set-cache')
    async setCache() {
        await this.appService.setCache();
        return { message: 'Cache set successfully' };
    }

    @Get('get-cache')
    async getCache() {
        await this.appService.getCache();
        return { message: 'Cache retrieved successfully' };
    }
}
