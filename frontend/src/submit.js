// submit.js

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { Button } from './components/ui/button';
import { Loader2, CheckCircle2, XCircle, AlertTriangle, Minus, Link2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './components/ui/dialog';
import API_URL from './config';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Create an AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      const response = await fetch(`${API_URL}/pipelines/parse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nodes: nodes.map(node => ({
            id: node.id,
            type: node.type,
            position: node.position,
            data: node.data,
          })),
          edges: edges.map(edge => ({
            id: edge.id,
            source: edge.source,
            target: edge.target,
            sourceHandle: edge.sourceHandle,
            targetHandle: edge.targetHandle,
          })),
        }),
        signal: controller.signal, // Add abort signal for timeout
      });

      clearTimeout(timeoutId); // Clear timeout if request succeeds

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      setOpen(true);
    } catch (err) {
      console.error('Error submitting pipeline:', err);
      
      // Handle different error types
      if (err.name === 'AbortError') {
        setError('Request timed out after 15 seconds. The backend server may be slow or unreachable. Please try again.');
      } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        setError(`Cannot connect to backend server at ${API_URL}. Please check if the server is running and accessible.`);
      } else {
        setError(err.message || 'An error occurred while submitting the pipeline.');
      }
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // Check for disconnected nodes
  const hasDisconnectedNodes = () => {
    if (nodes.length === 0) return false;
    if (nodes.length === 1) return false; // Single node is always connected
    if (edges.length === 0) return true; // Multiple nodes with no edges are disconnected
    
    // Build an undirected graph to check connectivity
    const graph = new Map();
    nodes.forEach(node => {
      graph.set(node.id, []);
    });
    
    edges.forEach(edge => {
      if (graph.has(edge.source)) {
        graph.get(edge.source).push(edge.target);
      }
      if (graph.has(edge.target)) {
        graph.get(edge.target).push(edge.source);
      }
    });
    
    // BFS to find all connected nodes starting from first node
    const visited = new Set();
    const queue = [nodes[0].id];
    visited.add(nodes[0].id);
    
    while (queue.length > 0) {
      const current = queue.shift();
      const neighbors = graph.get(current) || [];
      neighbors.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }
    
    // If not all nodes are visited, there are disconnected nodes
    return visited.size < nodes.length;
  };

  const isPipelineValid = result ? result.is_dag && !hasDisconnectedNodes() : false;

  return (
    <>
      <div className="flex items-center justify-center p-6 bg-background border-t border-border">
        <Button 
          type="button" 
          onClick={handleSubmit}
          disabled={loading}
          className="px-6"
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-foreground">
              Pipeline Validation Results
            </DialogTitle>
          </DialogHeader>

          {error ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-destructive">
                <XCircle className="h-5 w-5" />
                <span className="font-medium">Error</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {error}
              </p>
              <p className="text-xs text-muted-foreground">
                Make sure the backend server is running on {API_URL}
              </p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              {/* Summary Statistics */}
              <div className="flex gap-8">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded bg-muted">
                    <Minus className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-foreground">{result.num_nodes}</div>
                    <div className="text-xs text-muted-foreground">Nodes</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded bg-muted">
                    <Link2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-foreground">{result.num_edge}</div>
                    <div className="text-xs text-muted-foreground">Edges</div>
                  </div>
                </div>
              </div>

              {/* Validation Checks */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">DAG Structure</span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                    result.is_dag 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-destructive/20 text-destructive border border-destructive/30'
                  }`}>
                    {result.is_dag ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Valid
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3.5 w-3.5" />
                        Invalid
                      </>
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Pipeline</span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                    isPipelineValid
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-destructive/20 text-destructive border border-destructive/30'
                  }`}>
                    {isPipelineValid ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Valid
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3.5 w-3.5" />
                        Invalid
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* Detailed Message */}
              {!isPipelineValid && (
                <div className="pt-3 border-t border-border">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground mb-1">Pipeline Validation</div>
                      <div className="text-xs text-muted-foreground">
                        {!result.is_dag 
                          ? 'Invalid pipeline: cycle detected in graph structure'
                          : hasDisconnectedNodes()
                          ? 'Invalid pipeline: disconnected nodes detected'
                          : 'Invalid pipeline: validation failed'}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
