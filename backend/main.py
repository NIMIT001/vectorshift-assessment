from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
from collections import defaultdict, deque

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Temporarily allow all origins for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response models
class NodeData(BaseModel):
    id: str
    type: str
    position: Dict
    data: Optional[Dict] = None

class EdgeData(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None

class PipelineRequest(BaseModel):
    nodes: List[NodeData]
    edges: List[EdgeData]

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edge: int
    is_dag: bool

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse', response_model=PipelineResponse)
def parse_pipeline(pipeline: PipelineRequest):
    """
    Parse a pipeline and determine if it's a Directed Acyclic Graph (DAG).
    Uses Kahn's algorithm for topological sorting to detect cycles.
    """
    try:
        nodes = pipeline.nodes
        edges = pipeline.edges
        
        num_nodes = len(nodes)
        num_edge = len(edges)
        
        # Build adjacency list and in-degree count
        graph = defaultdict(list)
        in_degree = defaultdict(int)
        node_ids = set(node.id for node in nodes)
        
        # Initialize in-degree for all nodes
        for node in nodes:
            in_degree[node.id] = 0
        
        # Build graph from edges
        for edge in edges:
            source = edge.source
            target = edge.target
            
            # Only process edges between existing nodes
            if source in node_ids and target in node_ids:
                graph[source].append(target)
                in_degree[target] += 1
        
        # Kahn's algorithm for topological sort
        queue = deque()
        
        # Find all nodes with no incoming edges
        for node_id in node_ids:
            if in_degree[node_id] == 0:
                queue.append(node_id)
        
        processed_count = 0
        
        # Process nodes
        while queue:
            current = queue.popleft()
            processed_count += 1
            
            # Remove edges from current node
            for neighbor in graph[current]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)
        
        # If we processed all nodes, it's a DAG
        # If there are cycles, some nodes will have in_degree > 0
        is_dag = processed_count == num_nodes
        
        return PipelineResponse(
            num_nodes=num_nodes,
            num_edge=num_edge,
            is_dag=is_dag
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error parsing pipeline: {str(e)}")
