// draggableNode.js

import { 
  ArrowRight, 
  MessageCircle, 
  FileText, 
  GitBranch, 
  Wand2, 
  Layers, 
  Filter, 
  Globe 
} from 'lucide-react';

const nodeIcons = {
  customInput: ArrowRight,
  llm: MessageCircle,
  customOutput: ArrowRight,
  text: FileText,
  conditional: GitBranch,
  transform: Wand2,
  merge: Layers,
  filter: Filter,
  api: Globe,
};

export const DraggableNode = ({ type, label }) => {
    const Icon = nodeIcons[type];
    
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className="cursor-grab active:cursor-grabbing min-w-[80px] h-[60px] flex items-center justify-center flex-col gap-1 rounded-lg bg-secondary border border-border text-secondary-foreground hover:bg-accent hover:border-primary/50 transition-all"
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
      >
        {Icon && <Icon className="h-5 w-5 text-foreground" strokeWidth={2} />}
        <span className="text-xs font-medium">{label}</span>
      </div>
    );
  };
  