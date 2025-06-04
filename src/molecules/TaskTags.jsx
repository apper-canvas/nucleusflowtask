import React from 'react';
import Tag from '../atoms/Tag';

const TaskTags = ({ tags }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1">
      {tags.slice(0, 3).map((tag, index) => (
        <Tag key={index}>{tag}</Tag>
      ))}
      {tags.length > 3 && (
        <Tag>+{tags.length - 3}</Tag>
      )}
    </div>
  );
};

export default TaskTags;