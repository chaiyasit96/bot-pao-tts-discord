import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MessageListener } from './discord.listener';
import { TtsService } from 'src/tts/tts.service';

@Module({
    imports: [EventEmitter2],
    providers: [
        DiscordService,
        MessageListener,
        TtsService
    ]

})
export class DiscordModule { }
