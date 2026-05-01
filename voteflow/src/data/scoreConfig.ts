export type ScoreType = 'trust' | 'speed' | 'accuracy';

export interface ScoreConfigItem {
  label: string;
  description: string;
  thresholds: {
    high: { label: string; color: string; min: number };
    mid: { label: string; color: string; min: number };
    low: { label: string; color: string; min: number };
  };
}

export const SCORE_CONFIG: Record<ScoreType, ScoreConfigItem> = {
  trust: {
    label: 'Public Trust',
    description: 'How much faith the public has in the process and the actors involved.',
    thresholds: {
      high: { label: 'High Trust', color: 'text-green-500', min: 70 },
      mid: { label: 'Skeptical', color: 'text-yellow-500', min: 40 },
      low: { label: 'Distrusted', color: 'text-red-500', min: 0 }
    }
  },
  speed: {
    label: 'Efficiency',
    description: 'The ability to make timely decisions and keep processes moving.',
    thresholds: {
      high: { label: 'Efficient', color: 'text-green-500', min: 70 },
      mid: { label: 'Delayed', color: 'text-yellow-500', min: 40 },
      low: { label: 'Stalled', color: 'text-red-500', min: 0 }
    }
  },
  accuracy: {
    label: 'Accuracy',
    description: 'Adherence to facts, rules, and correct procedures.',
    thresholds: {
      high: { label: 'Precise', color: 'text-green-500', min: 70 },
      mid: { label: 'Flawed', color: 'text-yellow-500', min: 40 },
      low: { label: 'Inaccurate', color: 'text-red-500', min: 0 }
    }
  }
};

export function getScoreLabel(type: ScoreType, value: number): { label: string; color: string } {
  const config = SCORE_CONFIG[type];
  if (value >= config.thresholds.high.min) return { label: config.thresholds.high.label, color: config.thresholds.high.color };
  if (value >= config.thresholds.mid.min) return { label: config.thresholds.mid.label, color: config.thresholds.mid.color };
  return { label: config.thresholds.low.label, color: config.thresholds.low.color };
}
