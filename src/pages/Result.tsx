import { useLocation, useNavigate } from 'react-router-dom'
import { INITIAL_CAPITAL } from '../lib/gameEngine'

export default function Result() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as {
    finalCapital: number
    benchmarkCapital: number
    history: any[]
    title: string
    gameOver: boolean
  } | null

  if (!state) {
    navigate('/')
    return null
  }

  const { finalCapital, benchmarkCapital, history, title, gameOver } = state
  const totalReturn = ((finalCapital - INITIAL_CAPITAL) / INITIAL_CAPITAL * 100).toFixed(1)
  const benchmarkReturn = ((benchmarkCapital - INITIAL_CAPITAL) / INITIAL_CAPITAL * 100).toFixed(1)
  const beat = finalCapital > benchmarkCapital

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">你的投资者类型</p>
          <h1 className="text-3xl font-bold text-amber-400 mb-2">{title}</h1>
          {gameOver && (
            <p className="text-red-400 text-sm mt-2">你的资产归零了。</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="border border-gray-800 rounded-2xl p-5 bg-gray-950">
            <p className="text-xs text-gray-500 mb-2">最终资产</p>
            <p className={`text-2xl font-bold ${gameOver ? 'text-red-400' : beat ? 'text-green-400' : 'text-white'}`}>
              ¥{finalCapital.toLocaleString()}
            </p>
            <p className={`text-xs mt-1 ${Number(totalReturn) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {Number(totalReturn) >= 0 ? '+' : ''}{totalReturn}%
            </p>
          </div>
          <div className="border border-gray-800 rounded-2xl p-5 bg-gray-950">
            <p className="text-xs text-gray-500 mb-2">基准（年化8%）</p>
            <p className="text-2xl font-bold text-gray-300">
              ¥{benchmarkCapital.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">+{benchmarkReturn}%</p>
          </div>
        </div>

        <div className={`border rounded-2xl p-5 mb-8 ${beat ? 'border-green-800 bg-green-950/20' : 'border-gray-800 bg-gray-950'}`}>
          <p className="text-sm text-gray-300 leading-relaxed">
            {beat
              ? `你跑赢了基准指数，超额收益 ¥${(finalCapital - benchmarkCapital).toLocaleString()}。长期主义在这里得到了验证。`
              : gameOver
              ? '归零意味着复利被彻底击穿。真正的风险不是波动，而是永久性损失。'
              : `你落后于基准指数 ¥${(benchmarkCapital - finalCapital).toLocaleString()}。叙事的诱惑，比你想象的更贵。`
            }
          </p>
        </div>

        <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">决策回顾</p>
        <div className="space-y-3 mb-10">
          {history.map((h, i) => {
            const actionMap: Record<string, string> = { pass: '跳过', hold_1y: '持有1年', hold_5y: '长拿5年' }
            const prevCapital = i === 0 ? INITIAL_CAPITAL : history[i-1].result.nextCapital
            const capitalChange = h.result.nextCapital - prevCapital
            return (
              <div key={h.eventId} className="flex items-center justify-between border border-gray-800 rounded-xl px-4 py-3 bg-gray-950">
                <div>
                  <p className="text-sm font-medium text-white">{h.realName}</p>
                  <p className="text-xs text-gray-500">{actionMap[h.action]}</p>
                </div>
                <p className={`text-sm font-medium ${capitalChange > 0 ? 'text-green-400' : capitalChange < 0 ? 'text-red-400' : 'text-gray-500'}`}>
                  {capitalChange === 0 ? '—' : `${capitalChange > 0 ? '+' : ''}¥${capitalChange.toLocaleString()}`}
                </p>
              </div>
            )
          })}
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/report', { state })}
            className="w-full py-4 rounded-2xl bg-amber-400 text-black font-bold text-base active:scale-95 transition-transform"
          >
            查看完整行为分析报告
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full py-4 rounded-2xl border border-gray-700 text-white font-medium text-base active:scale-95 transition-transform"
          >
            再玩一次
          </button>
        </div>
      </div>
    </div>
  )
}
