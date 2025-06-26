import React, { useState } from 'react';
import { 
  Wallet, 
  Shield, 
  Download, 
  ExternalLink, 
  CheckCircle, 
  AlertTriangle,
  Smartphone,
  Monitor,
  Globe,
  Lock,
  Eye,
  RefreshCw
} from 'lucide-react';
import OptikWallet from './OptikWallet';

interface WalletOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'available' | 'coming-soon' | 'installed';
  downloadUrl?: string;
  features: string[];
}

export default function WalletIntegration() {
  const [showOptikWallet, setShowOptikWallet] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const walletOptions: WalletOption[] = [
    {
      id: 'optik',
      name: 'OPTIK Wallet',
      description: 'Native wallet with advanced AI features and seamless integration',
      icon: <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">O</div>,
      status: 'available',
      features: [
        'AI-powered security',
        'Built-in DEX integration',
        'Advanced portfolio tracking',
        'Cross-chain support',
        'Staking & rewards',
        'NFT management'
      ]
    },
    {
      id: 'phantom',
      name: 'Phantom',
      description: 'Popular Solana wallet with great user experience',
      icon: <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white">👻</div>,
      status: 'available',
      downloadUrl: 'https://phantom.app',
      features: [
        'Solana native',
        'Mobile & desktop',
        'NFT support',
        'DApp integration',
        'Hardware wallet support'
      ]
    },
    {
      id: 'solflare',
      name: 'Solflare',
      description: 'Comprehensive Solana wallet with advanced features',
      icon: <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white">🔥</div>,
      status: 'available',
      downloadUrl: 'https://solflare.com',
      features: [
        'Multi-platform',
        'Ledger support',
        'Staking built-in',
        'Token management',
        'DeFi integration'
      ]
    },
    {
      id: 'metamask',
      name: 'MetaMask',
      description: 'Popular Ethereum wallet with Solana support coming soon',
      icon: <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg flex items-center justify-center text-white">🦊</div>,
      status: 'coming-soon',
      features: [
        'Multi-chain support',
        'Browser extension',
        'Mobile app',
        'DApp browser',
        'Hardware wallet support'
      ]
    }
  ];

  const handleWalletConnect = async (walletId: string) => {
    if (walletId === 'optik') {
      setShowOptikWallet(true);
      return;
    }

    setIsConnecting(true);
    setSelectedWallet(walletId);

    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      alert(`Connected to ${walletOptions.find(w => w.id === walletId)?.name}!`);
    }, 2000);
  };

  const handleDownloadWallet = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="bg-purple-600/20 p-4 rounded-full inline-flex mb-6">
          <Wallet className="w-12 h-12 text-purple-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          Connect Your <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">Wallet</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Choose from our supported wallets to start trading, staking, and managing your crypto assets
        </p>
      </div>

      {/* Featured OPTIK Wallet */}
      <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
              O
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">OPTIK Wallet</h2>
              <p className="text-purple-300">The ultimate wallet for the OptikCoin ecosystem</p>
            </div>
          </div>
          <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
            Recommended
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-white font-semibold mb-3">Key Features</h3>
            <ul className="space-y-2">
              {walletOptions[0].features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-3">Security Features</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300 text-sm">
                <Shield className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
                Military-grade encryption
              </li>
              <li className="flex items-center text-gray-300 text-sm">
                <Lock className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
                Biometric authentication
              </li>
              <li className="flex items-center text-gray-300 text-sm">
                <Eye className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
                Transaction monitoring
              </li>
              <li className="flex items-center text-gray-300 text-sm">
                <RefreshCw className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
                Auto-backup & recovery
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => handleWalletConnect('optik')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
          >
            <Wallet className="w-5 h-5" />
            <span>Open OPTIK Wallet</span>
          </button>
          
          <button
            onClick={() => handleDownloadWallet('https://wallet.optikcoin.com')}
            className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 px-6 py-3 rounded-lg font-semibold transition-all duration-200 border border-purple-500/30 flex items-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>Download App</span>
          </button>
        </div>
      </div>

      {/* Other Wallet Options */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Other Supported Wallets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {walletOptions.slice(1).map((wallet) => (
            <div
              key={wallet.id}
              className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300"
            >
              <div className="flex items-center space-x-3 mb-4">
                {wallet.icon}
                <div>
                  <h3 className="text-lg font-semibold text-white">{wallet.name}</h3>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    wallet.status === 'available' 
                      ? 'bg-green-600/20 text-green-400' 
                      : 'bg-yellow-600/20 text-yellow-400'
                  }`}>
                    {wallet.status === 'available' ? 'Available' : 'Coming Soon'}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mb-4">{wallet.description}</p>
              
              <div className="space-y-2 mb-6">
                {wallet.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-300 text-sm">
                    <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                {wallet.status === 'available' && (
                  <button
                    onClick={() => handleWalletConnect(wallet.id)}
                    disabled={isConnecting && selectedWallet === wallet.id}
                    className="w-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 py-2 rounded-lg font-medium transition-all duration-200 border border-blue-500/30 disabled:opacity-50"
                  >
                    {isConnecting && selectedWallet === wallet.id ? 'Connecting...' : 'Connect'}
                  </button>
                )}
                
                {wallet.downloadUrl && (
                  <button
                    onClick={() => handleDownloadWallet(wallet.downloadUrl!)}
                    className="w-full bg-gray-600/20 hover:bg-gray-600/30 text-gray-400 py-2 rounded-lg font-medium transition-all duration-200 border border-gray-500/30 flex items-center justify-center space-x-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                )}
                
                {wallet.status === 'coming-soon' && (
                  <button
                    disabled
                    className="w-full bg-gray-600/20 text-gray-500 py-2 rounded-lg font-medium border border-gray-500/30 cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Compatibility */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Platform Compatibility</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-600/20 p-4 rounded-lg inline-flex mb-4">
              <Monitor className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Desktop</h3>
            <p className="text-gray-400 text-sm">
              Browser extensions and desktop applications for Windows, macOS, and Linux
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-600/20 p-4 rounded-lg inline-flex mb-4">
              <Smartphone className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Mobile</h3>
            <p className="text-gray-400 text-sm">
              Native iOS and Android apps with full feature parity and biometric security
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-600/20 p-4 rounded-lg inline-flex mb-4">
              <Globe className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Web</h3>
            <p className="text-gray-400 text-sm">
              Direct browser access with no downloads required for quick transactions
            </p>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-amber-400 font-semibold mb-2">Security Best Practices</h3>
            <ul className="text-amber-300/80 text-sm space-y-1">
              <li>• Never share your seed phrase or private keys with anyone</li>
              <li>• Always verify wallet addresses before sending transactions</li>
              <li>• Use hardware wallets for large amounts</li>
              <li>• Keep your wallet software updated</li>
              <li>• Enable all available security features (2FA, biometrics, etc.)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* OPTIK Wallet Component */}
      {showOptikWallet && <OptikWallet />}
    </div>
  );
}