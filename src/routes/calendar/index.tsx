import { useCallback, useEffect, useMemo, useState } from "react"
import { DAYS, compareWithToday, getMonthEndDate, getMonthEndPadding, getMonthName, getMonthStartDate, getMonthStartPadding } from "./dateUtils"
import CalendarHeader from "./calendarHeader"
import TaskDialog from "./taskDialog"
import { DailyTask } from "../../types/dailyTask"
import { getBackgroundColor } from "./calcUtils"

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState<Date>()
  const [selectedDate, setSelectedDate] = useState<Date>()

  const [loadingDailyTasks, setLoadingDailyTasks] = useState(true)
  const [dailyTasks, setDailyTasks] = useState<Record<string, { percentage: number, tasks: DailyTask[] }>>({})

  const monthName = currentDate && getMonthName(currentDate)
  const year = currentDate && currentDate.getFullYear()
  const monthStart = useMemo(() => currentDate && getMonthStartDate(currentDate), [currentDate])
  const monthEnd = useMemo(() => currentDate && getMonthEndDate(currentDate), [currentDate])

  const startPadding = useMemo(() => currentDate && getMonthStartPadding(currentDate), [currentDate])
  const endPadding = useMemo(() => currentDate && getMonthEndPadding(currentDate), [currentDate])

  const getDailyTasks = useCallback(async () => {
    try {
      setLoadingDailyTasks(true)
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingDailyTasks(false)
    }
  }, [])

  useEffect(() => {
    if (!monthStart) return
    getDailyTasks()
  }, [monthStart, getDailyTasks])

  useEffect(() => {
    const today = new Date()
    setCurrentDate(today)
  }, [])

  const renderDaysHeader = () => {
    return DAYS.map((day, index) => (
      <div key={index} className="flex items-center justify-center bg-gray-700 text-white p-2 text-sm">
        {day}
      </div>
    ))
  }

  const renderPadding = (padding?: Date[]) => {
    if (!padding) return null
    return padding.map((date, index) => (
      <div
        key={`${date.getDate()}-${index}`}
        className={`w-full flex items-center justify-center bg-white p-2 opacity-50 cursor-default text-gray-400`}
        style={{
          height: 'calc(80vh / 7)',
          maxHeight: 'calc(80vmin / 7)',
        }}
      >
        {date.getDate()}
      </div>
    ))
  }

  const renderDays = () => {
    if (!monthStart || !monthEnd) return null

    const days = Array.from({ length: monthEnd.getDate() }, (_, index) => {
      const day = new Date(monthStart)
      day.setDate(index + 1)
      return day
    })

    return days.map((date, index) => (
      <div
        key={`${date.getDate()}-${index}`}
        className={`relative w-full flex items-center justify-center bg-white aspect-square p-2 hover:bg-gray-200 cursor-pointer ${loadingDailyTasks ? 'animate-pulse' : ''}`}
        style={{
          height: 'calc(80vh / 7)',
          maxHeight: 'calc(80vmin / 7)',
          backgroundColor: compareWithToday(date) < 0 ? dailyTasks[date.toDateString()]?.tasks.length ? getBackgroundColor(dailyTasks[date.toDateString()]?.percentage) : 'rgb(35,217,132)' : 'white',
        }}
        onClick={() => setSelectedDate(date)}
      >
        {compareWithToday(date) === 0 && (
          <div className="absolute top-2 left-2 w-2 h-2 bg-primary-500 rounded-full" />
        )}
        {compareWithToday(date) === 0 && (
          <div className="absolute top-1 right-2 rounded-full text-xs font-semibold"
            style={{
              color: getBackgroundColor(dailyTasks[date.toDateString()]?.percentage),
            }}
          >
            {dailyTasks[date.toDateString()] ? (dailyTasks[date.toDateString()]?.percentage || 0) * dailyTasks[date.toDateString()]?.tasks.length : 0}/{dailyTasks[date.toDateString()] ? dailyTasks[date.toDateString()]?.tasks.length : 0}
          </div>
        )}
        {date.getDate()}
      </div>
    ))
  }

  const changeMonth = (direction: 'prev' | 'next') => {
    if (!currentDate) return
    const newDate = new Date(currentDate)
    newDate.setMonth(
      direction === 'prev'
        ? newDate.getMonth() - 1
        : newDate.getMonth() + 1
    )
    setCurrentDate(newDate)
  }

  const updateDailyTasks = useCallback((date?: Date, tasks?: DailyTask[]) => {
    if (!date) return
    if (!tasks) return

    setDailyTasks((prev) => ({
      ...prev,
      [date.toDateString()]: {
        percentage: tasks.filter((task) => task.isCompleted).length / tasks.length,
        tasks,
      }
    }))
  }, [])

  if (!currentDate) return null
  return (
    <>
      <div className="flex flex-col p-2 h-full justify-center">
        <CalendarHeader
          monthName={monthName ?? ''}
          year={year ?? 0}
          onPrevMonth={() => changeMonth('prev')}
          onNextMonth={() => changeMonth('next')}
        />

        <div className="grid grid-cols-7 mt-4">
          {renderDaysHeader()}
        </div>

        <div className="grid grid-cols-7 gap-2 mt-2">
          {renderPadding(startPadding)}
          {renderDays()}
          {renderPadding(endPadding)}
        </div>
      </div>

      <TaskDialog
        isOpen={!!selectedDate && !loadingDailyTasks}
        onClose={() => setSelectedDate(undefined)}
        selectedDate={selectedDate}
        tasks={selectedDate ? dailyTasks[selectedDate.toDateString()]?.tasks ?? [] : []}
        setTasks={(tasks) => updateDailyTasks(selectedDate, tasks)}
      />
    </>
  )
}