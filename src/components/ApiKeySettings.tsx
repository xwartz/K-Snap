import { useState, useEffect } from 'react'

const API_KEY_STORAGE = {
  OPENROUTER: 'openrouter_api_key',
  OPENAI: 'openai_api_key',
}

import { useI18n } from '../utils/i18n'

export function ApiKeySettings() {
  const { t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const [openrouterKey, setOpenrouterKey] = useState('')
  const [openaiKey, setOpenaiKey] = useState('')
  const [hasKey, setHasKey] = useState(false)

  useEffect(() => {
    // Load existing keys
    const savedOpenrouterKey = localStorage.getItem(API_KEY_STORAGE.OPENROUTER) || ''
    const savedOpenaiKey = localStorage.getItem(API_KEY_STORAGE.OPENAI) || ''
    setOpenrouterKey(savedOpenrouterKey)
    setOpenaiKey(savedOpenaiKey)
    setHasKey(!!(savedOpenrouterKey || savedOpenaiKey))
  }, [])

  const handleSave = () => {
    if (openrouterKey) {
      localStorage.setItem(API_KEY_STORAGE.OPENROUTER, openrouterKey)
    } else {
      localStorage.removeItem(API_KEY_STORAGE.OPENROUTER)
    }

    if (openaiKey) {
      localStorage.setItem(API_KEY_STORAGE.OPENAI, openaiKey)
    } else {
      localStorage.removeItem(API_KEY_STORAGE.OPENAI)
    }

    setHasKey(!!(openrouterKey || openaiKey))
    setIsOpen(false)

    // Reload page to apply new keys
    window.location.reload()
  }

  const handleClear = () => {
    localStorage.removeItem(API_KEY_STORAGE.OPENROUTER)
    localStorage.removeItem(API_KEY_STORAGE.OPENAI)
    setOpenrouterKey('')
    setOpenaiKey('')
    setHasKey(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
          hasKey
            ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300'
            : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700 text-yellow-700 dark:text-yellow-300'
        }`}
        title={hasKey ? t('apiKeyConfigured') : t('apiKeyConfigure')}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
          />
        </svg>
        <span className="text-sm font-medium hidden sm:inline">
          {hasKey ? t('apiKeyLabel') : t('apiKeySet')}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 p-4">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
              {t('apiKeyTitle')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {t('apiKeyDescription')}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('apiKeyOpenRouter')}
                </label>
                <input
                  type="password"
                  value={openrouterKey}
                  onChange={(e) => setOpenrouterKey(e.target.value)}
                  placeholder="sk-or-v1-..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <a
                  href="https://openrouter.ai/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary-600 dark:text-primary-400 hover:underline mt-1 inline-block"
                >
                  {t('apiKeyGetOpenRouter')}
                </a>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('apiKeyOpenAI')}
                </label>
                <input
                  type="password"
                  value={openaiKey}
                  onChange={(e) => setOpenaiKey(e.target.value)}
                  placeholder="sk-..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary-600 dark:text-primary-400 hover:underline mt-1 inline-block"
                >
                  {t('apiKeyGetOpenAI')}
                </a>
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleSave}
                disabled={!openrouterKey && !openaiKey}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {t('apiKeySave')}
              </button>
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {t('apiKeyClear')}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
