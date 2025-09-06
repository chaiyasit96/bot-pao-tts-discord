import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
    CommandInteraction,
    InteractionResponseType,
    InternalDiscordGatewayAdapterCreator,
    Message
} from 'discord.js';
import { TtsService } from 'src/tts/tts.service';
import { joinVoiceChannel } from '@discordjs/voice';
import { PlayerState } from 'src/tts/tts.dto';
import { InteractionResponse } from 'node_modules/discord.js/typings/index.mjs';

@Injectable()
export class MessageListener {
    constructor(
        private ttsService: TtsService
    ) { }

    @OnEvent('discord.message')
    public handleDiscordMessage(message: Message): void {
        if (message.author.bot || !message.content || !message.guildId) return;

        const player = this.ttsService.getPlayer(message.guildId);
        const currentConnect = player.connection?.joinConfig.channelId;
        if (player.connection && currentConnect === message.channelId) this.ttsService.play(message.guildId, message.content);
    }

    @OnEvent('discord.command.join')
    public async handleDiscordInteractionJoinChannel(interaction: CommandInteraction): Promise<void> {
        await interaction.deferReply();
        const { channelId, guildId, guild } = interaction;
        if (!interaction.isChatInputCommand() || interaction.user.bot) {
            await interaction.followUp({ content: 'เกิดข้อผิดพลาด' });
            return;
        }
        if (!channelId || !guildId || !guild) {
            await interaction.followUp({ content: 'เกิดข้อผิดพลาด' });
            return;
        }

        const player = this.ttsService.getPlayer(guildId);
        if (!player.connection) {
            this.joinVoiceChannel(player, channelId, guildId, guild.voiceAdapterCreator);
            await interaction.editReply({ content: 'มาแล้วจ้า' });
        } else {
            const connectionConfig = player.connection.joinConfig.channelId;
            if (connectionConfig !== channelId) {
                await interaction.editReply({ content: 'ตอนนี้ฉันไม่ได้อยู่ห้องนี้' });
            } else {
                await interaction.editReply({ content: 'ฉันอยู่นี่แล้ว' });
            }
        }
    }

    private joinVoiceChannel(player: PlayerState, channelId: string, guildId: string, voiceAdapterCreator: InternalDiscordGatewayAdapterCreator): void {
        player.connection = joinVoiceChannel({
            channelId: channelId,
            guildId: guildId,
            adapterCreator: voiceAdapterCreator
        });
        player.connection.subscribe(player.player);
    }

    @OnEvent('discord.command.leave')
    public async handleDiscordInteractionLeaveChannel(interaction: CommandInteraction): Promise<void> {
        await interaction.deferReply({ ephemeral: true });
        const { channelId, guildId, guild } = interaction;
        if (!interaction.isChatInputCommand() || interaction.user.bot) {
            await interaction.followUp({ content: 'เกิดข้อผิดพลาด' });
            return;
        }
        if (!channelId || !guildId || !guild) {
            await interaction.followUp({ content: 'เกิดข้อผิดพลาด' });
            return;
        }

        const player = this.ttsService.getPlayer(guildId);
        if (player.connection) {
            player.connection.destroy();
            player.connection = null;
            player.player.stop(true);
            await interaction.editReply({ content: 'ไปแล้วจ้า' });
        } else {
            await interaction.editReply({ content: 'ฉันไม่ได้อยู่ห้องนี้อยู่แล้ว' });
        }
    }
}