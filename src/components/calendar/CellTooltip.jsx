import { useEffect, useState } from 'react'
import { getWeekData } from '../../utils/lifeCalcUtils'

function formatDate(date) {
  return date.toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function CellTooltip({ weekIndex, birthDate, hasNote, onOpenModal }) {
  const [visible, setVisible] = useState(false)
  const data = getWeekData(birthDate, weekIndex)

  useEffect(() => {
    setVisible(false)
    const timeout = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(timeout)
  }, [weekIndex])

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 250ms ease, transform 250ms ease',
      }}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1">
        <p className="text-xs tracking-widest uppercase opacity-40">
          Ano {data.year + 1} - Semana {data.weekOfYear + 1}
        </p>
        <p className="text-sm font-bold">
          {formatDate(data.weekStart)}
        </p>
        <p className="text-xs opacity-40">
          {formatDate(data.weekEnd)}
        </p>
        <p className="text-xs opacity-30 mt-1">
          Semana {weekIndex + 1} de 4.160
        </p>
      </div>

      <button
        onClick={onOpenModal}
        className="text-xs tracking-widest uppercase border border-black dark:border-white px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200"
      >
        {hasNote ? 'Editar nota' : 'Agregar nota'}
      </button>
    </div>
  )
}

export default CellTooltip