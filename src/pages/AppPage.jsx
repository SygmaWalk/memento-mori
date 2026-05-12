import { useState } from 'react'
import { useBirthDate } from '../hooks/useBirthDate'
import BirthDateModal from '../components/calendar/BirthDateModal'
import LifeCalendar from '../components/calendar/LifeCalendar'
import CellTooltip from '../components/calendar/CellTooltip'
import StatsBar from '../components/calendar/StatsBar'
import EventModal from '../components/calendar/EventModal'
import { useNotes } from '../hooks/useNotes'

function AppPage() {
  const { birthDate, saveBirthDate } = useBirthDate()
  const [selectedWeek, setSelectedWeek] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const { setNote, getNote, hasNote } = useNotes()

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 57px)' }}>
      {!birthDate && (
        <BirthDateModal onConfirm={saveBirthDate} />
      )}

      {birthDate && (
        <>
          <StatsBar birthDate={birthDate} />
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 overflow-hidden">
              <LifeCalendar
                birthDate={birthDate}
                onSelectWeek={setSelectedWeek}
                hasNote={hasNote}
              />
            </div>

            <div
              style={{
                width: selectedWeek !== null ? '256px' : '0px',
                opacity: selectedWeek !== null ? 1 : 0,
                transition: 'width 300ms ease, opacity 300ms ease',
                overflow: 'hidden',
                borderLeft: selectedWeek !== null ? '1px solid' : 'none',
              }}
              className="border-black dark:border-white flex-shrink-0"
            >
              <div className="w-64 p-6 flex flex-col gap-4">
                {selectedWeek !== null && (
                  <CellTooltip
                    weekIndex={selectedWeek}
                    birthDate={birthDate}
                    hasNote={hasNote(selectedWeek)}
                    onOpenModal={() => setModalOpen(true)}
                  />
                )}
              </div>
            </div>
          </div>

          {modalOpen && selectedWeek !== null && (
            <EventModal
              weekIndex={selectedWeek}
              birthDate={birthDate}
              initialNote={getNote(selectedWeek)}
              onSave={setNote}
              onClose={() => setModalOpen(false)}
            />
          )}
        </>
      )}
    </div>
  )
}

export default AppPage