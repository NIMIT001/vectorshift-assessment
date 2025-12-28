// transformNode.js

import { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { cn } from '../lib/utils';

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'uppercase');
  const [customFunction, setCustomFunction] = useState(data?.customFunction || '');

  return (
    <BaseNode
      id={id}
      title="Transform"
      icon={Wand2}
      handles={[
        {
          type: 'target',
          id: `${id}-input`,
          label: 'Input'
        },
        {
          type: 'source',
          id: `${id}-output`,
          label: 'Output'
        }
      ]}
      width={280}
      height={170}
      className={cn("border-l-4 border-l-[#06b6d4]")}
    >
      <div className="flex flex-col gap-1 min-w-0">
        <Label className="text-xs">Transform Type:</Label>
        <Select value={transformType} onValueChange={setTransformType}>
          <SelectTrigger className="h-8 text-xs w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="uppercase">Uppercase</SelectItem>
            <SelectItem value="lowercase">Lowercase</SelectItem>
            <SelectItem value="trim">Trim</SelectItem>
            <SelectItem value="reverse">Reverse</SelectItem>
            <SelectItem value="custom">Custom Function</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {transformType === 'custom' && (
        <div className="flex flex-col gap-1 min-w-0">
          <Label className="text-xs">Function:</Label>
          <Input 
            type="text" 
            value={customFunction} 
            onChange={(e) => setCustomFunction(e.target.value)}
            placeholder="x => x.toUpperCase()"
            className="h-8 text-xs w-full"
          />
        </div>
      )}
    </BaseNode>
  );
}

