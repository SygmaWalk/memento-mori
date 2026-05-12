import { useRef, useState, useCallback, useEffect } from 'react'

const MAX_SCALE = 5

function clampOffset(offsetX, offsetY, scale, canvas, gridWidth, gridHeight, axisX, axisY) {
  const availableW = canvas.offsetWidth - axisX
  const availableH = canvas.offsetHeight - axisY

  const scaledW = gridWidth * scale
  const scaledH = gridHeight * scale

  const minX = scaledW > availableW ? -(scaledW - availableW) : 0
  const maxX = 0

  const minY = scaledH > availableH ? -(scaledH - availableH) : 0
  const maxY = 0

  return {
    offsetX: Math.min(maxX, Math.max(minX, offsetX)),
    offsetY: Math.min(maxY, Math.max(minY, offsetY)),
  }
}

function calcFitScale(canvas, gridWidth, gridHeight, axisX, axisY) {
  const availableW = canvas.offsetWidth - axisX
  return availableW / gridWidth
}

export function useZoomPan(canvasRef, gridWidth, gridHeight, axisX, axisY) {
  const [transform, setTransform] = useState({
    scale: 1,
    offsetX: 0,
    offsetY: 0,
  })

  const minScaleRef = useRef(0.3)
  const isPanning = useRef(false)
  const lastPos = useRef({ x: 0, y: 0 })

  // calcular scale inicial cuando el canvas esta listo
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const fitScale = calcFitScale(canvas, gridWidth, gridHeight, axisX, axisY)
    minScaleRef.current = fitScale

    setTransform({
      scale: fitScale,
      offsetX: 0,
      offsetY: 0,
    })
  }, [canvasRef, gridWidth, gridHeight, axisX, axisY])

  const onWheel = useCallback((e) => {
    e.preventDefault()
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()

    const mouseX = e.clientX - rect.left - axisX
    const mouseY = e.clientY - rect.top - axisY

    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9

    setTransform((prev) => {
      const newScale = Math.min(MAX_SCALE, Math.max(minScaleRef.current, prev.scale * zoomFactor))

      const rawOffsetX = mouseX - (mouseX - prev.offsetX) * (newScale / prev.scale)
      const rawOffsetY = mouseY - (mouseY - prev.offsetY) * (newScale / prev.scale)

      const clamped = clampOffset(rawOffsetX, rawOffsetY, newScale, canvas, gridWidth, gridHeight, axisX, axisY)

      return { scale: newScale, ...clamped }
    })
  }, [canvasRef, gridWidth, gridHeight, axisX, axisY])

  const onMouseDown = useCallback((e) => {
    isPanning.current = true
    lastPos.current = { x: e.clientX, y: e.clientY }
  }, [])

  const onMouseMove = useCallback((e) => {
    if (!isPanning.current) return
    const canvas = canvasRef.current
    if (!canvas) return

    const dx = e.clientX - lastPos.current.x
    const dy = e.clientY - lastPos.current.y
    lastPos.current = { x: e.clientX, y: e.clientY }

    setTransform((prev) => {
      const rawOffsetX = prev.offsetX + dx
      const rawOffsetY = prev.offsetY + dy
      const clamped = clampOffset(rawOffsetX, rawOffsetY, prev.scale, canvas, gridWidth, gridHeight, axisX, axisY)
      return { ...prev, ...clamped }
    })
  }, [canvasRef, gridWidth, gridHeight, axisX, axisY])

  const onMouseUp = useCallback(() => {
    isPanning.current = false
  }, [])

  const resetTransform = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const fitScale = calcFitScale(canvas, gridWidth, gridHeight, axisX, axisY)
    setTransform({ scale: fitScale, offsetX: 0, offsetY: 0 })
  }, [canvasRef, gridWidth, gridHeight, axisX, axisY])

  return {
    transform,
    resetTransform,
    handlers: { onWheel, onMouseDown, onMouseMove, onMouseUp, onMouseLeave: onMouseUp },
  }
}