import { useState, useCallback } from 'react'
import { useI18n } from '../utils/i18n'

interface UploadCardProps {
  onImageUpload: (image: string) => void
}

export function UploadCard({ onImageUpload }: UploadCardProps) {
  const { t } = useI18n()
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert(t('uploadAlertFile'))
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(t('uploadAlertSize'))
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setPreview(result)
      onImageUpload(result)
    }
    reader.readAsDataURL(file)
  }, [onImageUpload])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFile(file)
    }
  }, [handleFile])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }, [handleFile])

  // 支持复制粘贴
  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items
    if (!items) return

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile()
        if (file) {
          handleFile(file)
          e.preventDefault()
          break
        }
      }
    }
  }, [handleFile])

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4 text-foreground">
        {t('uploadTitle')}
      </h2>

      <div
        className={`relative border-2 border-dashed rounded-lg p-4 md:p-8 transition-colors ${
          isDragging
            ? 'border-primary bg-primary/10'
            : 'border-border hover:border-primary/50'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onPaste={handlePaste}
        tabIndex={0}
      >
        {preview ? (
          <div className="space-y-4">
            <img
              src={preview}
              alt="Preview"
              className="max-h-48 md:max-h-64 mx-auto rounded-lg shadow-md"
            />
            <button
              onClick={() => {
                setPreview(null)
                onImageUpload('')
              }}
              className="w-full btn-primary bg-secondary text-secondary-foreground hover:opacity-80"
            >
              {t('uploadReplace')}
            </button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <svg className="mx-auto h-12 w-12 md:h-16 md:w-16 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="space-y-2">
              <p className="text-base font-medium text-foreground">
                {t('uploadDrop')}
              </p>
              <p className="text-sm text-muted-foreground">
                {t('uploadBrowse')}
              </p>
              <p className="text-xs text-muted-foreground">
                {t('uploadFormat')}
              </p>
            </div>

            <label className="inline-block">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
              <span className="btn-primary cursor-pointer inline-block">
                {t('uploadDrop').split(' ')[0]}
              </span>
            </label>
          </div>
        )}
      </div>

      <div className="mt-4 p-3 bg-muted rounded-lg border border-border">
        <p className="text-xs text-muted-foreground leading-relaxed">
          {t('uploadTips')}
        </p>
      </div>
    </div>
  )
}
