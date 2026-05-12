import { useState } from 'react'

function BirthDateModal({ onConfirm }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  const handleConfirm = () => {
    if (!input) {
      setError('Ingresa tu fecha de nacimiento.')
      return
    }

    const date = new Date(input)
    const now = new Date()

    if (isNaN(date.getTime())) {
      setError('La fecha no es valida.')
      return
    }

    if (date >= now) {
      setError('La fecha debe ser en el pasado.')
      return
    }

    setError('')
    onConfirm(input)
  }

  return (
    <div className="fixed inset-0 bg-white dark:bg-black flex items-center justify-center z-50 px-6">
      <div className="flex flex-col gap-6 max-w-sm w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Antes de comenzar</h2>
          <p className="text-sm opacity-50 font-light leading-relaxed">
            Necesitamos tu fecha de nacimiento para calcular cuantas semanas has vivido y cuantas te quedan.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs tracking-widest uppercase opacity-60">
            Fecha de nacimiento
          </label>
          <input
            type="date"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border border-black dark:border-white bg-transparent px-4 py-3 text-sm focus:outline-none w-full"
          />
          {error && (
            <p className="text-xs opacity-60">{error}</p>
          )}
        </div>

        <button
          onClick={handleConfirm}
          className="border border-black dark:border-white px-8 py-3 text-xs tracking-[0.3em] uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
        >
          Continuar
        </button>
      </div>
    </div>
  )
}

export default BirthDateModal