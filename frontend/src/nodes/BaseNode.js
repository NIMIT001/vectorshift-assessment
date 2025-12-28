// BaseNode.js
// Base component for all node types to eliminate code duplication

import { Handle, Position } from 'reactflow';
import { cn } from '../lib/utils';
import { useStore } from '../store';
import { X } from 'lucide-react';

export const BaseNode = ({ 
  id, 
  title, 
  handles = [], 
  children, 
  width = 200, 
  height = 80,
  className = '',
  icon: Icon
}) => {
  const deleteNode = useStore((state) => state.deleteNode);

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteNode(id);
  };

  return (
    <div
      className={cn(
        "base-node rounded-lg border bg-card text-card-foreground shadow-sm",
        "transition-all hover:shadow-lg hover:-translate-y-0.5",
        "p-3 flex flex-col gap-2 box-border relative",
        className
      )}
      style={{
        width,
        height,
      }}
    >
      {/* Render target handles (left side) */}
      {handles
        .filter(handle => handle.type === 'target')
        .map((handle, index) => (
          <Handle
            key={`target-${handle.id || index}`}
            type="target"
            position={Position.Left}
            id={handle.id}
            style={handle.style || { top: `${((index + 1) * 100) / (handles.filter(h => h.type === 'target').length + 1)}%` }}
            label={handle.label}
          />
        ))}
      
      {/* Delete button */}
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-secondary hover:bg-destructive/20 border border-border hover:border-destructive flex items-center justify-center transition-colors z-50 cursor-pointer"
        aria-label="Delete node"
        type="button"
      >
        <X className="h-4 w-4 text-foreground hover:text-destructive" strokeWidth={2.5} />
      </button>
      
      {/* Node header */}
      <div className="font-bold text-sm text-foreground border-b border-border pb-1 mb-1 flex items-center gap-2 pr-6">
        {Icon && <Icon className="h-5 w-5 text-primary flex-shrink-0" strokeWidth={2} />}
        <span>{title}</span>
      </div>
      
      {/* Node content */}
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        {children}
      </div>
      
      {/* Render source handles (right side) */}
      {handles
        .filter(handle => handle.type === 'source')
        .map((handle, index) => (
          <Handle
            key={`source-${handle.id || index}`}
            type="source"
            position={Position.Right}
            id={handle.id}
            style={handle.style || { top: `${((index + 1) * 100) / (handles.filter(h => h.type === 'source').length + 1)}%` }}
            label={handle.label}
          />
        ))}
    </div>
  );
};

