import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EVENTS } from '../data/events'
import { playRound, INITIAL_CAPITAL, getTitleByGap, type PlayerAction, type RoundResult } from '../lib/gameEngine'

type RoundHistory = {
  eventId: string
  realName: string
  action: PlayerAction
  result: RoundResult
}

type Phase = 'decision' | 'reveal'

export default function Play() {
  const navigate = useNavigate()
  const [roundIndex, setRoundIndex] = useState(0)
  const [capital, setCapital] = useState(INITIAL_CAPITAL)
  const [benchmarkCapital, setBenchmarkCapital] = useState(INITIAL_CAPITAL)
  const [history, setHistory] = useState<RoundHistory[]>([])
  const [phase, setPhase] = useState<Phase>('decision')
  const [lastResult, setLastResult] = useState<RoundResult | null>(null)
  const [lastAction, setLastAction] = useState<PlayerAction | null>(null)

  const event = EVENTS[roundIndex]
  const totalRounds = EVENTS.length

  function handleAction(action: PlayerAction) {
    const result = playRound(capital, benchmarkCapital, event, action)
    setLastResult(result)
    setLastAction(action)
    setPhase('reveal')
  }

  function handleNext() {
    if (!lastResult) return
    const newHistory = [...history, {
      eventId: event.id,
      realName: event.realName,
      action: lastAction!,
      result: lastResult,
    }]
    setHistory(newHistory)

    if (lastResult.gameOver) {
      navigate('/result', {
        state: {
          finalCapital: 0,
          benchmarkCapital: lastResult.benchmarkCapital,
          history: newHistory,
          title: getTitleByGap(0, lastResult.benchmarkCapital),
          gameOver: true,
        }
      })
      return
    }

    const nextIndex = roundIndex + 1
    if (nextIndex >= totalRounds) {
      navigate('/result', {
        state: {
          finalCapital: lastResult.nextCapital,
          benchmarkCapital: lastResult.benchmarkCapital,
          history: newHistory,
          title: getTitleByGap(lastResult.nextCapital, lastResult.benchmarkCapital),
          gameOver: false,
        }
      })
      return
    }

    setCapital(lastResult.nextCapital)
    setBenchmarkCapital(lastResult.benchmarkCapital)
    setRoundIndex(nextIndex)
    setPhase('decision')
    setLastResult(null)
    setLastAction(null)
  }

  const actionLabel: Record<PlayerAction, string> = {
    pass: '跳过',
    hold_1y: '持有 1 年',
    hold_5y: '长拿 5 年',
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-10">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs text-gray-500 tracking-widest uppercase">
            第 {roundIndex + 1} 关 / 共 {totalRounds} 关
          </p>
          <p className="text-xs text-amber-400 font-medium">
            ¥{capital.toLocaleString()}
          </p>
        </div>
        <div className="w-full h-1 bg-gray-800 rounded-full mb-8">
          <div
            className="h-1 bg-amber-400 rounded-full transition-all duration-500"
            style={{ width: `${((roundIndex) / totalRounds) * 100}%` }}
          />
        </div>

        {phase === 'decision' && (
          <>
            <p className="text-xs text-gray-500 mb-2">{event.year} 年</p>
            <div className="border border-gray-800 rounded-2xl p-6 bg-gray-950 mb-8">
              <p className="text-gray-200 text-base leading-relaxed">
                {event.hiddenDescription}
              </p>
            </div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">你的选择</p>
            <div className="space-y-3">
              <button
                onClick={() => handleAction('hold_5y')}
                className="w-full py-4 rounded-2xl bg-amber-400 text-black font-bold text-base tracking-wide active:scale-95 transition-transform"
              >
                长拿 5 年
                <span className="ml-2 text-xs font-normal opacity-70">相信长期复利</span>
              </button>
              <button
                onClick={() => handleAction('hold_1y')}
                className="w-full py-4 rounded-2xl border border-gray-700 text-white font-medium text-base active:scale-95 transition-transform"
              >
                持有 1 年
                <span className="ml-2 text-xs font-normal text-gray-400">先看短期</span>
              </button>
              <button
                onClick={() => handleAction('pass')}
                className="w-full py-4 rounded-2xl border border-gray-800 text-gray-500 font-medium text-base active:scale-95 transition-transform"
              >
                跳过
                <span className="ml-2 text-xs font-normal">不参与这次</span>
              </button>
            </div>
          </>
        )}

        {phase === 'reveal' && lastResult && (
          <>
            <div className="mb-6">
              <p className="text-xs text-gray-500 mb-1">{event.year} 年 · 你选择了「{actionLabel[lastAction!]}」</p>
              <h2 className="text-2xl font-bold text-amber-400">{event.realName}</h2>
            </div>
            <div className={`border rounded-2xl p-6 mb-6 ${lastResult.gameOver ? 'border-red-800 bg-red-950/30' : lastResult.nextCapital > capital ? 'border-green-800 bg-green-950/20' : 'border-gray-800 bg-gray-950'}`}>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">{lastResult.summary}</p>
              {lastAction !== 'pass' && (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">1年收益</span>
                    <span className={event.oneYearReturn >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {event.oneYearReturn >= 0 ? '+' : ''}{Math.round(event.oneYearReturn * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">5年收益</span>
                    <span className={event.fiveYearReturn >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {event.deathFlag ? '归零' : `${event.fiveYearReturn >= 0 ? '+' : ''}${Math.round(event.fiveYearReturn * 100)}%`}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="border border-gray-800 rounded-2xl p-5 bg-gray-950 mb-6">
              <p className="text-xs text-amber-400 uppercase tracking-widest mb-2">复利视角</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                {lastAction === 'hold_5y' ? event.longFeedback : lastAction === 'hold_1y' ? event.shortFeedback : `你选择观望。${event.realName} 的结果是：5年收益 ${event.deathFlag ? '归零' : Math.round(event.fiveYearReturn * 100) + '%'}。`}
              </p>
            </div>
            <div className="flex justify-between items-center border border-gray-800 rounded-2xl p-4 bg-gray-950 mb-8">
              <div>
                <p className="text-xs text-gray-500 mb-1">当前资产</p>
                <p className={`text-xl font-bold ${lastResult.gameOver ? 'text-red-400' : 'text-white'}`}>
                  ¥{lastResult.nextCapital.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-1">基准（年化8%）</p>
                <p className="text-sm text-gray-400">¥{lastResult.benchmarkCapital.toLocaleString()}</p>
              </div>
            </div>
            <button
              onClick={handleNext}
              className="w-full py-4 rounded-2xl bg-amber-400 text-black font-bold text-base tracking-wide active:scale-95 transition-transform"
            >
              {roundIndex + 1 >= totalRounds || lastResult.gameOver ? '查看最终结果' : '下一关 →'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
