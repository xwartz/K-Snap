import { useI18n } from "../utils/i18n"

interface MacroSelectorProps {
  onAnalyze: () => void
  disabled: boolean
}

export function MacroSelector({ onAnalyze, disabled }: MacroSelectorProps) {
  const { t } = useI18n()

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        {t("macroTitle")}
      </h2>

      <div className="space-y-4">
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <p>AI 将自动分析图表中的技术指标</p>
          <p>自动获取近期宏观经济事件和影响</p>
          <p>结合 ETF 资金流和交易所资金流数据</p>
          <p>分析市场情绪和用户交易偏好</p>
        </div>

        {/* Analyze Button */}
        <button
          onClick={onAnalyze}
          disabled={disabled}
          className="w-full btn-primary text-base py-3 font-semibold"
        >
          {t("analyzeButton")}
        </button>
      </div>
    </div>
  )
}
