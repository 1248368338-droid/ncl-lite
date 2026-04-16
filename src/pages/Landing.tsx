import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-between px-6 py-12">
      {/* Header */}
      <div className="w-full max-w-md text-center mt-8">
        <p className="text-xs tracking-[0.3em] text-amber-400 uppercase mb-4">复利实验室 · 精简版</p>
        <h1 className="text-4xl font-bold leading-tight mb-3">
          复利游戏
        </h1>
        <p className="text-gray-400 text-base leading-relaxed">
          用一粒米，撬动整座仓库。<br />
          体验真实复利的惊人力量。
        </p>
      </div>

      {/* Game Explanation */}
      <div className="w-full max-w-md mt-10">
        <div className="border border-gray-800 rounded-2xl p-6 space-y-4 bg-gray-950">
          <h2 className="text-sm font-semibold tracking-widest text-amber-400 uppercase">玩法说明</h2>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-amber-400 mt-0.5">①</span>
              <span>选择你的起始本金与每日收益率</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-400 mt-0.5">②</span>
              <span>每天做一个关键决策：持有、加仓或止盈</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-400 mt-0.5">③</span>
              <span>观察 30 天后，复利如何将小钱变成大钱</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-400 mt-0.5">④</span>
              <span>这是游戏，不是投资。感受规律，而非预测市场。</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Start Button */}
      <div className="w-full max-w-md mt-10">
        <button
          onClick={() => navigate('/play')}
          className="w-full py-4 rounded-2xl bg-amber-400 text-black font-bold text-lg tracking-wide active:scale-95 transition-transform"
        >
          开始游戏
        </button>
      </div>

      {/* Pricing Teaser */}
      <div className="w-full max-w-md mt-8">
        <div className="border border-gray-800 rounded-2xl p-5 bg-gray-950">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">解锁完整体验</p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-white text-sm font-medium">基础版</p>
              <p className="text-amber-400 text-2xl font-bold">¥9.9</p>
              <p className="text-gray-500 text-xs mt-0.5">30 天完整关卡</p>
            </div>
            <div className="text-right">
              <p className="text-white text-sm font-medium">专业版</p>
              <p className="text-amber-400 text-2xl font-bold">¥19.9</p>
              <p className="text-gray-500 text-xs mt-0.5">无限关卡 + 数据分析</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Note */}
      <div className="w-full max-w-md mt-8 pb-4">
        <p className="text-center text-xs text-gray-600 leading-relaxed">
          本产品为纯模拟游戏，不涉及真实资金、金融产品或投资建议。<br />
          游戏结果不代表任何实际收益承诺。
        </p>
      </div>
    </div>
  );
}
