import { useLocation, useNavigate } from 'react-router-dom'
import { INITIAL_CAPITAL } from '../lib/gameEngine'

export default function Report() {
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

  const { finalCapital, benchmarkCapital, history, title } = state

  const passCount = history.filter(h => h.action === 'pass').length
  const hold1yCount = history.filter(h => h.action === 'hold_1y').length
  const hold5yCount = history.filter(h => h.action === 'hold_5y').length

  const winnersMissed = history.filter(
    h => h.action === 'pass' && h.result.longReturn > 0.5
  ).length

  const losersAvoided = history.filter(
    h => h.action === 'pass' && h.result.longReturn <= -0.5
  ).length

  const archetypeDesc: Record<string, string> = {
    '天选接盘侠': '你在关键时刻承担了过高风险，忽视了下行保护。复利需要本金的存续，归零意味着一切重来。',
    '退堂鼓艺术家': '你的风险意识很强，但过度保守让你错过了大部分复利机会。真正的长期主义需要在不确定中持有。',
    '叙事摇摆者': '你容易被市场叙事左右，在该持有时急着止盈，在该观望时又冲动入场。',
    '均衡观察者': '你的决策相对平衡，接近市场基准。继续提升对长期价值的判断力，可以做得更好。',
    '巴菲特代餐': '你展现出了长期主义的核心特质：在不确定中识别价值，在诱惑中保持定力。',
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-md">

        <div className="text-center mb-10">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">行为分析报告</p>
          <h1 className="text-2xl font-bold text-amber-400">{title}</h1>
        </div>

        <div className="border border-amber-900/50 rounded-2xl p-6 bg-amber-950/20 mb-8">
          <p className="text-gray-200 text-sm leading-relaxed">{archetypeDesc[title] ?? '你的决策模式独特，难以简单归类。'}</p>
        </div>

        <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">决策分布</p>
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: '长拿5年', count: hold5yCount, color: 'text-amber-400' },
            { label: '持有1年', count: hold1yCount, color: 'text-gray-300' },
            { label: '跳过', count: passCount, color: 'text-gray-500' },
          ].map(item => (
            <div key={item.label} className="border border-gray-800 rounded-2xl p-4 bg-gray-950 text-center">
              <p className={`text-2xl font-bold ${item.color}`}>{item.count}</p>
              <p className="text-xs text-gray-500 mt-1">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="border border-gray-800 rounded-2xl p-6 bg-gray-950 mb-8 space-y-4">
          <p className="text-xs text-amber-400 uppercase tracking-widest">复利洞察</p>
          {winnersMissed > 0 && (
            <p className="text-gray-300 text-sm leading-relaxed">
              你跳过了 <span className="text-amber-400 font-medium">{winnersMissed} 个</span> 后来涨幅超过50%的机会。这些正是复利曲线最陡峭的地方。
            </p>
          )}
          {losersAvoided > 0 && (
            <p className="text-gray-300 text-sm leading-relaxed">
              你成功规避了 <span className="text-green-400 font-medium">{losersAvoided} 个</span> 最终大幅下跌的标的。保住本金是复利的前提。
            </p>
          )}
          <p className="text-gray-300 text-sm leading-relaxed">
            最终资产 <span className="text-white font-medium">¥{finalCapital.toLocaleString()}</span>，
            基准为 <span className="text-gray-400">¥{benchmarkCapital.toLocaleString()}</span>。
            差距的背后，是每一次决策的累积效应。
          </p>
        </div>

        <div className="border border-gray-700 rounded-2xl p-6 bg-gray-950 mb-8">
          <p className="text-xs text-amber-400 uppercase tracking-widest mb-3">解锁完整体验</p>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            这只是6个历史案例。完整版包含30+个真实事件，覆盖科技、能源、金融、消费等板块，以及更详细的行为偏差分析。
          </p>
          <div className="flex gap-3">
            <div className="flex-1 border border-amber-800 rounded-xl p-3 text-center">
              <p className="text-amber-400 font-bold text-lg">¥9.9</p>
              <p className="text-gray-500 text-xs mt-1">基础版</p>
            </div>
            <div className="flex-1 border border-amber-400 rounded-xl p-3 text-center">
              <p className="text-amber-400 font-bold text-lg">¥19.9</p>
              <p className="text-gray-500 text-xs mt-1">专业版</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full py-4 rounded-2xl border border-gray-700 text-white font-medium text-base active:scale-95 transition-transform"
        >
          重新开始
        </button>
      </div>
    </div>
  )
}
