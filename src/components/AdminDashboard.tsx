import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Users, 
  DollarSign, 
  Settings, 
  BarChart3, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  RefreshCw,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Zap,
  Crown,
  Ban,
  Unlock,
  Lock,
  Mail,
  Bell,
  Database,
  Server,
  Activity,
  FileText,
  CreditCard,
  Coins
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  // Mock admin data
  const [adminStats, setAdminStats] = useState({
    totalUsers: 15847,
    activeUsers: 8923,
    totalRevenue: 245678.90,
    monthlyRevenue: 45678.90,
    totalTokensCreated: 1247,
    activeSubscriptions: 892,
    pendingApprovals: 23,
    systemHealth: 98.5,
    apiCalls: 1234567,
    storageUsed: 78.5
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      email: 'user1@example.com',
      wallet: '7xKX...9mPq',
      subscription: 'Pro Creator',
      tokensCreated: 5,
      revenue: 249.95,
      status: 'active',
      joinDate: '2025-01-10',
      lastActive: '2025-01-15 14:30'
    },
    {
      id: 2,
      email: 'user2@example.com',
      wallet: '9mPq...7xKX',
      subscription: 'Ultimate Bundle',
      tokensCreated: 12,
      revenue: 1599.88,
      status: 'active',
      joinDate: '2025-01-08',
      lastActive: '2025-01-15 12:15'
    },
    {
      id: 3,
      email: 'user3@example.com',
      wallet: 'abc1...def2',
      subscription: 'Free',
      tokensCreated: 0,
      revenue: 0,
      status: 'suspended',
      joinDate: '2025-01-12',
      lastActive: '2025-01-14 09:45'
    }
  ]);

  const [tokens, setTokens] = useState([
    {
      id: 1,
      name: 'DogeMoon',
      symbol: 'DMOON',
      creator: 'user1@example.com',
      marketCap: 125000,
      holders: 1247,
      status: 'active',
      createdDate: '2025-01-14',
      flagged: false
    },
    {
      id: 2,
      name: 'CatCoin Supreme',
      symbol: 'CATS',
      creator: 'user2@example.com',
      marketCap: 89000,
      holders: 892,
      status: 'pending',
      createdDate: '2025-01-15',
      flagged: true
    }
  ]);

  const [systemLogs, setSystemLogs] = useState([
    {
      id: 1,
      type: 'info',
      message: 'New user registration: user3@example.com',
      timestamp: '2025-01-15 14:30:25',
      component: 'Auth Service'
    },
    {
      id: 2,
      type: 'warning',
      message: 'High API usage detected for user2@example.com',
      timestamp: '2025-01-15 14:25:10',
      component: 'Rate Limiter'
    },
    {
      id: 3,
      type: 'error',
      message: 'Failed token deployment for token ID: 123',
      timestamp: '2025-01-15 14:20:05',
      component: 'Token Factory'
    }
  ]);

  const adminTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'tokens', label: 'Tokens', icon: Coins },
    { id: 'revenue', label: 'Revenue', icon: DollarSign },
    { id: 'system', label: 'System', icon: Server },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleUserAction = (userId: number, action: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: action === 'suspend' ? 'suspended' : 'active' }
        : user
    ));
    alert(`User ${action}ed successfully`);
  };

  const handleTokenAction = (tokenId: number, action: string) => {
    setTokens(prev => prev.map(token => 
      token.id === tokenId 
        ? { ...token, status: action, flagged: action === 'flag' ? true : false }
        : token
    ));
    alert(`Token ${action}ed successfully`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-600/20';
      case 'suspended': return 'text-red-400 bg-red-600/20';
      case 'pending': return 'text-yellow-400 bg-yellow-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  const getLogTypeColor = (type: string) => {
    switch (type) {
      case 'info': return 'text-blue-400 bg-blue-600/20';
      case 'warning': return 'text-yellow-400 bg-yellow-600/20';
      case 'error': return 'text-red-400 bg-red-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-red-600/10 to-orange-600/10 border border-red-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-red-600/20 p-3 rounded-lg">
              <Shield className="w-8 h-8 text-red-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400">OptikDexGPT Platform Administration</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-red-400 font-medium">Administrator</p>
              <p className="text-gray-400 text-sm">Full Access</p>
            </div>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-2">
        <div className="flex space-x-1 overflow-x-auto">
          {adminTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-red-600/20 text-red-400 border border-red-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Total Users</p>
                  <p className="text-2xl font-bold text-white">{adminStats.totalUsers.toLocaleString()}</p>
                  <p className="text-green-400 text-sm">+12.5% this month</p>
                </div>
                <div className="bg-blue-600/20 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-white">${adminStats.monthlyRevenue.toLocaleString()}</p>
                  <p className="text-green-400 text-sm">+8.3% vs last month</p>
                </div>
                <div className="bg-green-600/20 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Tokens Created</p>
                  <p className="text-2xl font-bold text-white">{adminStats.totalTokensCreated.toLocaleString()}</p>
                  <p className="text-green-400 text-sm">+156 this week</p>
                </div>
                <div className="bg-purple-600/20 p-3 rounded-lg">
                  <Coins className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">System Health</p>
                  <p className="text-2xl font-bold text-white">{adminStats.systemHealth}%</p>
                  <p className="text-green-400 text-sm">All systems operational</p>
                </div>
                <div className="bg-green-600/20 p-3 rounded-lg">
                  <Activity className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Recent System Activity</h2>
            <div className="space-y-3">
              {systemLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getLogTypeColor(log.type)}`}>
                      {log.type.toUpperCase()}
                    </div>
                    <span className="text-white">{log.message}</span>
                  </div>
                  <div className="text-right text-sm text-gray-400">
                    <p>{log.timestamp}</p>
                    <p>{log.component}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-xl p-6 text-left transition-all duration-200">
              <Bell className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Send Announcement</h3>
              <p className="text-gray-400 text-sm">Broadcast message to all users</p>
            </button>

            <button className="bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 rounded-xl p-6 text-left transition-all duration-200">
              <Download className="w-8 h-8 text-green-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Export Data</h3>
              <p className="text-gray-400 text-sm">Download platform analytics</p>
            </button>

            <button className="bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-xl p-6 text-left transition-all duration-200">
              <Settings className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">System Settings</h3>
              <p className="text-gray-400 text-sm">Configure platform parameters</p>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* User Management Header */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">User Management</h2>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                  />
                </div>
                <button className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-2 rounded-lg border border-blue-500/30">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-700/30 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Total Users</p>
                <p className="text-xl font-bold text-white">{adminStats.totalUsers.toLocaleString()}</p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Active Users</p>
                <p className="text-xl font-bold text-green-400">{adminStats.activeUsers.toLocaleString()}</p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Paid Subscribers</p>
                <p className="text-xl font-bold text-blue-400">{adminStats.activeSubscriptions.toLocaleString()}</p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Pending Reviews</p>
                <p className="text-xl font-bold text-yellow-400">{adminStats.pendingApprovals}</p>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/30">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-300 font-medium">User</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-medium">Subscription</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-medium">Tokens Created</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-medium">Revenue</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-medium">Status</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-t border-gray-700/30 hover:bg-gray-700/20">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-white font-medium">{user.email}</p>
                          <p className="text-gray-400 text-sm">{user.wallet}</p>
                          <p className="text-gray-500 text-xs">Joined: {user.joinDate}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.subscription === 'Ultimate Bundle' ? 'bg-purple-600/20 text-purple-400' :
                          user.subscription === 'Pro Creator' ? 'bg-blue-600/20 text-blue-400' :
                          'bg-gray-600/20 text-gray-400'
                        }`}>
                          {user.subscription}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white">{user.tokensCreated}</td>
                      <td className="px-6 py-4 text-green-400 font-medium">${user.revenue.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleUserAction(user.id, user.status === 'active' ? 'suspend' : 'activate')}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                              user.status === 'active' 
                                ? 'bg-red-600/20 hover:bg-red-600/30 text-red-400' 
                                : 'bg-green-600/20 hover:bg-green-600/30 text-green-400'
                            }`}
                          >
                            {user.status === 'active' ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                          </button>
                          <button className="p-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-all duration-200">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-gray-600/20 hover:bg-gray-600/30 text-gray-400 rounded-lg transition-all duration-200">
                            <Mail className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tokens' && (
        <div className="space-y-6">
          {/* Token Management Header */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Token Management</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-700/30 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Total Tokens</p>
                <p className="text-xl font-bold text-white">{adminStats.totalTokensCreated.toLocaleString()}</p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Active Tokens</p>
                <p className="text-xl font-bold text-green-400">1,089</p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Pending Review</p>
                <p className="text-xl font-bold text-yellow-400">23</p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Flagged Tokens</p>
                <p className="text-xl font-bold text-red-400">5</p>
              </div>
            </div>
          </div>

          {/* Tokens Table */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/30">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-300 font-medium">Token</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-medium">Creator</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-medium">Market Cap</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-medium">Holders</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-medium">Status</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tokens.map((token) => (
                    <tr key={token.id} className="border-t border-gray-700/30 hover:bg-gray-700/20">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{token.symbol.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="text-white font-medium">{token.name}</p>
                            <p className="text-gray-400 text-sm">{token.symbol}</p>
                          </div>
                          {token.flagged && (
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{token.creator}</td>
                      <td className="px-6 py-4 text-green-400 font-medium">${token.marketCap.toLocaleString()}</td>
                      <td className="px-6 py-4 text-white">{token.holders.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(token.status)}`}>
                          {token.status}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleTokenAction(token.id, token.status === 'active' ? 'suspend' : 'approve')}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                              token.status === 'active' 
                                ? 'bg-red-600/20 hover:bg-red-600/30 text-red-400' 
                                : 'bg-green-600/20 hover:bg-green-600/30 text-green-400'
                            }`}
                          >
                            {token.status === 'active' ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => handleTokenAction(token.id, 'flag')}
                            className="p-2 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 rounded-lg transition-all duration-200"
                          >
                            <AlertTriangle className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-all duration-200">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'revenue' && (
        <div className="space-y-6">
          {/* Revenue Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Total Revenue</h3>
              <p className="text-3xl font-bold text-green-400 mb-2">${adminStats.totalRevenue.toLocaleString()}</p>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm">+15.2% this month</span>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Monthly Recurring</h3>
              <p className="text-3xl font-bold text-blue-400 mb-2">${adminStats.monthlyRevenue.toLocaleString()}</p>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 text-sm">+8.7% vs last month</span>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Average Revenue Per User</h3>
              <p className="text-3xl font-bold text-purple-400 mb-2">$15.52</p>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400 text-sm">+3.1% this month</span>
              </div>
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Revenue Breakdown</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Crown className="w-6 h-6 text-purple-400" />
                  <div>
                    <p className="text-white font-medium">Ultimate Creator Bundle</p>
                    <p className="text-gray-400 text-sm">One-time + Monthly subscriptions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-purple-400 font-bold text-lg">$125,678</p>
                  <p className="text-gray-400 text-sm">51.2% of total</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Zap className="w-6 h-6 text-blue-400" />
                  <div>
                    <p className="text-white font-medium">Pro Creator Subscriptions</p>
                    <p className="text-gray-400 text-sm">Monthly recurring revenue</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-blue-400 font-bold text-lg">$89,234</p>
                  <p className="text-gray-400 text-sm">36.3% of total</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-6 h-6 text-green-400" />
                  <div>
                    <p className="text-white font-medium">Transaction Fees</p>
                    <p className="text-gray-400 text-sm">Platform usage fees</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-bold text-lg">$30,766</p>
                  <p className="text-gray-400 text-sm">12.5% of total</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'system' && (
        <div className="space-y-6">
          {/* System Health */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">System Health</p>
                  <p className="text-2xl font-bold text-green-400">{adminStats.systemHealth}%</p>
                </div>
                <Activity className="w-8 h-8 text-green-400" />
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">API Calls</p>
                  <p className="text-2xl font-bold text-blue-400">{adminStats.apiCalls.toLocaleString()}</p>
                </div>
                <Zap className="w-8 h-8 text-blue-400" />
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Storage Used</p>
                  <p className="text-2xl font-bold text-purple-400">{adminStats.storageUsed}%</p>
                </div>
                <Database className="w-8 h-8 text-purple-400" />
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Uptime</p>
                  <p className="text-2xl font-bold text-green-400">99.9%</p>
                </div>
                <Server className="w-8 h-8 text-green-400" />
              </div>
            </div>
          </div>

          {/* System Logs */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">System Logs</h3>
              <button className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-2 rounded-lg border border-blue-500/30 flex items-center space-x-2">
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>

            <div className="space-y-3">
              {systemLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getLogTypeColor(log.type)}`}>
                      {log.type.toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white">{log.message}</p>
                      <p className="text-gray-400 text-sm">{log.component}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">{log.timestamp}</p>
                </div>
              ))}
            </div>
          </div>

          {/* System Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">System Controls</h3>
              <div className="space-y-3">
                <button className="w-full bg-green-600/20 hover:bg-green-600/30 text-green-400 py-3 rounded-lg border border-green-500/30 flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Run Health Check</span>
                </button>
                <button className="w-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 py-3 rounded-lg border border-blue-500/30 flex items-center justify-center space-x-2">
                  <RefreshCw className="w-5 h-5" />
                  <span>Restart Services</span>
                </button>
                <button className="w-full bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 py-3 rounded-lg border border-yellow-500/30 flex items-center justify-center space-x-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Maintenance Mode</span>
                </button>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Backup & Recovery</h3>
              <div className="space-y-3">
                <button className="w-full bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 py-3 rounded-lg border border-purple-500/30 flex items-center justify-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Create Backup</span>
                </button>
                <button className="w-full bg-orange-600/20 hover:bg-orange-600/30 text-orange-400 py-3 rounded-lg border border-orange-500/30 flex items-center justify-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Restore Backup</span>
                </button>
                <button className="w-full bg-gray-600/20 hover:bg-gray-600/30 text-gray-400 py-3 rounded-lg border border-gray-500/30 flex items-center justify-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>View Backup History</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          {/* Platform Settings */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Platform Settings</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">General Settings</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Maintenance Mode</p>
                      <p className="text-gray-400 text-sm">Temporarily disable platform access</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">New User Registration</p>
                      <p className="text-gray-400 text-sm">Allow new users to register</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Token Creation</p>
                      <p className="text-gray-400 text-sm">Allow users to create new tokens</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Rate Limits</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">API Calls per Hour</label>
                    <input
                      type="number"
                      defaultValue="1000"
                      className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Tokens per Day</label>
                    <input
                      type="number"
                      defaultValue="5"
                      className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Pricing</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Pro Creator Monthly</label>
                    <input
                      type="number"
                      defaultValue="49.99"
                      step="0.01"
                      className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Ultimate Bundle</label>
                    <input
                      type="number"
                      defaultValue="799.99"
                      step="0.01"
                      className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Monthly Add-on</label>
                    <input
                      type="number"
                      defaultValue="99.99"
                      step="0.01"
                      className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button className="bg-gray-600/20 hover:bg-gray-600/30 text-gray-400 px-6 py-3 rounded-lg border border-gray-500/30">
                  Reset to Defaults
                </button>
                <button className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-6 py-3 rounded-lg border border-blue-500/30">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}