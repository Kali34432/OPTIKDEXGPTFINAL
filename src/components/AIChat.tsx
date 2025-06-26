// AIChat.tsx - GPT Assistant Charging 1 $OPTIK or 1 USDC
import { useState } from 'react';
import axios from 'axios';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: "Hi, I'm Optik GPT. Ask me anything!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input) return;
    setLoading(true);
    setMessages([...messages, { sender: 'user', text: input }]);

    try {
      const response = await axios.post(import.meta.env.VITE_GPT_API_URL, {
        prompt: input,
        chargeToken: 'OPTIK', // simulate charging 1 $OPTIK
      });

      const reply = response.data.reply;
      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    } catch {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Error processing request.' }]);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl">
      <h2 className="text-xl mb-4">Optik GPT Assistant (1 $OPTIK per message)</h2>
      <div className="h-60 overflow-y-scroll bg-black p-4 mb-4 rounded">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={msg.sender === 'user' ? 'text-blue-400' : 'text-green-400'}>
              {msg.sender === 'user' ? 'You' : 'GPT'}: {msg.text}
            </span>
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        className="w-full p-2 text-black rounded mb-2"
        placeholder="Ask a question..."
      />
      <button
        onClick={sendMessage}
        disabled={loading}
        className="bg-yellow-500 px-4 py-2 rounded text-black font-bold"
      >
        {loading ? 'Thinking...' : 'Send'}
      </button>
    </div>
  );
}