import { playAudioFromFile } from "./utils/play-audio";
import type { EventSubWsListener } from "@twurple/eventsub-ws";
import type { EventSubChannelRedemptionAddEvent } from "@twurple/eventsub-base";
import { playRandomTikTokTTS } from "./utils/play-tts";

const broadcasterId = `${process.env.PUBLIC_TWITCH_BROADCASTER_ID}`;

type Reward = {
  id: string;
  handler: (e: EventSubChannelRedemptionAddEvent) => void;
};

const rewards: Reward[] = [
  {
    // TTS 🎙️
    id: "d86c9437-1778-4852-94cc-7b154916fb27",
    handler: (e) => playRandomTikTokTTS(e.input),
  },
  {
    // Hidratação 🥤
    id: "c541c16d-e4f9-4e91-89dc-e8274402b669",
    handler: () => null,
  },
  {
    // Ele gosta 😍
    id: "3d10e3f6-972b-4c10-81ae-df7721d81131",
    handler: () => playAudioFromFile("ele-gosta.mp3"),
  },
  {
    // Atumalaca 🤣
    id: "10ce76e2-ab74-4766-bfa6-8e3d81b02740",
    handler: () => playAudioFromFile("atumalaca.mp3"),
  },
  {
    // PARE 🤚
    id: "36d2b2c1-19f2-481b-98ae-35a186d9cab0",
    handler: () => playAudioFromFile("pare.mp3"),
  },
  {
    // Cavalo 🐴
    id: "e2985ae2-aa0b-40e4-a80d-64bcaa1fe07f",
    handler: () => playAudioFromFile("cavalo.mp3"),
  },
  {
    // Que isso, meu filho, calma 😳
    id: "f9af7672-e5a1-4fcf-b391-6302194d64a7",
    handler: () => playAudioFromFile("que-isso-meu-filho-calma.mp3"),
  },
  {
    // Me ferrei (Estevão Ferreira) 😬
    id: "b196f854-104c-42d9-97b3-66be64cc04b7",
    handler: () => playAudioFromFile("estevao-ferreira-me-ferrei.mp3"),
  },
  {
    // Rapaz tá certo isso? 🤨
    id: "5df5f975-2658-402e-9d32-633aac124aa4",
    handler: () => playAudioFromFile("rapaz-ta-certo-isso.mp3"),
  },
];

export const initChannelRewardsHandler = (eventSub: EventSubWsListener) => {
  const registeredEvents = rewards.map((reward) =>
    eventSub.onChannelRedemptionAddForReward(
      broadcasterId,
      reward.id,
      reward.handler
    )
  );
  console.log(`Loaded ${registeredEvents.length} channel rewards`);
};
