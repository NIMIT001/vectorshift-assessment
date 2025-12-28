# VectorShift Frontend Technical Assessment

Youtube Link - https://www.youtube.com/watch?v=0LEM4Faj5OA

A React-based visual pipeline builder application built with ReactFlow, allowing users to create and validate data processing pipelines through an intuitive drag-and-drop interface.

## 🚀 Features

- **Node-Based Pipeline Builder**: Drag and drop nodes to create complex data pipelines
- **Node Types**: Input, Output, Text, LLM, Conditional, Transform, Merge, Filter, and API nodes
- **Visual Connections**: Connect nodes with animated edges
- **Pipeline Validation**: Validate pipeline structure and detect cycles (DAG detection)
- **Theme Support**: Light and dark mode with smooth transitions
- **Delete Functionality**: Remove nodes and edges with a single click
- **Responsive Design**: Built with Tailwind CSS and shadcn/ui components

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **ReactFlow** - Node-based editor
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

### Backend
- **FastAPI** - Python web framework
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

## 📁 Project Structure

```
vecShift/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── nodes/     # Node components (Input, Output, Text, etc.)
│   │   ├── edges/     # Custom edge components
│   │   ├── components/ # UI components (ThemeToggle, Dialog, etc.)
│   │   ├── contexts/  # React contexts (ThemeContext)
│   │   ├── lib/       # Utility functions
│   │   ├── App.js     # Main application component
│   │   ├── ui.js      # ReactFlow canvas component
│   │   ├── store.js   # Zustand store
│   │   └── submit.js  # Pipeline submission logic
│   └── package.json
│
└── backend/           # FastAPI backend
    ├── main.py        # API endpoints
    └── requirements.txt
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Python** (v3.8 or higher)
- **pip**

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, for local development):
```env
REACT_APP_API_URL=http://localhost:8000
```

4. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## 📝 Usage

1. **Add Nodes**: Drag nodes from the toolbar at the top and drop them onto the canvas
2. **Connect Nodes**: Click and drag from a node's output handle to another node's input handle
3. **Configure Nodes**: Click on nodes to configure their properties (text, URLs, etc.)
4. **Delete Nodes/Edges**: Click the X button on nodes or the delete button on edges
5. **Submit Pipeline**: Click the "Submit" button to validate your pipeline structure

## 🌐 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure build settings:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. Add environment variable:
   - `REACT_APP_API_URL`: Your backend URL
5. Deploy!

### Backend (Render)

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Configure:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Deploy!

## 🔧 Environment Variables

### Frontend
- `REACT_APP_API_URL`: Backend API URL (default: `http://localhost:8000`)

### Backend
No environment variables required for basic setup.

## 📡 API Endpoints

### `GET /`
Health check endpoint
- **Response**: `{"Ping": "Pong"}`

### `POST /pipelines/parse`
Validate and parse a pipeline
- **Request Body**:
  ```json
  {
    "nodes": [
      {
        "id": "string",
        "type": "string",
        "position": {"x": number, "y": number},
        "data": {}
      }
    ],
    "edges": [
      {
        "id": "string",
        "source": "string",
        "target": "string",
        "sourceHandle": "string",
        "targetHandle": "string"
      }
    ]
  }
  ```
- **Response**:
  ```json
  {
    "num_nodes": 0,
    "num_edge": 0,
    "is_dag": true
  }
  ```

## 🎨 Node Types

- **Input**: Data input node with configurable name and type
- **Output**: Data output node with configurable name and type
- **Text**: Text processing node with variable support (`{{variableName}}`)
- **LLM**: Large Language Model node
- **Conditional**: Conditional logic node
- **Transform**: Data transformation node
- **Merge**: Merge multiple inputs
- **Filter**: Filter data based on conditions
- **API**: API call node with URL, method, and headers configuration

## 🤝 Contributing

This is an assessment project. Contributions are welcome for learning purposes!

## 📄 License

This project is created for assessment purposes.

## 🔗 Live Demo

- **Frontend**: [Vercel Deployment](https://vectorshift-frontend-chi.vercel.app)
- **Backend**: [Render Deployment](https://vectorshift-assessment-vcbg.onrender.com)

---

Built with ❤️ for VectorShift

