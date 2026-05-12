import { useState, useEffect } from 'react'
import { getWeekData } from '../../utils/lifeCalcUtils'

function formatDate(date) {
  return date.toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function EventModal({ weekIndex, birthDate, initialNote, onSave, onClose }) {
  const [text, setText] = useState(initialNote || '')
  const data = getWeekData(birthDate, weekIndex)

  useEffect(() => {
    setText(initialNote || '')
  }, [weekIndex, initialNote])

  const handleSave = () => {
    onSave(weekIndex, text)
    onClose()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-black border border-black dark:border-white w-full max-w-md flex flex-col gap-6 p-8"
        style={{
          animation: 'modalIn 200ms ease',
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="flex flex-col gap-1">
          <p className="text-xs tracking-widest uppercase opacity-40">
            Ano {data.year + 1} - Semana {data.weekOfYear + 1}
          </p>
          <h2 className="text-xl font-bold">
            {formatDate(data.weekStart)}
          </h2>
          <p className="text-xs opacity-40">
            {formatDate(data.weekEnd)}
          </p>
        </div>

        <textarea
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe una nota para esta semana..."
          rows={5}
          className="w-full bg-transparent border border-black dark:border-white p-4 text-sm font-light leading-relaxed resize-none focus:outline-none placeholder:opacity-30"
        />

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="text-xs tracking-widest uppercase px-4 py-2 opacity-40 hover:opacity-100 transition-opacity duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="text-xs tracking-widest uppercase border border-black dark:border-white px-6 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventModal