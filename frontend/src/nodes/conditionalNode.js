// conditionalNode.js

import { useState } from 'react';
import { GitBranch } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { cn } from '../lib/utils';

export const ConditionalNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');
  const [operator, setOperator] = useState(data?.operator || '==');

  return (
    <BaseNode
      id={id}
      title="Conditional"
      icon={GitBranch}
      handles={[
        {
          type: 'target',
          id: `${id}-input`,
          label: 'Input'
        },
        {
          type: 'source',
          id: `${id}-true`,
          label: 'True',
          style: { top: '33%' }
        },
        {
          type: 'source',
          id: `${id}-false`,
          label: 'False',
          style: { top: '67%' }
        }
      ]}
      width={280}
      height={180}
      className={cn("border-l-4 border-l-[#ef4444]")}
    >
      <div className="flex flex-col gap-1 min-w-0">
        <Label className="text-xs">Condition:</Label>
        <Input 
          type="text" 
          value={condition} 
          onChange={(e) => setCondition(e.target.value)}
          placeholder="value"
          className="h-8 text-xs w-full"
        />
      </div>
      <div className="flex flex-col gap-1 min-w-0">
        <Label className="text-xs">Operator:</Label>
        <Select value={operator} onValueChange={setOperator}>
          <SelectTrigger className="h-8 text-xs w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="==">Equals (==)</SelectItem>
            <SelectItem value="!=">Not Equals (!=)</SelectItem>
            <SelectItem value=">">Greater Than (&gt;)</SelectItem>
            <SelectItem value="<">Less Than (&lt;)</SelectItem>
            <SelectItem value=">=">Greater or Equal (&gt;=)</SelectItem>
            <SelectItem value="<=">Less or Equal (&lt;=)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </BaseNode>
  );
}

