import { useRef, useEffect } from 'react'

export function useCanvas(draw) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    draw(ctx, canvas)
  }, [draw])

  return canvasRef
}