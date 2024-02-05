import { BiChevronLeft, BiChevronRight } from "react-icons/bi"

export default function CalendarHeader({
  monthName,
  year,
  onPrevMonth,
  onNextMonth,
}: {
  monthName: string
  year: number
  onPrevMonth?: () => void
  onNextMonth?: () => void
}) {
  return (
    <div className="flex items-center gap-2">
      <button className={`text-4xl ${!onPrevMonth ? 'opacity-20 cursor-default' : ''}`}
        onClick={() => onPrevMonth && onPrevMonth()}
      >
        <BiChevronLeft className="pt-1" />
      </button>
      <h1 className="flex-1 ml-2 text-4xl font-bold text-center">
        {monthName} {year > 0 ? year : ''}
      </h1>
      <button
        className={`text-4xl ${!onNextMonth ? 'opacity-20 cursor-default' : ''}`}
        onClick={() => onNextMonth && onNextMonth()}
      >
        <BiChevronRight className="pt-1" />
      </button>
    </div>
  )
}