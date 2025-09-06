import { Injectable, OnModuleInit } from '@nestjs/common';
import { BaseInteraction, Client, GatewayIntentBits, Message } from 'discord.js';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class DiscordService implements OnModuleInit {
    private client: Client;
    constructor(private eventEmitter: EventEmitter2) {
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildVoiceStates
            ],
        });
    }
    onModuleInit() {
        this.client.once('clientReady', () => {
            console.log(`บอท Discord พร้อมใช้งานแล้ว!`);
            this.client.guilds.cache.forEach(guild => { console.log(`${guild.name} -> ${guild.id}`) });
        });

        this.client.on('messageCreate', (message: Message) => { this.eventEmitter.emit('discord.message', message); });
        this.client.on('interactionCreate', (interaction: BaseInteraction) => {
            if (interaction.isCommand()) {
                if (interaction.commandName === 'join') this.eventEmitter.emit('discord.command.join', interaction);
                if (interaction.commandName === 'leave') this.eventEmitter.emit('discord.command.leave', interaction);
            }
        });

        this.client.login(process.env.BOT_PAO_TTS_DISCORD_DISCORD_TOKEN);
    }
}
