import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscordModule } from './discord/discord.module';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TtsService } from './tts/tts.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        EventEmitterModule.forRoot(),
        DiscordModule
    ],
    controllers: [AppController],
    providers: [AppService, TtsService],
})
export class AppModule { }
