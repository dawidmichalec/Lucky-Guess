export type GameModeId = '1-10' | '1-20' | '1-100';

export interface GameMode {
  id: GameModeId;
  min: number;
  max: number;
  baseMultiplier: number;
}

export interface GameStateMode {
  mode: GameMode;
  min: number;
  max: number;
  multiplier: number;
}

export const GAME_MODES: Record<GameModeId, GameMode> = {
  '1-10': {
    id: '1-10',
    min: 1,
    max: 10,
    baseMultiplier: 0.95,
  },
  '1-20': {
    id: '1-20',
    min: 1,
    max: 20,
    baseMultiplier: 1.95,
  },
  '1-100': {
    id: '1-100',
    min: 1,
    max: 100,
    baseMultiplier: 95,
  },
};