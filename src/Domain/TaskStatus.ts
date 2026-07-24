export enum TaskStatus {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE'
}

export function taskStatusFromString(status: string): TaskStatus {
  const s = status.toUpperCase().trim();
  if (s === 'TODO') return TaskStatus.TODO;
  if (s === 'DOING') return TaskStatus.DOING;
  if (s === 'DONE') return TaskStatus.DONE;
  throw new Error(`Bad status: ${status}`);
}
