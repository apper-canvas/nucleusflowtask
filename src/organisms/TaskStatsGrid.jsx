import React from 'react';
import StatCard from '../molecules/StatCard';

const TaskStatsGrid = ({ taskStats }) => (
  <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
    <StatCard
      iconName="CheckSquare"
      iconBgClass="bg-primary/10"
      value={taskStats.total}
      label="Total Tasks"
    />
    <StatCard
      iconName="Circle"
      iconBgClass="bg-surface-100 dark:bg-surface-700 text-surface-500"
      value={taskStats.todo}
      label="To Do"
    />
    <StatCard
      iconName="Clock"
      iconBgClass="bg-blue-50 dark:bg-blue-900/20 text-blue-500"
      value={taskStats.inProgress}
      label="In Progress"
    />
    <StatCard
      iconName="CheckCircle"
      iconBgClass="bg-secondary/10 text-secondary"
      value={taskStats.done}
      label="Completed"
    />
    <StatCard
      iconName="AlertTriangle"
      iconBgClass="bg-urgent/10 text-urgent"
      value={taskStats.overdue}
      label="Overdue"
    />
  </div>
);

export default TaskStatsGrid;