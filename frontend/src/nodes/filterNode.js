// filterNode.js

import { useState } from 'react';
import { Filter } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { cn } from '../lib/utils';

export const FilterNode = ({ id, data }) => {
  const [filterCriteria, setFilterCriteria] = useState(data?.filterCriteria || '');
  const [filterType, setFilterType] = useState(data?.filterType || 'contains');

  return (
    <BaseNode
      id={id}
      title="Filter"
      icon={Filter}
      handles={[
        {
          type: 'target',
          id: `${id}-input`,
          label: 'Input'
        },
        {
          type: 'source',
          id: `${id}-output`,
          label: 'Filtered'
        }
      ]}
      width={280}
      height={180}
      className={cn("border-l-4 border-l-[#ec4899]")}
    >
      <div className="flex flex-col gap-1 min-w-0">
        <Label className="text-xs">Filter Type:</Label>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="h-8 text-xs w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="contains">Contains</SelectItem>
            <SelectItem value="startsWith">Starts With</SelectItem>
            <SelectItem value="endsWith">Ends With</SelectItem>
            <SelectItem value="equals">Equals</SelectItem>
            <SelectItem value="regex">Regex Match</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1 min-w-0">
        <Label className="text-xs">Criteria:</Label>
        <Input 
          type="text" 
          value={filterCriteria} 
          onChange={(e) => setFilterCriteria(e.target.value)}
          placeholder="filter value"
          className="h-8 text-xs w-full"
        />
      </div>
    </BaseNode>
  );
}

