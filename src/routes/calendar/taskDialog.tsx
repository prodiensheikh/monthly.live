import { BiX } from "react-icons/bi"
import { DailyTask } from "../../types/dailyTask"
import TaskAccordian from "./taskAccordian"
import { formatTaskDialogDate } from "./dateUtils"

export default function TaskDialog({
  isOpen,
  onClose,
  selectedDate,
  tasks,
  setTasks,
}: {
  isOpen: boolean
  onClose: () => void
  selectedDate?: Date
  tasks?: DailyTask[],
  setTasks: (tasks: DailyTask[]) => void
}) {
  const addNewTask = () => {
    if (!selectedDate) return
    if (!tasks) return

    const tasksCopy = [...tasks]

    const now = new Date()
    const taskDate = new Date(selectedDate)
    taskDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds())

    tasksCopy.push({
      _id: Math.random().toString(36).substr(2, 9),
      title: `New Task ${tasks.length + 1}`,
      date: taskDate,
      isCompleted: false,
      inputType: 'none',
      requiresNewTask: false,

      createdAt: now,
      updatedAt: now,
    })

    setTasks(tasksCopy)
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-all duration-300`}
      style={{
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? 'visible' : 'hidden',
      }}
    // onClick={onClose}
    >
      <div
        className={`bg-white p-4 rounded-lg flex flex-col gap-4 transition-all duration-300`}
        style={{
          width: 'calc(100% - 2rem)',
          height: 'calc(100% - 2rem)',
          maxWidth: 'calc(80vmin - 2rem)',
          maxHeight: 'calc(80vmin - 2rem)',
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
        }}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {selectedDate ? formatTaskDialogDate(selectedDate) : ''}
          </h1>
          <button onClick={onClose}>
            <BiX className="text-2xl" />
          </button>
        </div>
        {tasks !== undefined && (!tasks.length ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p>There are no tasks for the day</p>
            <button
              className="mt-2 bg-primary-500 hover:bg-primary-700 text-white px-4 py-2 rounded"
              onClick={(e) => {
                e.stopPropagation()
                addNewTask()
              }}>
              Create Task
            </button>
          </div>
        ) : (
          <TaskAccordian
            tasks={tasks}
            setTasks={setTasks}
            addNewTask={addNewTask}
          />
        ))}
      </div>
    </div>
  )
}