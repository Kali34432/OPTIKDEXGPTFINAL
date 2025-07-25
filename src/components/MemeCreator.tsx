import { useState, useEffect } from 'react';
import { Rocket, Code, DollarSign, Shield, Zap, Upload, Sparkles, AlertTriangle, Globe, TrendingUp, Bot, Megaphone } from 'lucide-react';

export default function MemeCreator() {
  const [step, setStep] = useState(1);
  const [tokenData, setTokenData] = useState({
    name: '',
    symbol: '',
    description: '',
    totalSupply: '',
    decimals: '9',
    image: null,
  });

  // Add-on states
  const [includeWebsiteBuilder, setIncludeWebsiteBuilder] = useState(false);
  const [includeViralGPT, setIncludeViralGPT] = useState(false);
  const [includeSocialMediaPosts, setIncludeSocialMediaPosts] = useState(false);
  const [includeAdvancedLLM, setIncludeAdvancedLLM] = useState(false);
  const [includePromotionGPT, setIncludePromotionGPT] = useState(false);
  const [isUltimateBundleSelected, setIsUltimateBundleSelected] = useState(false);

  // Handle Ultimate Bundle selection
  useEffect(() => {
    if (isUltimateBundleSelected) {
      setIncludeWebsiteBuilder(true);
      setIncludeViralGPT(true);
      setIncludeSocialMediaPosts(true);
      setIncludeAdvancedLLM(true);
      setIncludePromotionGPT(true);
    }
  }, [isUltimateBundleSelected]);

  // Handle individual add-on deselection
  useEffect(() => {
    if (isUltimateBundleSelected && (!includeWebsiteBuilder || !includeViralGPT || !includeSocialMediaPosts || !includeAdvancedLLM || !includePromotionGPT)) {
      setIsUltimateBundleSelected(false);
    }
  }, [includeWebsiteBuilder, includeViralGPT, includeSocialMediaPosts, includeAdvancedLLM, includePromotionGPT, isUltimateBundleSelected]);

  // Calculate total cost
  const calculateTotalCost = () => {
    if (isUltimateBundleSelected) {
      return 799.99;
    }
    
    let total = 499.99; // Base price
    if (includeWebsiteBuilder) total += 99.99;
    if (includeViralGPT) total += 99.99;
    if (includeSocialMediaPosts) total += 99.99;
    if (includeAdvancedLLM) total += 99.99;
    if (includePromotionGPT) total += 99.99;
    
    return total;
  };

  const addOns = [
    {
      id: 'websiteBuilder',
      name: 'Optik Website Builder AI',
      description: 'AI-powered website creation for your meme coin project',
      price: 99.99,
      icon: Globe,
      state: includeWebsiteBuilder,
      setState: setIncludeWebsiteBuilder,
    },
    {
      id: 'viralGPT',
      name: 'Optik Viral GPT',
      description: 'Advanced viral marketing strategies and campaign planning',
      price: 99.99,
      icon: TrendingUp,
      state: includeViralGPT,
      setState: setIncludeViralGPT,
    },
    {
      id: 'socialMediaPosts',
      name: 'Viral Social Media Posts',
      description: 'AI-generated viral content for all major social platforms',
      price: 99.99,
      icon: Megaphone,
      state: includeSocialMediaPosts,
      setState: setIncludeSocialMediaPosts,
    },
    {
      id: 'advancedLLM',
      name: 'Optik GPT Advanced LLM',
      description: 'Predictive trading analysis and advanced market strategies',
      price: 99.99,
      icon: Bot,
      state: includeAdvancedLLM,
      setState: setIncludeAdvancedLLM,
    },
    {
      id: 'promotionGPT',
      name: 'Meme Coin Promotion GPT',
      description: 'Comprehensive promotion and community building tools',
      price: 99.99,
      icon: Sparkles,
      state: includePromotionGPT,
      setState: setIncludePromotionGPT,
    },
  ];

  const steps = [
    { id: 1, title: 'Token Details', icon: Sparkles },
    { id: 2, title: 'Smart Contract', icon: Code },
    { id: 3, title: 'Liquidity Pool', icon: DollarSign },
    { id: 4, title: 'Launch', icon: Rocket },
  ];

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Token Name</label>
                <input
                  type="text"
                  placeholder="e.g., DogeCoin Supreme"
                  value={tokenData.name}
                  onChange={(e) => setTokenData({...tokenData, name: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Token Symbol</label>
                <input
                  type="text"
                  placeholder="e.g., DOGES"
                  value={tokenData.symbol}
                  onChange={(e) => setTokenData({...tokenData, symbol: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                placeholder="Describe your meme coin's purpose and community..."
                value={tokenData.description}
                onChange={(e) => setTokenData({...tokenData, description: e.target.value})}
                rows={4}
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Total Supply</label>
                <input
                  type="text"
                  placeholder="1000000000"
                  value={tokenData.totalSupply}
                  onChange={(e) => setTokenData({...tokenData, totalSupply: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Decimals</label>
                <select
                  value={tokenData.decimals}
                  onChange={(e) => setTokenData({...tokenData, decimals: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                >
                  <option value="6">6</option>
                  <option value="9">9</option>
                  <option value="18">18</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Token Image</label>
              <div className="border-2 border-dashed border-gray-600/50 rounded-lg p-8 text-center hover:border-blue-500/50 transition-colors duration-200">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">Upload your token image</p>
                <p className="text-gray-500 text-sm">PNG, JPG up to 2MB</p>
                <input type="file" className="hidden" accept="image/*" />
                <button className="mt-4 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-2 rounded-lg transition-colors duration-200">
                  Choose File
                </button>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2 text-blue-400" />
                Smart Contract Configuration
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Mint Authority</p>
                    <p className="text-gray-400 text-sm">Control token minting after launch</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Freeze Authority</p>
                    <p className="text-gray-400 text-sm">Ability to freeze token accounts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Anti-Bot Protection</p>
                    <p className="text-gray-400 text-sm">Protect against malicious sniping bots</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-400 font-medium">Security Recommendations</p>
                  <p className="text-amber-300/80 text-sm mt-1">
                    We recommend enabling anti-bot protection and disabling mint authority after launch for maximum trust.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                Liquidity Pool Setup
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Initial SOL Liquidity</label>
                  <input
                    type="text"
                    placeholder="10.0"
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20"
                  />
                  <p className="text-gray-400 text-xs mt-1">Minimum 5 SOL required</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Token Allocation (%)</label>
                  <input
                    type="text"
                    placeholder="80"
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20"
                  />
                  <p className="text-gray-400 text-xs mt-1">% of total supply for liquidity</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h4 className="text-green-400 font-medium mb-2">OPTK Backing Benefits</h4>
                <ul className="text-green-300/80 text-sm space-y-1">
                  <li>• Additional liquidity backing from OPTK reserves</li>
                  <li>• Enhanced price stability during launch</li>
                  <li>• Protection against initial volatility</li>
                  <li>• Increased trading confidence</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Zap className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-400 font-medium">Launch Package Included</p>
                  <p className="text-blue-300/80 text-sm mt-1">
                    Your payment includes minimum liquidity funding and launch support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Rocket className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Ready to Launch!</h3>
              <p className="text-gray-400">Your meme coin is configured and ready for deployment</p>
            </div>

            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
              <h4 className="text-lg font-semibold text-white mb-4">Launch Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Token Name:</span>
                  <span className="text-white">{tokenData.name || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Symbol:</span>
                  <span className="text-white">{tokenData.symbol || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Supply:</span>
                  <span className="text-white">{tokenData.totalSupply || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Base Launch Cost:</span>
                  <span className="text-green-400 font-semibold">$499.99</span>
                </div>
              </div>
            </div>

            {/* Optional Add-ons Section */}
            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
              <h4 className="text-lg font-semibold text-white mb-4">Optional AI-Powered Add-ons</h4>
              
              {/* Ultimate Bundle Option */}
              <div className="mb-6 p-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="ultimateBundle"
                      checked={isUltimateBundleSelected}
                      onChange={(e) => setIsUltimateBundleSelected(e.target.checked)}
                      className="w-5 h-5 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <div>
                      <label htmlFor="ultimateBundle" className="text-lg font-semibold text-white cursor-pointer">
                        Ultimate Creator Bundle
                      </label>
                      <p className="text-purple-300 text-sm">Get all AI tools + monthly access</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-400">$799.99</p>
                    <p className="text-purple-300 text-sm">+ $99.99/month</p>
                  </div>
                </div>
              </div>

              {/* Individual Add-ons */}
              <div className="space-y-3">
                {addOns.map((addon) => {
                  const Icon = addon.icon;
                  return (
                    <div key={addon.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id={addon.id}
                          checked={addon.state}
                          onChange={(e) => addon.setState(e.target.checked)}
                          disabled={isUltimateBundleSelected}
                          className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 disabled:opacity-50"
                        />
                        <Icon className="w-5 h-5 text-blue-400" />
                        <div>
                          <label htmlFor={addon.id} className="text-white font-medium cursor-pointer">
                            {addon.name}
                          </label>
                          <p className="text-gray-400 text-sm">{addon.description}</p>
                        </div>
                      </div>
                      <span className="text-green-400 font-semibold">${addon.price}</span>
                    </div>
                  );
                })}
              </div>

              {/* Total Cost Display */}
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-white">Total Cost:</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-green-400">${calculateTotalCost().toFixed(2)}</span>
                    {isUltimateBundleSelected && (
                      <p className="text-green-300 text-sm">+ $99.99/month recurring</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-400 font-medium">Important Notice</p>
                  <p className="text-red-300/80 text-sm mt-1">
                    Once launched, certain token parameters cannot be changed. Please review all settings carefully.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((stepItem, index) => {
            const Icon = stepItem.icon;
            const isActive = step === stepItem.id;
            const isCompleted = step > stepItem.id;
            
            return (
              <div key={stepItem.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : isCompleted 
                    ? 'bg-green-600 border-green-600 text-white'
                    : 'border-gray-600 text-gray-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${isActive ? 'text-blue-400' : isCompleted ? 'text-green-400' : 'text-gray-400'}`}>
                    Step {stepItem.id}
                  </p>
                  <p className={`text-xs ${isActive ? 'text-white' : 'text-gray-500'}`}>
                    {stepItem.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${isCompleted ? 'bg-green-600' : 'bg-gray-600'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            {steps.find(s => s.id === step)?.title}
          </h2>
          <p className="text-gray-400">
            {step === 1 && "Configure your meme coin's basic properties"}
            {step === 2 && "Set up smart contract security features"}
            {step === 3 && "Configure liquidity pool and funding"}
            {step === 4 && "Review and launch your token with optional AI tools"}
          </p>
        </div>

        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-700/50">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-6 py-2 bg-gray-700/50 hover:bg-gray-600/50 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200"
          >
            Previous
          </button>
          
          {step < 4 ? (
            <button
              onClick={() => setStep(Math.min(4, step + 1))}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
            >
              Next Step
            </button>
          ) : (
            <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-green-500/25 flex items-center space-x-2">
              <Rocket className="w-5 h-5" />
              <span>Launch Token (${calculateTotalCost().toFixed(2)})</span>
            </button>
          )}
        </div>
      </div>

      {/* AI Assistant Sidebar */}
      <div className="mt-8 bg-purple-600/10 border border-purple-500/20 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">AI Meme Coin Assistant</h3>
            <p className="text-purple-300/80 text-sm">Get personalized advice for your token</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <button className="w-full text-left p-3 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg transition-colors duration-200">
            <p className="text-purple-300 font-medium text-sm">💡 Generate viral token name ideas</p>
          </button>
          <button className="w-full text-left p-3 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg transition-colors duration-200">
            <p className="text-purple-300 font-medium text-sm">🚀 Optimize tokenomics for growth</p>
          </button>
          <button className="w-full text-left p-3 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg transition-colors duration-200">
            <p className="text-purple-300 font-medium text-sm">🛡️ Security best practices</p>
          </button>
        </div>
      </div>
    </div>
  );
}