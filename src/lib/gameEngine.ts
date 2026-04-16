import type { GameEvent } from '../data/events'

export type PlayerAction = 'pass' | 'hold_1y' | 'hold_5y'

export type RoundResult = {
  nextCapital: number
  benchmarkCapital: number
  immediateReturn: number
  longReturn: number
  gameOver: boolean
  summary: string
}

export const INITIAL_CAPITAL = 100000
export const BENCHMARK_ANNUAL = 0.08

export function applyBenchmark(capital: number, years: number) {
  return Math.round(capital * Math.pow(1 + BENCHMARK_ANNUAL, years))
}

export function playRound(
  capital: number,
  benchmarkCapital: number,
  event: GameEvent,
  action: PlayerAction,
): RoundResult {
  if (action === 'pass') {
    return {
      nextCapital: capital,
      benchmarkCapital: applyBenchmark(benchmarkCapital, 1),
      immediateReturn: 0,
      longReturn: event.fiveYearReturn,
      gameOver: false,
      summary: `你选择跳过 ${event.realName}。资金没有变化，但你也放弃了这次机会。`,
    }
  }

  if (action === 'hold_1y') {
    const nextCapital = Math.max(0, Math.round(capital * (1 + event.oneYearReturn)))
    return {
      nextCapital,
      benchmarkCapital: applyBenchmark(benchmarkCapital, 1),
      immediateReturn: event.oneYearReturn,
      longReturn: event.fiveYearReturn,
      gameOver: nextCapital <= 0,
      summary:
        event.oneYearReturn >= 0
          ? `你持有 1 年，资产短期上涨 ${Math.round(event.oneYearReturn * 100)}%。`
          : `你持有 1 年，资产短期下跌 ${Math.abs(Math.round(event.oneYearReturn * 100))}%。`,
    }
  }

  const nextCapital =
    event.deathFlag || event.fiveYearReturn <= -1
      ? 0
      : Math.max(0, Math.round(capital * (1 + event.fiveYearReturn)))

  return {
    nextCapital,
    benchmarkCapital: applyBenchmark(benchmarkCapital, 5),
    immediateReturn: event.oneYearReturn,
    longReturn: event.fiveYearReturn,
    gameOver: nextCapital <= 0,
    summary:
      nextCapital <= 0
        ? `你选择长拿 5 年，但 ${event.realName} 最终归零。复利在这里被彻底击穿。`
        : `你选择长拿 5 年，最终收益 ${Math.round(event.fiveYearReturn * 100)}%。`,
  }
}

export function getTitleByGap(playerCapital: number, benchmarkCapital: number) {
  const ratio = playerCapital / Math.max(1, benchmarkCapital)

  if (playerCapital <= 0) return '天选接盘侠'
  if (ratio < 0.35) return '退堂鼓艺术家'
  if (ratio < 0.7) return '叙事摇摆者'
  if (ratio < 1.1) return '均衡观察者'
  return '巴菲特代餐'
}
