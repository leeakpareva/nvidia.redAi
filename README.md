# NVIDIA DeepSeek AI Agent

An intelligent chat interface powered by NVIDIA AI, featuring real-time responses using the DeepSeek-R1 model.

## Features
- Real-time chat interface with streaming responses
- Powered by NVIDIA AI DeepSeek-R1 model
- Modern UI with NVIDIA branding (#76B900)
- WebSocket-based communication for instant responses

## Technology Stack
- Frontend: React + TypeScript with Tailwind CSS
- Backend: FastAPI with WebSocket support
- AI: NVIDIA AI Endpoints with DeepSeek-R1 model

## Development
```bash
# Install dependencies
cd frontend && npm install
cd ../backend && poetry install

# Run frontend
cd frontend && npm run dev

# Run backend
cd backend && poetry run uvicorn app.main:app --reload
```

## Testing
Before submitting changes:
1. Verify chat functionality works
2. Test WebSocket connection
3. Check UI responsiveness
4. Ensure NVIDIA branding appears correctly

## Contributing
1. Create a new branch
2. Make your changes
3. Test locally
4. Submit a pull request

## License
Proprietary - All rights reserved
