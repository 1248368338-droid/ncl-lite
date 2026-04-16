export type GameEvent = {
  id: string
  year: number
  hiddenDescription: string
  realName: string
  category: 'winner' | 'loser' | 'volatile'
  oneYearReturn: number
  fiveYearReturn: number
  deathFlag?: boolean
  shortFeedback: string
  longFeedback: string
}

export const EVENTS: GameEvent[] = [
  {
    id: 'webvan_2000',
    year: 2000,
    hiddenDescription:
      '一家线上生鲜配送平台正在疯狂扩仓、扩车队、抢市场。所有人都说这是"互联网改造零售"的未来。',
    realName: 'Webvan',
    category: 'loser',
    oneYearReturn: 0.15,
    fiveYearReturn: -1,
    deathFlag: true,
    shortFeedback: '首年市场情绪还在，短期看上去像个性感故事。',
    longFeedback: '商业模式失血过快，最终破产清算。你买到的是时代泡沫，不是长期复利。',
  },
  {
    id: 'amazon_2001',
    year: 2001,
    hiddenDescription:
      '一家在线书店在泡沫破灭后跌得很惨，CEO 却还在坚持扩仓物流和基础设施，外界普遍觉得他疯了。',
    realName: 'Amazon',
    category: 'winner',
    oneYearReturn: 0.75,
    fiveYearReturn: 2.64,
    shortFeedback: '市场开始意识到它不只是卖书，短期强势反弹。',
    longFeedback: '长期看，它不是反弹，而是巨兽苏醒。你守住的是复利，不是情绪。',
  },
  {
    id: 'apple_2003',
    year: 2003,
    hiddenDescription:
      '一家濒临边缘的电脑公司，靠一个很火的音乐播放器续命。很多人觉得这是短暂潮流，不是长期生意。',
    realName: 'Apple',
    category: 'winner',
    oneYearReturn: 2.01,
    fiveYearReturn: 6.99,
    shortFeedback: '首年已经很猛，市场情绪开始点燃。',
    longFeedback: '真正可怕的是后面的 5 年：它不是卖播放器，而是在重塑整个消费电子生态。',
  },
  {
    id: 'lehman_2007',
    year: 2007,
    hiddenDescription:
      '一家百年老牌金融机构，利润漂亮、声望极高，几乎没人相信它会倒下。',
    realName: 'Lehman Brothers',
    category: 'loser',
    oneYearReturn: -0.58,
    fiveYearReturn: -1,
    deathFlag: true,
    shortFeedback: '短期已经开始剧烈下杀，但很多人还以为只是错杀。',
    longFeedback: '它不是回调，而是消失。你在旧秩序里寻找安全感，结果买到的是归零。',
  },
  {
    id: 'tesla_2012',
    year: 2012,
    hiddenDescription:
      '一家年年亏损的电动车公司，产品很酷，但产能极低，很多人觉得这只是资本市场包装出来的幻觉。',
    realName: 'Tesla',
    category: 'winner',
    oneYearReturn: 3.44,
    fiveYearReturn: 8.17,
    shortFeedback: '盈利拐点出现，短期爆发，空头被打穿。',
    longFeedback: '长线看，它不是"贵得离谱"，而是改变行业叙事的超级资产。',
  },
  {
    id: 'nvidia_2023',
    year: 2023,
    hiddenDescription:
      '一家做高性能芯片的公司，突然成了所有 AI 公司争抢的"卖铲人"。很多人觉得它已经涨太多了。',
    realName: 'NVIDIA',
    category: 'winner',
    oneYearReturn: 1.71,
    fiveYearReturn: 4.2,
    shortFeedback: 'AI 浪潮爆发，短期财报超预期，市场疯抢。',
    longFeedback: '真正决定结果的，不是"贵不贵"，而是你能不能理解叙事背后的结构性红利。',
  },
]
