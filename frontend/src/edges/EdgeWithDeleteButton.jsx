// EdgeWithDeleteButton.jsx
// Custom edge component with delete button in the center

import React from 'react';
import { BaseEdge, getSmoothStepPath } from 'reactflow';
import { X } from 'lucide-react';

export default function EdgeWithDeleteButton({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onDelete = (e) => {
    e.stopPropagation();
    if (data?.onEdgeDelete) {
      data.onEdgeDelete(id);
    }
  };

  const edgeStyle = {
    ...style,
    stroke: 'hsl(var(--primary))',
    strokeWidth: 2.5,
    strokeOpacity: 0.8,
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={edgeStyle} />
      <g transform={`translate(${labelX}, ${labelY})`}>
        <circle
          cx={0}
          cy={0}
          r={14}
          fill="hsl(var(--card))"
          stroke="hsl(var(--primary))"
          strokeWidth={2.5}
          className="cursor-pointer hover:stroke-primary hover:fill-primary/30 transition-all"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
          onClick={onDelete}
        />
        <foreignObject x={-10} y={-10} width={20} height={20}>
          <div 
            className="flex items-center justify-center w-full h-full cursor-pointer"
            onClick={onDelete}
          >
            <X 
              size={14} 
              className="text-primary"
              style={{ strokeWidth: 3 }}
            />
          </div>
        </foreignObject>
      </g>
    </>
  );
}

