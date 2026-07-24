import { TaskStatus } from "./TaskStatus.js";

export class Task {
    constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly description: string,
        public readonly status: TaskStatus,
        public readonly priority: number,
        public readonly dueDate: string
    ) {}
}
