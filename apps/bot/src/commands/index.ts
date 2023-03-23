import type { ChatUserstate } from 'tmi.js';
import { age } from './age';
import { alan } from './alan';
import { ban } from './ban';
import { bellebelinha } from './bellebelinha';
import { chuu } from './chuu';
import { confetti } from './confetti';
import { discord } from './discord';
import { dog } from './dog';
import { evaluate } from './eval';
import { first } from './first';
import { followage } from './followage';
import { help } from './help';
import { hug } from './hug';
import { kiss } from './kiss';
import { maldicao } from './maldicao';
import { marquee } from './marquee';
import { odeiopc } from './odeiopc';
import { overlay } from './overlay';
import { ping } from './ping';
import { pix } from './pix';
import { pronouns } from './pronouns';
import { punch } from './punch';
import { rasteira } from './rasteira';
import { sh } from './sh';
import { social } from './social';
import { song } from './song';
import { specs } from './specs';
import { sr } from './sr';
import { team } from './team';
import { tronco } from './tronco';
import { tts } from './tts';
import { whois } from './whois';
import { xixi } from './xixi';
import { xxx } from './xxx';

export type Command = {
  aliases?: string[];
  exec: (input: string, args: string[], user: ChatUserstate) => void;
};

export const commands: Command[] = [
  age,
  alan,
  ban,
  bellebelinha,
  chuu,
  confetti,
  discord,
  dog,
  evaluate,
  first,
  followage,
  help,
  hug,
  kiss,
  maldicao,
  marquee,
  odeiopc,
  overlay,
  ping,
  pix,
  pronouns,
  punch,
  rasteira,
  sh,
  social,
  song,
  specs,
  sr,
  team,
  tronco,
  tts,
  whois,
  xixi,
  xxx,
];
