// outputNode.js

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { cn } from '../lib/utils';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Output"
      icon={ArrowRight}
      handles={[
        {
          type: 'target',
          id: `${id}-value`,
          label: 'Value'
        }
      ]}
      width={270}
      height={170}
      className={cn("border-l-4 border-l-[#10b981]")}
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
        <Select value={outputType} onValueChange={setOutputType}>
          <SelectTrigger className="h-8 text-xs w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Text">Text</SelectItem>
            <SelectItem value="File">Image</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </BaseNode>
  );
}
