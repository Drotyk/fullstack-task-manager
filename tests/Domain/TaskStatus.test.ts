import { describe, it, expect } from 'vitest';
import { TaskStatus, taskStatusFromString } from '../../src/Domain/TaskStatus.js';

describe('TaskStatus', () => {
  it('should parse valid status strings correctly', () => {
    expect(taskStatusFromString('TODO')).toBe(TaskStatus.TODO);
    expect(taskStatusFromString('doing')).toBe(TaskStatus.DOING);
    expect(taskStatusFromString('DONE ')).toBe(TaskStatus.DONE);
  });

  it('should throw an error for invalid status strings', () => {
    expect(() => taskStatusFromString('INVALID')).toThrow('Bad status: INVALID');
    expect(() => taskStatusFromString('')).toThrow('Bad status: ');
  });
});
