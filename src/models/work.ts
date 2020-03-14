export interface IWork {
  id: number;
  name: string;
  taskId: number;
  startTime: string;
  description: string | null;
  times: Time[];
}
export interface Time {
  id: number;
  startTime: string;
  endTime: string;
}