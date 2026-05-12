import { useCallback, useEffect, useRef, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useZoomPan } from '../../hooks/useZoomPan'
import {
  TOTAL_WEEKS,
  WEEKS_PER_YEAR,
  getCurrentWeekIndex,
} from '../../utils/lifeCalcUtils'

const CELL_SIZE = 12
const CELL_GAP = 3
const COLS = WEEKS_PER_YEAR
const ROWS = Math.ceil(TOTAL_WEEKS / COLS)
const AXIS_X = 48
const AXIS_Y = 24
const GRID_WIDTH = COLS * (CELL_SIZE + CELL_GAP)
const GRID_HEIGHT = ROWS * (CELL_SIZE + CELL_GAP)
function getWeekIndexFromCursor(e, canvas, transform) {
  const rect = canvas.getBoundingClientRect()
  const cursorX = e.clientX - rect.left
  const cursorY = e.clientY - rect.top

  const worldX = (cursorX - AXIS_X - transform.offsetX) / transform.scale
  const worldY = (cursorY - AXIS_Y - transform.offsetY) / transform.scale

  const col = Math.floor(worldX / (CELL_SIZE + CELL_GAP))
  const row = Math.floor(worldY / (CELL_SIZE + CELL_GAP))

  if (col < 0 || col >= COLS || row < 0 || row >= ROWS) return null

  const index = row * COLS + col
  if (index >= TOTAL_WEEKS) return null

  return index
}

function LifeCalendar({ birthDate, onSelectWeek }) {
  const canvasRef = useRef(null)
  const { isDark } = useTheme()
  const currentWeek = getCurrentWeekIndex(birthDate)
  const { transform, resetTransform, handlers } = useZoomPan(
    canvasRef,
    GRID_WIDTH,
    GRID_HEIGHT,
    AXIS_X,
    AXIS_Y
  )


  const hoveredWeekRef = useRef(null)
  const selectedWeekRef = useRef(null)
  const [selectedWeek, setSelectedWeek] = useState(null)

  const progressRef = useRef(0)
  const animFrameRef = useRef(null)
  const pulseRef = useRef(0)

  const transformRef = useRef(transform)
  const isDarkRef = useRef(isDark)

  useEffect(() => { transformRef.current = transform }, [transform])
  useEffect(() => { isDarkRef.current = isDark }, [isDark])

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const isDarkNow = isDarkRef.current
    const transformNow = transformRef.current

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const textColor = isDarkNow ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'
    const axisFont = '13px Inter, sans-serif'
    const bgColor = isDarkNow ? '#000000' : '#ffffff'

    // fondo solido inicial
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, AXIS_X, canvas.height)
    ctx.fillRect(0, 0, canvas.width, AXIS_Y)

    // clip al area de celdas
    ctx.save()
    ctx.beginPath()
    ctx.rect(AXIS_X, AXIS_Y, canvas.width - AXIS_X, canvas.height - AXIS_Y)
    ctx.clip()

    // grid de celdas dentro del clip
    ctx.save()
    ctx.translate(AXIS_X + transformNow.offsetX, AXIS_Y + transformNow.offsetY)
    ctx.scale(transformNow.scale, transformNow.scale)

    const colorPast = isDarkNow ? '#ffffff' : '#000000'
    const colorFuture = isDarkNow ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'
    const colorHover = isDarkNow ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)'
    const colorSelected = isDarkNow ? '#ffffff' : '#000000'
    const visibleUpTo = Math.floor(progressRef.current * TOTAL_WEEKS)
    const pulseOpacity = 0.5 + 0.5 * Math.sin(pulseRef.current)
    const base = isDarkNow ? 255 : 0

    for (let i = 0; i < visibleUpTo; i++) {
      const col = i % COLS
      const row = Math.floor(i / COLS)
      const x = col * (CELL_SIZE + CELL_GAP)
      const y = row * (CELL_SIZE + CELL_GAP)

      if (i === selectedWeekRef.current) {
        ctx.fillStyle = colorSelected
        ctx.fillRect(x - 1, y - 1, CELL_SIZE + 2, CELL_SIZE + 2)
      } else if (i === hoveredWeekRef.current) {
        ctx.fillStyle = colorHover
        ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE)
      } else if (i === currentWeek) {
        ctx.fillStyle = `rgba(${base},${base},${base},${pulseOpacity})`
        ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE)
        ctx.fillStyle = isDarkNow ? '#000000' : '#ffffff'
        ctx.fillRect(x + 3, y + 3, CELL_SIZE - 6, CELL_SIZE - 6)
      } else if (i < currentWeek) {
        ctx.fillStyle = colorPast
        ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE)
      } else {
        ctx.fillStyle = colorFuture
        ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE)
      }
    }

    ctx.restore()
    ctx.restore() // cierra el clip

    // ejes dibujados encima con fondo solido
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, AXIS_X, canvas.height)
    ctx.fillRect(0, 0, canvas.width, AXIS_Y)

    ctx.fillStyle = textColor
    ctx.font = axisFont

    // eje horizontal - semanas cada 10
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    for (let col = 0; col < COLS; col += 10) {
      const x = AXIS_X + transformNow.offsetX + col * (CELL_SIZE + CELL_GAP) * transformNow.scale
      if (x < AXIS_X || x > canvas.width) continue
      ctx.fillText(col + 1, x + (CELL_SIZE * transformNow.scale) / 2, AXIS_Y / 2)
    }

    // eje vertical - anos cada 10
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'

    for (let row = 0; row < ROWS; row += 10) {
      const y = AXIS_Y + transformNow.offsetY + row * (CELL_SIZE + CELL_GAP) * transformNow.scale
      if (y < AXIS_Y || y > canvas.height) continue
      ctx.fillText(row + 1, AXIS_X - 6, y + (CELL_SIZE * transformNow.scale) / 2)
    }

    // linea separadora de ejes
    const lineColor = isDarkNow ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'
    ctx.strokeStyle = lineColor
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(AXIS_X, 0)
    ctx.lineTo(AXIS_X, canvas.height)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, AXIS_Y)
    ctx.lineTo(canvas.width, AXIS_Y)
    ctx.stroke()

  }, [currentWeek])

  useEffect(() => {
    progressRef.current = 0
    pulseRef.current = 0

    const animate = () => {
      if (progressRef.current < 1) {
        progressRef.current = Math.min(1, progressRef.current + 0.012)
      }
      pulseRef.current += 0.05
      drawFrame()
      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [drawFrame])

  const handleMouseMove = useCallback((e) => {
    handlers.onMouseMove(e)
    const canvas = canvasRef.current
    if (!canvas) return
    const index = getWeekIndexFromCursor(e, canvas, transformRef.current)
    hoveredWeekRef.current = index
    canvas.style.cursor = index !== null ? 'pointer' : 'grab'
  }, [handlers])

  const handleClick = useCallback((e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const index = getWeekIndexFromCursor(e, canvas, transformRef.current)
    if (index === null) return
    const next = selectedWeekRef.current === index ? null : index
    selectedWeekRef.current = next
    setSelectedWeek(next)
    onSelectWeek(next)
  }, [onSelectWeek])

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 px-4 py-2 border-b border-black dark:border-white">
        <button
          onClick={resetTransform}
          className="border border-black dark:border-white px-4 py-1 text-xs tracking-widest uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200"
        >
          Reset
        </button>
        {selectedWeek !== null && (
          <p className="text-xs opacity-50">
            Semana {selectedWeek + 1} seleccionada
          </p>
        )}
      </div>

      <canvas
        ref={canvasRef}
        style={{ width: '100%', flex: 1 }}
        {...handlers}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      />
    </div>
  )
}

export default LifeCalendar