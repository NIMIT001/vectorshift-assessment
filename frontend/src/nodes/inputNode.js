// inputNode.js

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { cn } from '../lib/utils';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Input"
      icon={ArrowRight}
      handles={[
        {
          type: 'source',
          id: `${id}-value`,
          label: 'Value'
        }
      ]}
      width={270}
      height={170}
      className={cn("border-l-4 border-l-[#3b82f6]")}
    >
      <div className="flex flex-col gap-1 min-w-0">
        <Label className="text-xs">Name:</Label>
        <Input 
          type="text" 
          value={currName} 
          onChange={handleNameChange}
          className="h-8 text-xs w-full"
        />
      </div>
      <div className="flex flex-col gap-1 min-w-0">
        <Label className="text-xs">Type:</Label>
        <Select value={inputType} onValueChange={setInputType}>
          <SelectTrigger className="h-8 text-xs w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Text">Text</SelectItem>
            <SelectItem value="File">File</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </BaseNode>
  );
}
