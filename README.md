# NVIDIA DeepSeek AI Agent

An intelligent chat interface powered by NVIDIA AI, featuring real-time responses using the DeepSeek-R1 model.

## Features
- Real-time chat interface with streaming responses
- Powered by NVIDIA AI DeepSeek-R1 model
- Modern UI with NVIDIA branding (#76B900)
- WebSocket-based communication for instant responses
- Connection status monitoring
- Elegant loading states and animations
- Responsive design for all devices
- User and AI message distinction with icons

## Technology Stack
- Frontend: React + TypeScript with Tailwind CSS
- Backend: FastAPI with WebSocket support
- AI: NVIDIA AI Endpoints with DeepSeek-R1 model

## Development

### Prerequisites
- Node.js 18+
- Python 3.12+
- Poetry
- NVIDIA AI API key

### Installation
```bash
# Clone the repository
git clone https://github.com/leeakpareva/nvidia.redAi.git
cd nvidia.redAi

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
poetry install
```

### Environment Setup
1. Frontend Configuration
Create `.env` in the frontend directory:
```
VITE_BACKEND_URL=http://localhost:8000
```

2. Backend Configuration
Create `.env` in the backend directory (see `.env.example` for template):
```
NVIDIA_API_KEY=your-nvidia-api-key-here
```

### Running the Application
```bash
# Start the backend
cd backend
poetry run uvicorn app.main:app --reload

# In a new terminal, start the frontend
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

## Testing

### Frontend Testing
1. Verify chat functionality:
   - Test message sending and receiving
   - Check real-time streaming responses
   - Verify message history display

2. UI Components:
   - Ensure NVIDIA branding appears correctly
   - Verify loading animations
   - Check connection status indicator
   - Test responsive design on different screen sizes

3. WebSocket Connection:
   - Verify connection establishment
   - Test reconnection handling
   - Check error states

### Backend Testing
1. API Endpoints:
   - Test WebSocket endpoint
   - Verify NVIDIA AI integration
   - Check error handling

2. Performance:
   - Test concurrent connections
   - Verify message streaming performance

## Contributing
1. Create a new branch
2. Make your changes
3. Test locally
4. Submit a pull request

## License
Proprietary - All rights reserved
