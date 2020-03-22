export interface ITask {
  id: number;
  name: string;
  parentId: number;
}
export interface IWork {
  id: number;
  name: string;
  taskId: number;
  startDate: string;
  description: string | null;
  times: IWorkTime[];
}
export interface IWorkTime {
  id: number;
  startTime: string;
  endTime: string;
}
export interface IWorks {
  [id: string]: IWork;
}
