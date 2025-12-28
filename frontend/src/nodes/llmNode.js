// llmNode.js

import { MessageCircle } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { cn } from '../lib/utils';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      icon={MessageCircle}
      handles={[
        {
          type: 'target',
          id: `${id}-system`,
          label: 'System',
          style: { top: '33%' }
        },
        {
          type: 'target',
          id: `${id}-prompt`,
          label: 'Prompt',
          style: { top: '67%' }
        },
        {
          type: 'source',
          id: `${id}-response`,
          label: 'Response'
        }
      ]}
      className={cn("border-l-4 border-l-[#8b5cf6]")}
    >
      <span className="text-xs text-muted-foreground">This is a LLM.</span>
    </BaseNode>
  );
}
