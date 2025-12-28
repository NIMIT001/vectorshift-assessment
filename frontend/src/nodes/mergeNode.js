// mergeNode.js

import { Layers } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { cn } from '../lib/utils';

export const MergeNode = ({ id, data }) => {
  const inputCount = data?.inputCount || 2;

  // Generate handles for multiple inputs
  const inputHandles = Array.from({ length: inputCount }, (_, i) => ({
    type: 'target',
    id: `${id}-input-${i + 1}`,
    label: `Input ${i + 1}`,
    style: { 
      top: `${((i + 1) * 100) / (inputCount + 1)}%` 
    }
  }));

  return (
    <BaseNode
      id={id}
      title="Merge"
      icon={Layers}
      handles={[
        ...inputHandles,
        {
          type: 'source',
          id: `${id}-output`,
          label: 'Merged Output'
        }
      ]}
      width={270}
      height={Math.max(140, 80 + inputCount * 30)}
      className={cn("border-l-4 border-l-[#6366f1]")}
    >
      <div className="text-xs text-muted-foreground">
        Merges {inputCount} inputs into a single output
      </div>
    </BaseNode>
  );
}

