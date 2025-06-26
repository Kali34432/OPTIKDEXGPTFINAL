import React, { useState } from 'react';
import { 
  Crown, 
  Check, 
  X,
  Globe, 
  TrendingUp, 
  Megaphone, 
  Bot, 
  Sparkles,
  AlertTriangle,
  Star,
  Zap,
  Shield,
  CreditCard,
  Lock,
  CheckCircle,
  Loader,
  ArrowRight
} from 'lucide-react';

interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  monthlyPrice?: number;
  description: string;
  features: string[];
  limitations?: string[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  popular?: boolean;
  recommended?: boolean;
}

interface AddOn {
  id: string;
  name: string;
  price: number;
  monthlyPrice?: number;
  description: string;
  features: string[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  category: 'ai-tools' | 'bundle';
}

export default function SubscriptionPage() {
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const subscriptionTiers: SubscriptionTier[] = [
    {
      id: 'free',
      name: 'Free Tier',
      price: 0,
      description: 'Basic access to OptikCoinGPT platform',
      features: [
        'Limited AI chat (10 messages/day)',
        'Basic market analytics',
        'Token swap (with fees)',
        'Community access',
        'Basic portfolio tracking'
      ],
      limitations: [
        'No meme coin creation',
        'No advanced trading tools',
        'No priority support',
        'Limited chart features',
        'No AI add-ons'
      ],
      icon: Star,
      color: 'from-gray-600 to-gray-700',
      textColor: 'text-gray-400',
      bgColor: 'bg-gray-600/20',
      borderColor: 'border-gray-500/30'
    },
    {
      id: 'pro',
      name: 'Pro Creator',
      price: 49.99,
      description: 'Complete meme coin creation toolkit',
      features: [
        'Unlimited AI assistance',
        'Advanced trading analytics',
        'Meme coin creation tools',
        'Anti-bot protection',
        'Smart contract templates',
        'Priority customer support',
        'Advanced chart features',
        'Portfolio tracking',
        'Market alerts',
        'Community features'
      ],
      icon: Crown,
      color: 'from-blue-600 to-purple-600',
      textColor: 'text-blue-400',
      bgColor: 'bg-blue-600/20',
      borderColor: 'border-blue-500/30',
      popular: true
    },
    {
      id: 'ultimate',
      name: 'Ultimate Creator Bundle',
      price: 799.99,
      monthlyPrice: 99.99,
      description: 'Complete token launch with all AI tools',
      features: [
        'Everything in Pro Creator',
        'Token creation & deployment',
        'Minimum liquidity funding',
        'OPTK backing support',
        'All AI add-ons included',
        'Launch marketing boost',
        'Dedicated launch support',
        'Post-launch monitoring',
        'Ongoing monthly AI access',
        'VIP support channel',
        'Custom integrations',
        'Advanced analytics'
      ],
      icon: Zap,
      color: 'from-purple-600 to-pink-600',
      textColor: 'text-purple-400',
      bgColor: 'bg-purple-600/20',
      borderColor: 'border-purple-500/30',
      recommended: true
    }
  ];

  const addOns: AddOn[] = [
    {
      id: 'website-builder',
      name: 'Optik Website Builder AI',
      price: 99.99,
      description: 'AI-powered website creation suite',
      features: [
        'Custom meme coin project templates',
        'Responsive design generation',
        'SEO optimization',
        'Domain integration',
        'Analytics dashboard'
      ],
      icon: Globe,
      color: 'from-blue-600 to-cyan-600',
      textColor: 'text-blue-400',
      bgColor: 'bg-blue-600/20',
      borderColor: 'border-blue-500/30',
      category: 'ai-tools'
    },
    {
      id: 'viral-gpt',
      name: 'Optik Viral GPT',
      price: 99.99,
      description: 'Strategic viral marketing tools',
      features: [
        'Campaign planning assistance',
        'Viral content strategies',
        'Trend analysis',
        'Influencer outreach',
        'Growth hacking techniques'
      ],
      icon: TrendingUp,
      color: 'from-green-600 to-emerald-600',
      textColor: 'text-green-400',
      bgColor: 'bg-green-600/20',
      borderColor: 'border-green-500/30',
      category: 'ai-tools'
    },
    {
      id: 'social-media',
      name: 'Viral Social Media Posts',
      price: 99.99,
      description: 'AI content generator',
      features: [
        'Multi-platform optimization',
        'Automated posting schedules',
        'Hashtag optimization',
        'Engagement analytics',
        'Content calendar'
      ],
      icon: Megaphone,
      color: 'from-orange-600 to-red-600',
      textColor: 'text-orange-400',
      bgColor: 'bg-orange-600/20',
      borderColor: 'border-orange-500/30',
      category: 'ai-tools'
    },
    {
      id: 'advanced-llm',
      name: 'Optik GPT Advanced LLM',
      price: 99.99,
      description: 'Trading analysis tools',
      features: [
        'Market strategy predictions',
        'Risk assessment algorithms',
        'Portfolio optimization',
        'Technical analysis',
        'Real-time market insights'
      ],
      icon: Bot,
      color: 'from-indigo-600 to-purple-600',
      textColor: 'text-indigo-400',
      bgColor: 'bg-indigo-600/20',
      borderColor: 'border-indigo-500/30',
      category: 'ai-tools'
    },
    {
      id: 'promotion-gpt',
      name: 'Meme Coin Promotion GPT',
      price: 99.99,
      description: 'Community building toolkit',
      features: [
        'Promotional campaign manager',
        'Community engagement strategies',
        'Launch event planning',
        'PR and media outreach',
        'Reputation management'
      ],
      icon: Sparkles,
      color: 'from-pink-600 to-rose-600',
      textColor: 'text-pink-400',
      bgColor: 'bg-pink-600/20',
      borderColor: 'border-pink-500/30',
      category: 'ai-tools'
    }
  ];

  // Handle tier selection
  const handleTierSelect = (tierId: string) => {
    setSelectedTier(tierId);
    setErrors([]);
    
    // If Ultimate Bundle is selected, include all add-ons
    if (tierId === 'ultimate') {
      setSelectedAddOns(addOns.map(addon => addon.id));
    } else if (tierId === 'free') {
      setSelectedAddOns([]);
    }
  };

  // Handle add-on selection
  const handleAddOnToggle = (addOnId: string) => {
    if (selectedTier === 'ultimate') return; // Can't modify add-ons for ultimate bundle
    if (selectedTier === 'free') {
      setErrors(['Add-ons are not available with the Free tier. Please upgrade to Pro Creator or Ultimate Bundle.']);
      return;
    }

    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
    setErrors([]);
  };

  // Calculate total cost
  const calculateTotalCost = () => {
    const tier = subscriptionTiers.find(t => t.id === selectedTier);
    if (!tier) return 0;

    if (selectedTier === 'ultimate') {
      return tier.price; // Ultimate bundle includes all add-ons
    }

    let total = tier.price;
    selectedAddOns.forEach(addOnId => {
      const addOn = addOns.find(a => a.id === addOnId);
      if (addOn) total += addOn.price;
    });

    return total;
  };

  // Calculate monthly recurring
  const calculateMonthlyRecurring = () => {
    const tier = subscriptionTiers.find(t => t.id === selectedTier);
    if (!tier) return 0;

    if (selectedTier === 'ultimate') {
      return tier.monthlyPrice || 0;
    }

    if (selectedTier === 'pro') {
      return tier.price; // Pro is monthly
    }

    return 0;
  };

  // Validate selection
  const validateSelection = () => {
    const newErrors: string[] = [];

    if (!selectedTier) {
      newErrors.push('Please select a subscription tier');
    }

    if (selectedTier === 'pro' && selectedAddOns.length === 0) {
      // This is actually valid, but we can suggest add-ons
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // Handle subscription
  const handleSubscribe = async () => {
    if (!validateSelection()) return;

    setIsProcessing(true);
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowConfirmation(true);
    } catch {
      setErrors(['Failed to process subscription. Please try again.']);
    } finally {
      setIsProcessing(false);
      setIsLoading(false);
    }
  };

  // Get tier button text
  const getTierButtonText = (tier: SubscriptionTier) => {
    if (selectedTier === tier.id) return 'Selected';
    if (tier.id === 'free') return 'Current Plan';
    return 'Select Plan';
  };

  // Get tier button class
  const getTierButtonClass = (tier: SubscriptionTier) => {
    if (selectedTier === tier.id) {
      return `bg-gradient-to-r ${tier.color} text-white`;
    }
    if (tier.id === 'free') {
      return 'bg-gray-600/20 text-gray-400 cursor-not-allowed';
    }
    return `${tier.bgColor} ${tier.textColor} border ${tier.borderColor} hover:bg-opacity-30`;
  };

  if (showConfirmation) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="bg-green-600/20 p-4 rounded-full inline-flex mb-6">
          <CheckCircle className="w-12 h-12 text-green-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          Subscription <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Confirmed!</span>
        </h1>
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
          <div className="space-y-3 text-left">
            <div className="flex justify-between">
              <span className="text-gray-300">Plan:</span>
              <span className="text-white font-semibold">
                {subscriptionTiers.find(t => t.id === selectedTier)?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Total Cost:</span>
              <span className="text-green-400 font-bold">${calculateTotalCost().toFixed(2)}</span>
            </div>
            {calculateMonthlyRecurring() > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-300">Monthly Recurring:</span>
                <span className="text-blue-400 font-semibold">${calculateMonthlyRecurring().toFixed(2)}/month</span>
              </div>
            )}
          </div>
        </div>
        <p className="text-gray-400">
          You will receive a confirmation email shortly with your subscription details.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          Choose Your <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">OptikCoin</span> Plan
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          From free exploration to professional meme coin creation with AI-powered tools
        </p>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-red-400 font-medium mb-2">Please fix the following issues:</h3>
              <ul className="text-red-300/80 text-sm space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Tiers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {subscriptionTiers.map((tier) => {
          const Icon = tier.icon;
          const isSelected = selectedTier === tier.id;
          
          return (
            <div
              key={tier.id}
              className={`relative bg-gray-800/50 backdrop-blur-sm border rounded-xl p-8 transition-all duration-300 cursor-pointer ${
                isSelected
                  ? `${tier.borderColor} shadow-lg transform scale-105`
                  : tier.popular
                  ? 'border-blue-500/50 shadow-lg shadow-blue-500/20 hover:scale-105'
                  : tier.recommended
                  ? 'border-purple-500/50 shadow-lg shadow-purple-500/20 hover:scale-105'
                  : 'border-gray-700/50 hover:border-gray-600/50 hover:scale-105'
              }`}
              onClick={() => handleTierSelect(tier.id)}
              role="button"
              tabIndex={0}
              aria-label={`Select ${tier.name} plan`}
            >
              {/* Popular/Recommended Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              {tier.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>Recommended</span>
                  </div>
                </div>
              )}

              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4">
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${tier.color} flex items-center justify-center`}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`inline-flex p-3 rounded-lg mb-4 ${tier.bgColor}`}>
                  <Icon className={`w-8 h-8 ${tier.textColor}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">${tier.price.toFixed(2)}</span>
                  {tier.monthlyPrice && (
                    <div className="text-sm text-gray-400 mt-1">
                      + ${tier.monthlyPrice.toFixed(2)}/month
                    </div>
                  )}
                  {tier.id === 'pro' && (
                    <div className="text-sm text-gray-400 mt-1">/month</div>
                  )}
                  {tier.id === 'free' && (
                    <div className="text-sm text-gray-400 mt-1">forever</div>
                  )}
                </div>
                <p className="text-gray-400 text-sm">{tier.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="text-white font-medium mb-3">Features Included:</h4>
                  <ul className="space-y-2">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {tier.limitations && tier.limitations.length > 0 && (
                  <div>
                    <h4 className="text-gray-400 font-medium mb-3">Limitations:</h4>
                    <ul className="space-y-2">
                      {tier.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <X className="w-4 h-4 text-red-400 mr-3 flex-shrink-0" />
                          <span className="text-gray-400">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleTierSelect(tier.id);
                }}
                disabled={tier.id === 'free'}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${getTierButtonClass(tier)}`}
              >
                {getTierButtonText(tier)}
              </button>
            </div>
          );
        })}
      </div>

      {/* AI Add-ons Section */}
      {selectedTier && selectedTier !== 'free' && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">AI-Powered Add-ons</h2>
            {selectedTier === 'ultimate' && (
              <div className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
                All Included
              </div>
            )}
          </div>
          
          {selectedTier === 'ultimate' && (
            <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <p className="text-purple-300 text-sm">
                <strong>Ultimate Creator Bundle</strong> includes all AI add-ons below at no additional cost, plus ongoing monthly access to new features.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addOns.map((addOn) => {
              const Icon = addOn.icon;
              const isSelected = selectedAddOns.includes(addOn.id);
              const isDisabled = selectedTier === 'ultimate';
              
              return (
                <div
                  key={addOn.id}
                  className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? `${addOn.bgColor} ${addOn.borderColor}`
                      : isDisabled
                      ? 'bg-gray-700/20 border-gray-600/20 opacity-75'
                      : 'bg-gray-700/30 border-gray-600/30 hover:border-gray-500/50'
                  }`}
                  onClick={() => !isDisabled && handleAddOnToggle(addOn.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${isSelected ? 'Deselect' : 'Select'} ${addOn.name}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        disabled={isDisabled}
                        onChange={() => !isDisabled && handleAddOnToggle(addOn.id)}
                        className="mt-1 w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 disabled:opacity-50"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className={`bg-gradient-to-r ${addOn.color} p-3 rounded-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className={`text-xl font-bold ${addOn.textColor}`}>
                        ${addOn.price.toFixed(2)}
                      </p>
                      {isDisabled && (
                        <p className="text-green-400 text-sm">Included</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">{addOn.name}</h4>
                    <p className="text-gray-300 mb-3 text-sm">{addOn.description}</p>
                    <ul className="space-y-1">
                      {addOn.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-300 text-sm">
                          <Check className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                      {addOn.features.length > 3 && (
                        <li className="text-gray-400 text-sm">
                          +{addOn.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Cost Summary & Checkout */}
      {selectedTier && selectedTier !== 'free' && (
        <div className="bg-gradient-to-r from-green-600/10 to-blue-600/10 border border-green-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg">
                <span className="text-gray-300">Selected Plan:</span>
                <span className="text-white font-semibold">
                  {subscriptionTiers.find(t => t.id === selectedTier)?.name}
                </span>
              </div>
              
              {selectedAddOns.length > 0 && selectedTier !== 'ultimate' && (
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm">Selected Add-ons:</p>
                  {selectedAddOns.map(addOnId => {
                    const addOn = addOns.find(a => a.id === addOnId);
                    if (!addOn) return null;
                    
                    return (
                      <div key={addOnId} className="flex justify-between items-center p-3 bg-gray-700/20 rounded-lg">
                        <span className="text-gray-300">• {addOn.name}</span>
                        <span className="text-white">${addOn.price.toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>
              )}
              
              <div className="border-t border-gray-600/30 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xl font-bold text-white">
                    {selectedTier === 'ultimate' ? 'One-time Cost:' : 'Total Cost:'}
                  </span>
                  <span className="text-2xl font-bold text-green-400">
                    ${calculateTotalCost().toFixed(2)}
                  </span>
                </div>
                
                {calculateMonthlyRecurring() > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Monthly Recurring:</span>
                    <span className="text-blue-400 font-semibold">
                      ${calculateMonthlyRecurring().toFixed(2)}/month
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-700/30 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-400" />
                  Secure Payment
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center">
                    <Lock className="w-4 h-4 text-green-400 mr-2" />
                    256-bit SSL encryption
                  </li>
                  <li className="flex items-center">
                    <CreditCard className="w-4 h-4 text-blue-400 mr-2" />
                    Multiple payment methods
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    30-day money-back guarantee
                  </li>
                </ul>
              </div>

              <button
                onClick={handleSubscribe}
                disabled={isProcessing || !selectedTier || selectedTier === 'free'}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-green-500/25 flex items-center justify-center space-x-3"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-6 h-6 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-6 h-6" />
                    <span>Subscribe Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              {calculateMonthlyRecurring() > 0 && (
                <p className="text-gray-400 text-sm text-center">
                  You'll be charged ${calculateTotalCost().toFixed(2)} today, then ${calculateMonthlyRecurring().toFixed(2)} monthly
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Benefits Section */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Why Choose OptikCoin?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-600/20 p-4 rounded-lg inline-flex mb-4">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Advanced Security</h3>
            <p className="text-gray-400 text-sm">
              Military-grade encryption and AI-powered threat detection
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-600/20 p-4 rounded-lg inline-flex mb-4">
              <Bot className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">AI-Powered Tools</h3>
            <p className="text-gray-400 text-sm">
              Cutting-edge AI assistance for trading and token creation
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-600/20 p-4 rounded-lg inline-flex mb-4">
              <Zap className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Lightning Fast</h3>
            <p className="text-gray-400 text-sm">
              Optimized for speed with instant transactions and real-time data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}