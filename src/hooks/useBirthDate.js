import { useState } from 'react'

export function useBirthDate() {
  const [birthDate, setBirthDate] = useState(() => {
    const saved = localStorage.getItem('birthDate')
    return saved ? saved : null
  })

  const saveBirthDate = (date) => {
    localStorage.setItem('birthDate', date)
    setBirthDate(date)
  }

  const clearBirthDate = () => {
    localStorage.removeItem('birthDate')
    setBirthDate(null)
  }

  return { birthDate, saveBirthDate, clearBirthDate }
}