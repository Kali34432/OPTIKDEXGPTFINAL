import { loadStripe, Stripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

export interface PaymentIntent {
  id: string;
  client_secret: string;
  amount: number;
  currency: string;
  status: string;
}

export interface PaymentMethod {
  id: string;
  type: string;
  card?: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
}

export interface PaymentHistory {
  id: string;
  amount: number;
  currency: string;
  status: string;
  description: string;
  created: number;
  payment_method?: PaymentMethod;
}

class StripeService {
  private stripe: Promise<Stripe | null>;

  constructor() {
    this.stripe = stripePromise;
  }

  async getStripe(): Promise<Stripe | null> {
    return await this.stripe;
  }

  // Create payment intent for one-time payments
  async createPaymentIntent(amount: number, currency = 'usd', metadata?: Record<string, string>): Promise<PaymentIntent> {
    const response = await fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
        metadata
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    return response.json();
  }

  // Create subscription
  async createSubscription(priceId: string, paymentMethodId?: string): Promise<{ subscriptionId: string; clientSecret?: string; status: string }> {
    const response = await fetch('/api/stripe/create-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`
      },
      body: JSON.stringify({
        price_id: priceId,
        payment_method_id: paymentMethodId
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create subscription');
    }

    return response.json();
  }

  // Get customer's payment methods
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    const response = await fetch('/api/stripe/payment-methods', {
      headers: {
        'Authorization': `Bearer ${this.getAuthToken()}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch payment methods');
    }

    const data = await response.json();
    return data.payment_methods || [];
  }

  // Save payment method
  async savePaymentMethod(paymentMethodId: string): Promise<void> {
    const response = await fetch('/api/stripe/save-payment-method', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`
      },
      body: JSON.stringify({
        payment_method_id: paymentMethodId
      })
    });

    if (!response.ok) {
      throw new Error('Failed to save payment method');
    }
  }

  // Delete payment method
  async deletePaymentMethod(paymentMethodId: string): Promise<void> {
    const response = await fetch(`/api/stripe/payment-methods/${paymentMethodId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.getAuthToken()}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete payment method');
    }
  }

  // Get payment history
  async getPaymentHistory(limit = 10): Promise<PaymentHistory[]> {
    const response = await fetch(`/api/stripe/payment-history?limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${this.getAuthToken()}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch payment history');
    }

    const data = await response.json();
    return data.payments || [];
  }

  // Cancel subscription
  async cancelSubscription(subscriptionId: string): Promise<void> {
    const response = await fetch(`/api/stripe/subscriptions/${subscriptionId}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.getAuthToken()}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to cancel subscription');
    }
  }

  // Update subscription
  async updateSubscription(subscriptionId: string, newPriceId: string): Promise<any> {
    const response = await fetch(`/api/stripe/subscriptions/${subscriptionId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`
      },
      body: JSON.stringify({
        price_id: newPriceId
      })
    });

    if (!response.ok) {
      throw new Error('Failed to update subscription');
    }

    return response.json();
  }

  // Get current subscription
  async getCurrentSubscription(): Promise<any> {
    const response = await fetch('/api/stripe/subscription', {
      headers: {
        'Authorization': `Bearer ${this.getAuthToken()}`
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null; // No active subscription
      }
      throw new Error('Failed to fetch subscription');
    }

    return response.json();
  }

  // Process payment with saved payment method
  async processPaymentWithSavedMethod(paymentMethodId: string, amount: number): Promise<any> {
    const response = await fetch('/api/stripe/process-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`
      },
      body: JSON.stringify({
        payment_method_id: paymentMethodId,
        amount: Math.round(amount * 100)
      })
    });

    if (!response.ok) {
      throw new Error('Failed to process payment');
    }

    return response.json();
  }

  // Confirm payment intent
  async confirmPayment(clientSecret: string, paymentMethodId: string, savePaymentMethod = false): Promise<any> {
    const stripe = await this.getStripe();
    if (!stripe) throw new Error('Stripe not loaded');

    return stripe.confirmPayment({
      clientSecret,
      confirmParams: {
        payment_method: paymentMethodId,
        save_payment_method: savePaymentMethod,
        return_url: window.location.origin // or specify your desired return URL
      }
    });
  }

  // Create setup intent for saving payment method
  async createSetupIntent(): Promise<any> {
    const response = await fetch('/api/stripe/create-setup-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to create setup intent');
    }

    return response.json();
  }

  private getAuthToken(): string {
    // Get auth token from your existing auth system
    return localStorage.getItem('authToken') || '';
  }
}

export const stripeService = new StripeService();