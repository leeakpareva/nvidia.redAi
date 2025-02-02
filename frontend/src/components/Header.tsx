import { Bot } from 'lucide-react';

export const Header = () => (
  <div className="bg-[#76B900] text-white p-4">
    <div className="container mx-auto flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Bot className="h-6 w-6" />
        <h1 className="text-2xl font-bold">NVIDIA DeepSeek AI Agent</h1>
      </div>
      <span className="text-sm">Powered by NVIDIA AI</span>
    </div>
  </div>
);
