export interface DailyTask {
  _id: string;

  title: string;
  date: Date;
  isCompleted: boolean;

  inputType: 'none' | 'text' | 'image';
  inputText?: string;
  inputImage?: string;

  requiresNewTask: boolean;
  newTaskId?: string;

  createdAt: Date;
  updatedAt: Date;
}