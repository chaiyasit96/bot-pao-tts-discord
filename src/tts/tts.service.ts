import { createAudioPlayer, createAudioResource } from '@discordjs/voice';
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { Readable } from 'stream';
import { PlayerState } from './tts.dto';

@Injectable()
export class TtsService {
    private players = new Map<string, PlayerState>();
    private openai = new OpenAI({ apiKey: process.env.BOT_PAO_TTS_DISCORD_OPENAI_API_KEY });

    public createPlayer(guildId: string): PlayerState {
        const playerState = {
            connection: null,
            player: createAudioPlayer()
        };
        this.players.set(guildId, playerState);
        return playerState;
    }

    public getPlayer(guildId: string): PlayerState {
        const players = this.players.get(guildId);
        if (!players) {
            return this.createPlayer(guildId);
        } else {
            return players;
        }
    }

    public async play(guildId: string, text: string) {
        const player = this.getPlayer(guildId);
        const response = await this.openai.audio.speech.create({
            model: "gpt-4o-mini-tts",
            voice: "coral",
            input: text,
        });
        const buffer = Buffer.from(await response.arrayBuffer());
        const stream = createAudioResource(Readable.from(buffer));
        player.player.play(stream);
    }
}