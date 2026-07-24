import React, { createContext, useContext } from 'react';
import { TaskService } from './TaskService.js';

const TaskServiceContext = createContext<TaskService | null>(null);

export const TaskServiceProvider: React.FC<{ service: TaskService; children: React.ReactNode }> = ({ service, children }) => {
    return (
        <TaskServiceContext.Provider value={service}>
            {children}
        </TaskServiceContext.Provider>
    );
};

export const useTaskService = (): TaskService => {
    const context = useContext(TaskServiceContext);
    if (!context) {
        throw new Error('useTaskService must be used within a TaskServiceProvider');
    }
    return context;
};
