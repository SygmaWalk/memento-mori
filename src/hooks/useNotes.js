import { useState } from 'react'

const STORAGE_KEY = 'memento-mori-notes'

function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch {
    return {}
  }
}

function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

export function useNotes() {
  const [notes, setNotes] = useState(loadNotes)

  const setNote = (weekIndex, text) => {
    setNotes((prev) => {
      const updated = { ...prev, [weekIndex]: text }
      if (!text.trim()) delete updated[weekIndex]
      saveNotes(updated)
      return updated
    })
  }

  const getNote = (weekIndex) => notes[weekIndex] || ''

  const hasNote = (weekIndex) => Boolean(notes[weekIndex])

  return { notes, setNote, getNote, hasNote }
}