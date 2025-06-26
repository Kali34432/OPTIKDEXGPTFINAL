// Admin API Service for OptikDexGPT Backend Management
export interface AdminUser {
  id: number;
  email: string;
  wallet: string;
  subscription: string;
  tokensCreated: number;
  revenue: number;
  status: 'active' | 'suspended' | 'pending';
  joinDate: string;
  lastActive: string;
  ipAddress?: string;
  country?: string;
  referralCode?: string;
  totalSpent: number;
  lifetimeValue: number;
}

export interface AdminToken {
  id: number;
  name: string;
  symbol: string;
  contractAddress: string;
  creator: string;
  creatorWallet: string;
  marketCap: number;
  holders: number;
  totalSupply: number;
  liquidity: number;
  status: 'active' | 'pending' | 'suspended' | 'flagged';
  createdDate: string;
  flagged: boolean;
  flagReason?: string;
  auditScore?: number;
  riskLevel: 'low' | 'medium' | 'high';
  tradingVolume24h: number;
  priceChange24h: number;
}

export interface SystemMetrics {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalTokensCreated: number;
  activeSubscriptions: number;
  pendingApprovals: number;
  systemHealth: number;
  apiCalls: number;
  storageUsed: number;
  uptime: number;
  errorRate: number;
  avgResponseTime: number;
}

export interface SystemLog {
  id: number;
  type: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  timestamp: string;
  component: string;
  userId?: number;
  ipAddress?: string;
  details?: unknown;
}

export interface RevenueData {
  totalRevenue: number;
  monthlyRevenue: number;
  dailyRevenue: number;
  revenueByPlan: {
    free: number;
    proCreator: number;
    ultimateBundle: number;
    addOns: number;
  };
  revenueGrowth: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  topPayingUsers: AdminUser[];
  churnRate: number;
  averageRevenuePerUser: number;
}

export interface PlatformSettings {
  maintenanceMode: boolean;
  newUserRegistration: boolean;
  tokenCreation: boolean;
  rateLimits: {
    apiCallsPerHour: number;
    tokensPerDay: number;
    maxTokenSupply: number;
  };
  pricing: {
    proCreatorMonthly: number;
    ultimateBundle: number;
    monthlyAddOn: number;
    transactionFee: number;
  };
  security: {
    requireKYC: boolean;
    maxWalletsPerUser: number;
    suspiciousActivityThreshold: number;
  };
  features: {
    aiChatEnabled: boolean;
    memeCreatorEnabled: boolean;
    stakingEnabled: boolean;
    miningEnabled: boolean;
  };
}

class AdminAPIService {
  private baseURL = '/api/admin';
  private authToken: string | null = null;

  // Authentication
  async login(email: string, password: string, twoFactorCode?: string): Promise<{ token: string; user: AdminUser }> {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, twoFactorCode })
    });
    
    if (!response.ok) throw new Error('Login failed');
    
    const data = await response.json();
    this.authToken = data.token;
    localStorage.setItem('adminToken', data.token);
    return data;
  }

  async logout(): Promise<void> {
    await fetch(`${this.baseURL}/auth/logout`, {
      method: 'POST',
      headers: this.getHeaders()
    });
    
    this.authToken = null;
    localStorage.removeItem('adminToken');
  }

  // User Management
  async getUsers(page = 1, limit = 50, filters?: Record<string, string | number | undefined>): Promise<{ users: AdminUser[]; total: number; pages: number }> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters
    });

    const response = await fetch(`${this.baseURL}/users?${params}`, {
      headers: this.getHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  }

  async getUserById(userId: number): Promise<AdminUser> {
    const response = await fetch(`${this.baseURL}/users/${userId}`, {
      headers: this.getHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  }

  async updateUserStatus(userId: number, status: 'active' | 'suspended'): Promise<void> {
    const response = await fetch(`${this.baseURL}/users/${userId}/status`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify({ status })
    });
    
    if (!response.ok) throw new Error('Failed to update user status');
  }

  async suspendUser(userId: number, reason: string, duration?: number): Promise<void> {
    const response = await fetch(`${this.baseURL}/users/${userId}/suspend`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ reason, duration })
    });
    
    if (!response.ok) throw new Error('Failed to suspend user');
  }

  async deleteUser(userId: number): Promise<void> {
    const response = await fetch(`${this.baseURL}/users/${userId}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to delete user');
  }

  // Token Management
  async getTokens(page = 1, limit = 50, filters?: Record<string, string | number | undefined>): Promise<{ tokens: AdminToken[]; total: number; pages: number }> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters
    });

    const response = await fetch(`${this.baseURL}/tokens?${params}`, {
      headers: this.getHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to fetch tokens');
    return response.json();
  }

  async getTokenById(tokenId: number): Promise<AdminToken> {
    const response = await fetch(`${this.baseURL}/tokens/${tokenId}`, {
      headers: this.getHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to fetch token');
    return response.json();
  }

  async updateTokenStatus(tokenId: number, status: 'active' | 'suspended' | 'flagged'): Promise<void> {
    const response = await fetch(`${this.baseURL}/tokens/${tokenId}/status`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify({ status })
    });
    
    if (!response.ok) throw new Error('Failed to update token status');
  }

  async flagToken(tokenId: number, reason: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/tokens/${tokenId}/flag`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ reason })
    });
    
    if (!response.ok) throw new Error('Failed to flag token');
  }

  async auditToken(tokenId: number): Promise<{ score: number; risks: string[]; recommendations: string[] }> {
    const response = await fetch(`${this.baseURL}/tokens/${tokenId}/audit`, {
      method: 'POST',
      headers: this.getHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to audit token');
    return response.json();
  }

  // System Monitoring
  async getSystemMetrics(): Promise<SystemMetrics> {
    const response = await fetch(`${this.baseURL}/system/metrics`, {
      headers: this.getHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to fetch system metrics');
    return response.json();
  }

  async getSystemLogs(page = 1, limit = 100, type?: string): Promise<{ logs: SystemLog[]; total: number }> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(type && { type })
    });

    const response = await fetch(`${this.baseURL}/system/logs?${params}`, {
      headers: this.getHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to fetch system logs');
    return response.json();
  }

  async runHealthCheck(): Promise<{ status: string; checks: unknown[] }> {
    const response = await fetch(`${this.baseURL}/system/health`, {
      method: 'POST',
      headers: this.getHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to run health check');
    return response.json();
  }

  async restartService(serviceName: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/system/restart/${serviceName}`, {
      method: 'POST',
      headers: this.getHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to restart service');
  }

  // Revenue Analytics
  async getRevenueData(timeframe = '30d'): Promise<RevenueData> {
    const response = await fetch(`${this.baseURL}/revenue?timeframe=${timeframe}`, {
      headers: this.getHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to fetch revenue data');
    return response.json();
  }

  async getRevenueChart(timeframe = '30d'): Promise<{ labels: string[]; data: number[] }> {
    const response = await fetch(`${this.baseURL}/revenue/chart?timeframe=${timeframe}`, {
      headers: this.getHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to fetch revenue chart');
    return response.json();
  }

  // Platform Settings
  async getSettings(): Promise<PlatformSettings> {
    const response = await fetch(`${this.baseURL}/settings`, {
      headers: this.getHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to fetch settings');
    return response.json();
  }

  async updateSettings(settings: Partial<PlatformSettings>): Promise<void> {
    const response = await fetch(`${this.baseURL}/settings`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(settings)
    });
    
    if (!response.ok) throw new Error('Failed to update settings');
  }

  // Notifications & Communications
  async sendAnnouncement(title: string, message: string, targetUsers?: 'all' | 'subscribers' | 'free'): Promise<void> {
    const response = await fetch(`${this.baseURL}/notifications/announcement`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ title, message, targetUsers })
    });
    
    if (!response.ok) throw new Error('Failed to send announcement');
  }

  async sendEmailToUser(userId: number, subject: string, message: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/notifications/email`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ userId, subject, message })
    });
    
    if (!response.ok) throw new Error('Failed to send email');
  }

  // Data Export
  async exportUsers(format = 'csv'): Promise<Blob> {
    const response = await fetch(`${this.baseURL}/export/users?format=${format}`, {
      headers: this.getHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to export users');
    return response.blob();
  }

  async exportTokens(format = 'csv'): Promise<Blob> {
    const response = await fetch(`${this.baseURL}/export/tokens?format=${format}`, {
      headers: this.getHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to export tokens');
    return response.blob();
  }

  async exportRevenue(format = 'csv', timeframe = '30d'): Promise<Blob> {
    const response = await fetch(`${this.baseURL}/export/revenue?format=${format}&timeframe=${timeframe}`, {
      headers: this.getHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to export revenue data');
    return response.blob();
  }

  // Backup & Recovery
  async createBackup(): Promise<{ backupId: string; size: number; timestamp: string }> {
    const response = await fetch(`${this.baseURL}/backup/create`, {
      method: 'POST',
      headers: this.getHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to create backup');
    return response.json();
  }

  async getBackups(): Promise<Array<{ id: string; size: number; timestamp: string; status: string }>> {
    const response = await fetch(`${this.baseURL}/backup/list`, {
      headers: this.getHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to fetch backups');
    return response.json();
  }

  async restoreBackup(backupId: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/backup/restore/${backupId}`, {
      method: 'POST',
      headers: this.getHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to restore backup');
  }

  // Utility Methods
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    return headers;
  }

  setAuthToken(token: string): void {
    this.authToken = token;
  }

  getAuthToken(): string | null {
    return this.authToken || localStorage.getItem('adminToken');
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }
}

// Export singleton instance
export const adminAPI = new AdminAPIService();

// Initialize auth token from localStorage
const savedToken = localStorage.getItem('adminToken');
if (savedToken) {
  adminAPI.setAuthToken(savedToken);
}