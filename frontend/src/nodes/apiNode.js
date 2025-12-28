// apiNode.js

import { useState } from 'react';
import { Globe } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { cn } from '../lib/utils';

export const APINode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || '');
  const [method, setMethod] = useState(data?.method || 'GET');
  const [headers, setHeaders] = useState(data?.headers || '');

  return (
    <BaseNode
      id={id}
      title="API Call"
      icon={Globe}
      handles={[
        {
          type: 'target',
          id: `${id}-input`,
          label: 'Request Data'
        },
        {
          type: 'source',
          id: `${id}-response`,
          label: 'Response'
        },
        {
          type: 'source',
          id: `${id}-error`,
          label: 'Error',
          style: { top: '67%' }
        }
      ]}
      width={350}
      height={240}
      className={cn("border-l-4 border-l-[#14b8a6]")}
    >
      <div className="flex flex-col gap-1 min-w-0 w-full">
        <Label className="text-xs">URL:</Label>
        <Input 
          type="text" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/endpoint"
          className="h-8 text-xs w-full max-w-full"
        />
      </div>
      <div className="flex flex-col gap-1 min-w-0 w-full">
        <Label className="text-xs">Method:</Label>
        <Select value={method} onValueChange={setMethod}>
          <SelectTrigger className="h-8 text-xs w-full max-w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="POST">POST</SelectItem>
            <SelectItem value="PUT">PUT</SelectItem>
            <SelectItem value="DELETE">DELETE</SelectItem>
            <SelectItem value="PATCH">PATCH</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1 min-w-0 w-full">
        <Label className="text-xs">Headers (JSON):</Label>
        <Input 
          type="text" 
          value={headers} 
          onChange={(e) => setHeaders(e.target.value)}
          placeholder='{"Content-Type": "application/json"}'
          className="h-8 text-xs w-full max-w-full"
        />
      </div>
    </BaseNode>
  );
}

