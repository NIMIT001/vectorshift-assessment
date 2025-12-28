// textNode.js

import { useState, useEffect, useRef, useCallback } from 'react';
import { FileText } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { Label } from '../components/ui/label';
import { cn } from '../lib/utils';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [nodeWidth, setNodeWidth] = useState(200);
  const [nodeHeight, setNodeHeight] = useState(80);
  const textAreaRef = useRef(null);
  const contentRef = useRef(null);

  // Parse variables from text using {{variableName}} pattern
  const parseVariables = useCallback((text) => {
    const variablePattern = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
    const matches = [...text.matchAll(variablePattern)];
    const uniqueVariables = [...new Set(matches.map(match => match[1]))];
    return uniqueVariables;
  }, []);

  const [variables, setVariables] = useState(() => parseVariables(currText));

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    const newVariables = parseVariables(newText);
    setVariables(newVariables);
  };

  // Dynamic sizing based on content
  useEffect(() => {
    if (textAreaRef.current && contentRef.current) {
      // Reset height to get accurate scrollHeight
      textAreaRef.current.style.height = 'auto';
      const scrollHeight = textAreaRef.current.scrollHeight;
      
      // Calculate node dimensions
      const minWidth = 270;
      const minHeight = 120;
      const baseHeight = 80; // Header + padding + gaps
      const textHeight = Math.max(scrollHeight, 40);
      const variableHandlesHeight = variables.length * 20; // Space for variable handles
      
      // Keep width fixed at minimum to prevent textarea overflow
      const newWidth = minWidth;
      const newHeight = Math.max(minHeight, baseHeight + textHeight + variableHandlesHeight);
      
      setNodeWidth(newWidth);
      setNodeHeight(newHeight);
      
      // Set textarea height to match content
      textAreaRef.current.style.height = `${textHeight}px`;
    }
  }, [currText, variables.length]);

  // Generate handles for each variable
  const variableHandles = variables.map((variable, index) => ({
    type: 'target',
    id: `${id}-${variable}`,
    label: variable,
    style: { 
      top: `${((index + 1) * 100) / (variables.length + 1)}%` 
    }
  }));

  return (
    <BaseNode
      id={id}
      title="Text"
      icon={FileText}
      handles={[
        ...variableHandles,
        {
          type: 'source',
          id: `${id}-output`,
          label: 'Output'
        }
      ]}
      width={nodeWidth}
      height={nodeHeight}
      className={cn("border-l-4 border-l-[#f59e0b]")}
    >
      <div ref={contentRef} className="flex flex-col gap-1 min-w-0 w-full overflow-hidden">
        <Label className="text-xs font-medium">
          Text:
        </Label>
        <textarea
          ref={textAreaRef}
          value={currText}
          onChange={handleTextChange}
          placeholder="Enter text with {{variableName}} for variables"
          className={cn(
            "flex min-h-[40px] w-full rounded-md border border-input bg-background px-3 py-2 text-xs",
            "ring-offset-background placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "resize-none overflow-y-auto overflow-x-hidden box-border"
          )}
          style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box', wordWrap: 'break-word' }}
        />
        {variables.length > 0 && (
          <div className="text-[10px] text-muted-foreground mt-1">
            Variables: {variables.join(', ')}
          </div>
        )}
      </div>
    </BaseNode>
  );
}
