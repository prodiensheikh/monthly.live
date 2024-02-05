import { Fragment, useState } from "react"
import { DailyTask } from "../../types/dailyTask"
import { BiChevronDown, BiChevronUp } from "react-icons/bi"
import { formatDailyTaskTime } from "./dateUtils"

export default function TaskAccordian({
  tasks,
  setTasks,
  addNewTask,
}: {
  tasks: DailyTask[],
  setTasks: (tasks: DailyTask[]) => void
  addNewTask: () => void
}) {
  const [openTask, setOpenTask] = useState<string | null>(null)

  const isTaskCompletionAllowed = (task: DailyTask) => {
    let inputCheck = true
    let newTaskCheck = true

    if (task.inputType === 'text' && !task.inputText) inputCheck = false
    if (task.inputType === 'image' && !task.inputImage) inputCheck = false

    if (task.requiresNewTask && !task.newTaskId) newTaskCheck = false

    return inputCheck && newTaskCheck
  }

  const updateTaskCompletion = (taskId: string) => {
    const taskCopy = [...tasks]
    const task = taskCopy.find((task) => task._id === taskId)

    if (!task || !isTaskCompletionAllowed(task)) return
    task.isCompleted = !task.isCompleted

    setTasks(taskCopy)
  }

  const updateTask = (taskId: string, task: Partial<DailyTask>) => {
    const taskCopy = [...tasks]
    const index = taskCopy.findIndex((t) => t._id === taskId)

    if (index === -1) return
    taskCopy[index] = { ...taskCopy[index], ...task }

    setTasks(taskCopy)
  }

  return (
    <div className="flex flex-col mt-4 max-h-full overflow-scroll gap-2 no-scrollbar">
      {tasks.map((task) => (
        <Fragment key={task._id}>
          <div
            key={task._id}
            className="flex flex-col"
          >
            <div
              className="flex bg-gray-200 p-2 items-center rounded gap-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                if (openTask === task._id)
                  setOpenTask(null)
                else
                  setOpenTask(task._id)
              }}
            >
              <input
                className="h-4 w-4"
                type="checkbox"
                checked={task.isCompleted}
                onChange={(e) => {
                  e.stopPropagation()
                  updateTaskCompletion(task._id)
                }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  accentColor: '#FF4D4D',
                  color: '#FFFFFF',
                }}
              />

              <p className="flex-1">
                {formatDailyTaskTime(task.date)}
                &nbsp;-&nbsp;
                {task.title}
              </p>

              {openTask === task._id ? (
                <BiChevronUp
                  className="cursor-pointer text-2xl"
                />
              ) : (
                <BiChevronDown
                  className="cursor-pointer text-2xl"
                />
              )}
            </div>

            {openTask === task._id && (
              <div className="px-2 pt-2 bg-gray-100 rounded-b flex flex-col gap-2">
                {task.inputType === 'text' && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="w-full p-1 rounded-sm border text-sm"
                      value={task.inputText}
                      placeholder="Task Input"
                      onChange={(e) => updateTask(task._id, { inputText: e.target.value, isCompleted: false })}
                    />
                  </div>
                )}

                {task.requiresNewTask && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="w-full p-1 rounded-sm border text-sm"
                      value={task.newTaskId}
                      placeholder="New Task ID"
                      onChange={(e) => updateTask(task._id, { newTaskId: e.target.value, isCompleted: false })}
                    />
                  </div>
                )}

                <div className="bg-gray-300 h-px mb-2" />
              </div>
            )}

            {openTask === task._id && (
              <div className="px-2 pb-2 bg-gray-100 rounded-b flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="w-full p-1 rounded-sm border text-sm"
                    value={task.title}
                    placeholder="Task Title"
                    onChange={(e) => updateTask(task._id, { title: e.target.value, isCompleted: false })}
                  />

                  <input
                    type="time"
                    className="p-1 rounded-sm border text-sm flex-shrink-0"
                    step={120}
                    value={task.date.toTimeString().split(' ')[0]}
                    onChange={(e) => updateTask(task._id, { date: new Date(`${task.date.toISOString().split('T')[0]}T${e.target.value}`), isCompleted: false })}
                  />
                </div>

                <div className="flex gap-2 items-center text-sm">
                  <div className="flex items-center gap-1">
                    <input
                      type="radio"
                      checked={task.inputType === 'none'}
                      onChange={() => updateTask(task._id, { inputType: 'none', isCompleted: false })}
                    />
                    <label htmlFor={`text-${task._id}`}>None</label>
                  </div>

                  <div className="flex items-center gap-1">
                    <input
                      type="radio"
                      checked={task.inputType === 'text'}
                      onChange={() => updateTask(task._id, { inputType: 'text', isCompleted: false, inputText: '' })}
                    />
                    <label htmlFor={`text-${task._id}`}>Text</label>
                  </div>

                  {/* <div className="flex items-center gap-1">
                    <input
                      type="radio"
                      checked={task.inputType === 'image'}
                      onChange={() => updateTask(task._id, { inputType: 'image' })}
                    />
                    <label htmlFor={`image-${task._id}`}>Image</label>
                  </div> */}

                  <div className="flex items-center gap-1 ml-auto">
                    <input
                      type="checkbox"
                      checked={task.requiresNewTask}
                      onChange={() => updateTask(task._id, { requiresNewTask: !task.requiresNewTask, newTaskId: '', isCompleted: false })}
                    />
                    <label htmlFor={`text-${task._id}`}>
                      Requires New Task
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Fragment>
      ))}

      <button
        className="bg-primary-500 text-white p-2 rounded mt-4"
        onClick={addNewTask}
      >
        Add New Task
      </button>
    </div >
  )
}