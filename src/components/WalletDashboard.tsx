import { 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Shield, 
  Eye, 
  EyeOff,
  RefreshCw,
  Send,
  Download,
  ArrowUpDown,
  Plus,
  Settings,
  History,
  CheckCircle,
  Copy,
  ExternalLink
} from 'lucide-react';
import { useState } from 'react';

interface WalletAsset {
  symbol: string;
  name: string;
  balance: number;
  value: number;
  change24h: number;
  icon: string;
  price: number;
}

interface WalletTransaction {
  id: string;
  type: 'send' | 'receive' | 'swap' | 'stake';
  amount: number;
  token: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
  hash: string;
  from?: string;
  to?: string;
}

export default function WalletDashboard() {
  const [showBalance, setShowBalance] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const walletAddress = "7xKXm9PqR8vN3jL2wE5tY6uH4sF1cG9bA8dK3mQ7nP5r";

  const assets: WalletAsset[] = [
    {
      symbol: 'OPTK',
      name: 'OptikCoin',
      balance: 1250.00,
      value: 30.63,
      change24h: 8.67,
      icon: '🚀',
      price: 0.0245
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      balance: 45.78,
      value: 4512.34,
      change24h: 5.23,
      icon: '◎',
      price: 98.45
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      balance: 2847.92,
      value: 2847.92,
      change24h: 0.01,
      icon: '💵',
      price: 1.00
    },
    {
      symbol: 'RAY',
      name: 'Raydium',
      balance: 156.43,
      value: 234.65,
      change24h: -2.45,
      icon: '⚡',
      price: 1.50
    }
  ];

  const transactions: WalletTransaction[] = [
    {
      id: '1',
      type: 'receive',
      amount: 100.00,
      token: 'OPTK',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: 'completed',
      hash: 'abc123...def456',
      from: '9mPq...7xKX'
    },
    {
      id: '2',
      type: 'send',
      amount: 25.50,
      token: 'SOL',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      status: 'completed',
      hash: 'def456...abc123',
      to: 'def2...abc1'
    },
    {
      id: '3',
      type: 'swap',
      amount: 500.00,
      token: 'USDC',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      status: 'completed',
      hash: 'ghi789...jkl012'
    },
    {
      id: '4',
      type: 'stake',
      amount: 200.00,
      token: 'OPTK',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
      status: 'pending',
      hash: 'jkl012...ghi789'
    }
  ];

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalChange24h = assets.reduce((sum, asset) => sum + (asset.value * asset.change24h / 100), 0);
  const totalChangePercent = (totalChange24h / totalValue) * 100;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'send': return <Send className="w-4 h-4 text-red-400" />;
      case 'receive': return <Download className="w-4 h-4 text-green-400" />;
      case 'swap': return <ArrowUpDown className="w-4 h-4 text-blue-400" />;
      case 'stake': return <Zap className="w-4 h-4 text-purple-400" />;
      default: return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-600/20';
      case 'pending': return 'text-yellow-400 bg-yellow-600/20';
      case 'failed': return 'text-red-400 bg-red-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            OPTIK <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">Wallet</span>
          </h1>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-green-400 text-sm">Connected</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400 text-sm">{formatAddress(walletAddress)}</span>
            <button
              onClick={() => copyToClipboard(walletAddress)}
              className="p-1 hover:bg-gray-700/50 rounded transition-all duration-200"
            >
              <Copy className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-200 disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 text-gray-400 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-200">
            <Settings className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Portfolio Overview</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span className="text-sm">{showBalance ? 'Hide' : 'Show'}</span>
            </button>
            
            <div className="flex bg-gray-700/50 rounded-lg p-1">
              {['24h', '7d', '30d', '1y'].map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`px-3 py-1 rounded text-sm transition-all duration-200 ${
                    selectedTimeframe === timeframe
                      ? 'bg-purple-600/20 text-purple-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Total Balance */}
          <div className="lg:col-span-2">
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm mb-2">Total Portfolio Value</p>
              <div className="flex items-center justify-center lg:justify-start space-x-4 mb-4">
                <span className="text-4xl font-bold text-white">
                  {showBalance ? `$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '••••••'}
                </span>
                <div className={`flex items-center space-x-1 ${totalChangePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {totalChangePercent >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                  <span className="font-medium">
                    {totalChangePercent >= 0 ? '+' : ''}${Math.abs(totalChange24h).toFixed(2)} ({Math.abs(totalChangePercent).toFixed(2)}%)
                  </span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                {selectedTimeframe} change • Last updated: {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
            <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2">
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
            <button className="w-full bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 py-3 rounded-lg font-medium transition-all duration-200 border border-purple-500/30 flex items-center justify-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Receive</span>
            </button>
            <button className="w-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 py-3 rounded-lg font-medium transition-all duration-200 border border-blue-500/30 flex items-center justify-center space-x-2">
              <ArrowUpDown className="w-4 h-4" />
              <span>Swap</span>
            </button>
            <button className="w-full bg-orange-600/20 hover:bg-orange-600/30 text-orange-400 py-3 rounded-lg font-medium transition-all duration-200 border border-orange-500/30 flex items-center justify-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Buy Crypto</span>
            </button>
          </div>
        </div>
      </div>

      {/* Assets */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Your Assets</h2>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm">{assets.length} tokens</span>
          </div>
        </div>

        <div className="space-y-4">
          {assets.map((asset, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-700/30 hover:bg-gray-700/50 rounded-lg transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-xl">
                  {asset.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{asset.symbol}</h3>
                  <p className="text-gray-400 text-sm">{asset.name}</p>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-white font-medium">
                  {showBalance ? asset.balance.toLocaleString() : '••••••'} {asset.symbol}
                </p>
                <p className="text-gray-400 text-sm">
                  ${asset.price.toFixed(asset.symbol === 'USDC' ? 2 : 4)}
                </p>
              </div>
              
              <div className="text-right">
                <p className="text-white font-semibold">
                  {showBalance ? `$${asset.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '••••••'}
                </p>
                <div className={`flex items-center justify-end space-x-1 ${asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {asset.change24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span className="text-sm">
                    {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Recent Activity</h2>
          <button className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors duration-200">
            <History className="w-4 h-4" />
            <span className="text-sm">View All</span>
          </button>
        </div>

        <div className="space-y-4">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-600/50 rounded-lg">
                  {getTransactionIcon(tx.type)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-white font-medium capitalize">{tx.type}</h3>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {tx.type === 'send' && tx.to && `To: ${formatAddress(tx.to)}`}
                    {tx.type === 'receive' && tx.from && `From: ${formatAddress(tx.from)}`}
                    {tx.type === 'swap' && 'Token Exchange'}
                    {tx.type === 'stake' && 'Staking Rewards'}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`font-semibold ${
                  tx.type === 'receive' ? 'text-green-400' : 
                  tx.type === 'send' ? 'text-red-400' : 'text-white'
                }`}>
                  {tx.type === 'receive' ? '+' : tx.type === 'send' ? '-' : ''}{tx.amount} {tx.token}
                </p>
                <div className="flex items-center justify-end space-x-2">
                  <span className="text-gray-400 text-sm">
                    {tx.timestamp.toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => window.open(`https://solscan.io/tx/${tx.hash}`, '_blank')}
                    className="p-1 hover:bg-gray-600/50 rounded transition-all duration-200"
                  >
                    <ExternalLink className="w-3 h-3 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Status */}
      <div className="bg-gradient-to-r from-green-600/10 to-blue-600/10 border border-green-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-green-400" />
            <div>
              <h3 className="text-green-400 font-semibold">Wallet Security Status</h3>
              <p className="text-green-300/80 text-sm">All security features are active and your wallet is protected</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <CheckCircle className="w-5 h-5 text-green-400 mx-auto mb-1" />
              <p className="text-green-400 text-xs">2FA Enabled</p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-5 h-5 text-green-400 mx-auto mb-1" />
              <p className="text-green-400 text-xs">Backup Verified</p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-5 h-5 text-green-400 mx-auto mb-1" />
              <p className="text-green-400 text-xs">Encrypted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}