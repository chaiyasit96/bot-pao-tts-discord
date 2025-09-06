import { AudioPlayer, VoiceConnection } from "@discordjs/voice";

export class PlayerState {
    connection: VoiceConnection | null;
    player: AudioPlayer;
}