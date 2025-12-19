import { createContext, useContext, useState, ReactNode } from 'react'

export type Language = 'en' | 'zh'

const translations = {
  en: {
    // Header
    title: 'Signal',
    subtitle: 'AI-Powered Crypto Trading Assistant',
    newAnalysis: 'New Analysis',

    // Intro
    introTitle: 'Professional Trading Analysis',
    introDescription: 'Upload your chart screenshot, and our multimodal AI will automatically analyze technical patterns, combine with macro scenarios, and generate comprehensive trading recommendations for spot, futures, and options.',
    featureImageRecognition: 'Image Recognition',
    featureRealtimeData: 'Real-time Data',
    featureMultiStrategy: 'Multi-Strategy',

    // Upload
    uploadTitle: 'Upload Chart',
    uploadDrop: 'Drop your chart here',
    uploadBrowse: 'or click to browse / paste screenshot (Ctrl+V / Cmd+V)',
    uploadFormat: 'PNG, JPG up to 5MB',
    uploadReplace: 'Replace',
    uploadTips: 'Best results with charts showing trading pair name, timeframe, and sufficient candle data.',
    uploadAlert: 'Please upload a chart first',

    // Macro Selector
    macroTitle: 'Analysis Configuration',
    macroPeriod: 'Analysis Period',
    macroScenarios: 'Macro Scenarios (Optional)',
    period1w: '1 Week',
    period2w: '2 Weeks',
    period1m: '1 Month',
    bullish: 'Bullish',
    bearish: 'Bearish',
    analyzeButton: 'Start Analysis',

    // Loading
    analyzing: 'Analyzing...',
    analyzingDesc: 'Processing chart and generating recommendations',

    // Error
    errorTitle: 'Analysis Failed',

    // Results
    resultsTitle: 'Analysis Results',
    detection: 'Detection',
    confidence: 'Confidence',
    technicalAnalysis: 'Technical Analysis',
    trend: 'Trend',
    trendUp: 'Uptrend',
    trendDown: 'Downtrend',
    trendSideways: 'Sideways',
    marketState: 'Market State',
    stateBreakout: 'Breakout',
    statePullback: 'Pullback',
    stateConsolidation: 'Consolidation',
    volatility: 'Volatility',
    volatilityHigh: 'High',
    volatilityMedium: 'Medium',
    volatilityLow: 'Low',
    currentPrice: 'Current Price',
    supportLevels: 'Support Levels',
    resistanceLevels: 'Resistance Levels',
    pattern: 'Pattern',

    // Trading Recommendations
    tradingRecommendations: 'Trading Recommendations',
    spot: 'Spot',
    futures: 'Futures',
    options: 'Options',
    action: 'Action',
    priceZone: 'Price Zone',
    entry: 'Entry',
    stopLoss: 'Stop Loss',
    riskReward: 'Risk/Reward',
    strategy: 'Strategy',
    priceForecast: 'Price Forecast',
    biasLong: 'Long',
    biasShort: 'Short',
    biasNeutral: 'Neutral',

    // Risk Warnings
    riskWarnings: 'Risk Warnings',
    disclaimer: 'This analysis is for educational purposes only and does not constitute financial advice. Cryptocurrency trading involves high risk. Make decisions based on your own risk tolerance.',

    // Footer
    footerDisclaimer: 'Disclaimer: For educational purposes only. Not financial advice. Cryptocurrency trading involves high risk.',

    // Result Cards Extra
    macroEvents: 'Next Week Macro Events',
    probabilityTitle: 'Trend Probability Distribution',
    probUp: 'Bullish Probability',
    probDown: 'Bearish Probability',
    probSideways: 'Sideways Probability',
    probReasoning: 'Reasoning',
    generalReasoning: 'Comprehensive Reasoning',

    // Upload Alerts
    uploadAlertFile: 'Please upload an image file',
    uploadAlertSize: 'Image size cannot exceed 5MB',

    // Landing Hero
    heroTitle: 'From Chart to Clarity',
    heroSubtitle: 'MarketSage AI',
    heroDescription: 'Your AI-powered trading edge. Upload any crypto candlestick chart and get a professional-grade investment analysis in seconds.',
    heroButton: 'Get Started',
    heroDisclaimer: '⚠️ For educational purposes only. Not financial advice.',

    // API Key Settings
    apiKeyTitle: 'API Key Settings',
    apiKeyDescription: 'Enter your OpenRouter or OpenAI API key. Keys are stored locally in your browser.',
    apiKeyOpenRouter: 'OpenRouter API Key (Recommended)',
    apiKeyOpenAI: 'OpenAI API Key (Alternative)',
    apiKeyGetOpenRouter: 'Get OpenRouter API Key →',
    apiKeyGetOpenAI: 'Get OpenAI API Key →',
    apiKeySave: 'Save',
    apiKeyClear: 'Clear',
    apiKeyConfigured: 'API Key configured',
    apiKeyConfigure: 'Configure API Key',
    apiKeyLabel: 'API Key',
    apiKeySet: 'Set API Key',

    // Chat Interface
    chatHeaderTitle: 'MarketSage AI',
    chatHeaderSubtitle: 'Professional crypto trading analysis powered by AI',
    chatWelcomeTitle: 'Hi, I am MarketSage AI',
    chatWelcomeDesc: "Whether it's Spot, Futures, or Contracts, just show me the chart. Please upload your K-line screenshot to begin the analysis.",
    chatDropTitle: 'Drag and drop your chart here, or click to browse',
    chatUploadButton: 'Upload Chart',
    chatSupports: 'Supports: PNG, JPG, JPEG • Max 5MB • Analysis starts automatically',
    chatErrorTitle: 'Analysis Error',
    chatStep1: 'Analyzing chart image...',
    chatStep2: 'Identifying trading pair and timeframe...',
    chatStep3: 'Fetching real-time market data...',
    chatStep4: 'Performing technical analysis...',
    chatStep5: 'Generating trading recommendations...',
  },
  zh: {
    // Header
    title: 'Signal',
    subtitle: 'AI 加密货币交易决策系统',
    newAnalysis: '新分析',

    // Intro
    introTitle: '专业交易分析',
    introDescription: '上传K线截图，多模态AI自动识别技术形态，结合宏观场景，生成现货、合约、期权的综合交易建议。',
    featureImageRecognition: '图像识别',
    featureRealtimeData: '实时数据',
    featureMultiStrategy: '多策略建议',

    // Upload
    uploadTitle: '上传图表',
    uploadDrop: '拖放图片到这里',
    uploadBrowse: '或点击选择文件 / 粘贴截图 (Ctrl+V / Cmd+V)',
    uploadFormat: 'PNG, JPG 最大 5MB',
    uploadReplace: '重新上传',
    uploadTips: '建议截图包含交易对名称、时间周期和足够的K线数据。',
    uploadAlert: '请先上传K线截图',

    // Macro Selector
    macroTitle: '分析配置',
    macroPeriod: '分析周期',
    macroScenarios: '宏观场景（可选）',
    period1w: '1周',
    period2w: '2周',
    period1m: '1个月',
    bullish: '利好',
    bearish: '利空',
    analyzeButton: '开始分析',

    // Loading
    analyzing: '分析中...',
    analyzingDesc: '正在识别图表并生成交易建议',

    // Error
    errorTitle: '分析失败',

    // Results
    resultsTitle: '分析结果',
    detection: '识别结果',
    confidence: '置信度',
    technicalAnalysis: '技术分析',
    trend: '趋势',
    trendUp: '上涨',
    trendDown: '下跌',
    trendSideways: '震荡',
    marketState: '市场状态',
    stateBreakout: '突破',
    statePullback: '回调',
    stateConsolidation: '盘整',
    volatility: '波动率',
    volatilityHigh: '高',
    volatilityMedium: '中',
    volatilityLow: '低',
    currentPrice: '当前价格',
    supportLevels: '支撑位',
    resistanceLevels: '压力位',
    pattern: '技术形态',

    // Trading Recommendations
    tradingRecommendations: '交易建议',
    spot: '现货',
    futures: '合约',
    options: '期权',
    action: '操作',
    priceZone: '价格区间',
    entry: '入场点',
    stopLoss: '止损',
    riskReward: '风险回报',
    strategy: '策略',
    priceForecast: '价格预期',
    biasLong: '做多',
    biasShort: '做空',
    biasNeutral: '中性',

    // Risk Warnings
    riskWarnings: '风险提示',
    disclaimer: '本分析仅供学习参考，不构成投资建议。加密货币投资存在高风险，请根据自身风险承受能力谨慎决策。',

    // Footer
    footerDisclaimer: '免责声明：本系统仅供学习参考，不构成投资建议。加密货币投资存在高风险。',

    // Result Cards Extra
    macroEvents: '下周宏观经济事件',
    probabilityTitle: '走势概率分布',
    probUp: '上涨概率',
    probDown: '下跌概率',
    probSideways: '震荡概率',
    probReasoning: '判断依据',
    generalReasoning: '综合判断依据',

    // Upload Alerts
    uploadAlertFile: '请上传图片文件',
    uploadAlertSize: '图片大小不能超过5MB',

    // Landing Hero
    heroTitle: '从图表到洞察',
    heroSubtitle: 'MarketSage AI',
    heroDescription: '您的 AI 交易助手。上传任意加密货币 K 线图，几秒钟内获得专业级投资分析。',
    heroButton: '立即开始',
    heroDisclaimer: '⚠️ 仅供学习参考，不构成财务建议。',

    // API Key Settings
    apiKeyTitle: 'API Key 设置',
    apiKeyDescription: '输入您的 OpenRouter 或 OpenAI API Key。密钥直接存储在您的浏览器中。',
    apiKeyOpenRouter: 'OpenRouter API Key (推荐)',
    apiKeyOpenAI: 'OpenAI API Key (备选)',
    apiKeyGetOpenRouter: '获取 OpenRouter Key →',
    apiKeyGetOpenAI: '获取 OpenAI Key →',
    apiKeySave: '保存',
    apiKeyClear: '清除',
    apiKeyConfigured: 'API Key 已配置',
    apiKeyConfigure: '配置 API Key',
    apiKeyLabel: 'API Key',
    apiKeySet: '设置 Key',

    // Chat Interface
    chatHeaderTitle: 'MarketSage AI',
    chatHeaderSubtitle: 'AI 驱动的专业加密货币交易分析',
    chatWelcomeTitle: '你好，我是 MarketSage AI',
    chatWelcomeDesc: '无论是现货、合约还是期权，只要给我看图表，我就能通过 AI 进行分析。请上传您的 K 线截图以开始。',
    chatDropTitle: '拖放图表到这里，或点击浏览',
    chatUploadButton: '上传图表',
    chatSupports: '支持: PNG, JPG, JPEG • 最大 5MB • 自动开始分析',
    chatErrorTitle: '分析未完成',
    chatStep1: '正在分析图表...',
    chatStep2: '正在识别交易对和时间周期...',
    chatStep3: '正在获取实时市场数据...',
    chatStep4: '正在进行技术分析...',
    chatStep5: '正在生成交易建议...',
  },
}

type TranslationKey = keyof typeof translations.en

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const getStoredLanguage = (): Language => {
  return 'zh'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getStoredLanguage)

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}
