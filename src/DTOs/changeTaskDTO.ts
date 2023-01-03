export interface ChangeTaskDTO {
  id: number;
  userId: number;
  text?: string;
  finished?: boolean;
  finishedDate?: string;
}