import { getWeeksLived, getLifePercentage, TOTAL_WEEKS } from '../../utils/lifeCalcUtils'

function StatsBar({ birthDate }) {
  const lived = getWeeksLived(birthDate)
  const remaining = TOTAL_WEEKS - lived
  const percentage = getLifePercentage(birthDate)

  return (
    <div className="flex items-center gap-12 px-6 py-4 border-b border-black dark:border-white">
      <div className="flex flex-col gap-1">
        <span className="text-xs tracking-widest uppercase text-black dark:text-white opacity-40">
          Semanas vividas
        </span>
        <span className="text-lg font-bold tracking-tight">
          {lived.toLocaleString('es-AR')}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs tracking-widest uppercase text-black dark:text-white opacity-40">
          Semanas restantes
        </span>
        <span className="text-lg font-bold tracking-tight">
          {remaining.toLocaleString('es-AR')}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs tracking-widest uppercase text-black dark:text-white opacity-40">
          Vida transcurrida
        </span>
        <span className="text-lg font-bold tracking-tight">
          {percentage}%
        </span>
      </div>
    </div>
  )
}

export default StatsBar