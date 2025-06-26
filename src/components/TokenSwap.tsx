import { useState } from 'react';
import { ArrowUpDown, Settings, Zap, AlertCircle } from 'lucide-react';

export default function TokenSwap() {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromToken, setFromToken] = useState('SOL');
  const [toToken, setToToken] = useState('USDC');

  const tokens = [
    { symbol: 'SOL', name: 'Solana', balance: '12.45' },
    { symbol: 'USDC', name: 'USD Coin', balance: '1,250.00' },
    { symbol: 'ETH', name: 'Ethereum', balance: '0.85' },
    { symbol: 'BTC', name: 'Bitcoin', balance: '0.02' },
  ];

  const handleSwapTokens = () => {
    const tempToken = fromToken;
    const tempAmount = fromAmount;
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Swap Tokens</h2>
          <button className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-200">
            <Settings className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* From Token */}
        <div className="space-y-4">
          <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">From</span>
              <span className="text-gray-400 text-sm">
                Balance: {tokens.find(t => t.symbol === fromToken)?.balance}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="0.0"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                className="flex-1 bg-transparent text-2xl font-semibold text-white placeholder-gray-500 focus:outline-none"
              />
              <select
                value={fromToken}
                onChange={(e) => setFromToken(e.target.value)}
                className="bg-gray-600/50 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                {tokens.map((token) => (
                  <option key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSwapTokens}
              className="p-2 bg-gray-700/50 hover:bg-blue-600/20 border border-gray-600/50 hover:border-blue-500/50 rounded-lg transition-all duration-200 group"
            >
              <ArrowUpDown className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
            </button>
          </div>

          {/* To Token */}
          <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">To</span>
              <span className="text-gray-400 text-sm">
                Balance: {tokens.find(t => t.symbol === toToken)?.balance}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="0.0"
                value={toAmount}
                onChange={(e) => setToAmount(e.target.value)}
                className="flex-1 bg-transparent text-2xl font-semibold text-white placeholder-gray-500 focus:outline-none"
              />
              <select
                value={toToken}
                onChange={(e) => setToToken(e.target.value)}
                className="bg-gray-600/50 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                {tokens.map((token) => (
                  <option key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Swap Details */}
        <div className="mt-6 p-4 bg-gray-700/20 rounded-lg border border-gray-600/20">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Rate</span>
              <span>1 {fromToken} = 98.45 {toToken}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Network Fee</span>
              <span>~0.001 SOL</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Price Impact</span>
              <span className="text-green-400">&lt; 0.1%</span>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-400 text-sm font-medium">High Slippage Warning</p>
            <p className="text-amber-300/80 text-xs mt-1">
              This trade may have higher than expected slippage due to market conditions.
            </p>
          </div>
        </div>

        {/* Swap Button */}
        <button className="w-full mt-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-green-500/25">
          <Zap className="w-5 h-5" />
          <span>Swap Tokens</span>
        </button>

        {/* Quick Actions */}
        <div className="mt-4 flex space-x-2">
          {['25%', '50%', '75%', 'MAX'].map((percentage) => (
            <button
              key={percentage}
              className="flex-1 py-2 text-sm bg-gray-700/30 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-all duration-200 border border-gray-600/20 hover:border-gray-500/50"
            >
              {percentage}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}