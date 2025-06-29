import { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import Button from '../components/ui/Button';

const SOLANA_RPC_URL = import.meta.env.VITE_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';

// Use environment variables with fallbacks to valid Solana addresses
const OPTIK_TOKEN_ADDRESS = import.meta.env.VITE_OPTIK_TOKEN_ADDRESS || 'So11111111111111111111111111111111111111112'; // SOL mint as fallback
const USDC_TOKEN_ADDRESS = import.meta.env.VITE_USDC_TOKEN_ADDRESS || 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'; // USDC mint

interface OptikWalletProps {
  open?: boolean;
  onClose?: () => void;
}

export default function OptikWallet({ open = true, onClose }: OptikWalletProps) {
  const wallet = useWallet();
  const [optikBalance, setOptikBalance] = useState(0);
  const [usdcBalance, setUsdcBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (wallet.publicKey && open) {
      fetchBalances();
    }
  }, [wallet.publicKey, open]);

  const fetchBalances = async () => {
    if (!wallet.publicKey) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const connection = new Connection(SOLANA_RPC_URL);
      
      // Create PublicKey objects safely
      const optikTokenMint = new PublicKey(OPTIK_TOKEN_ADDRESS);
      const usdcTokenMint = new PublicKey(USDC_TOKEN_ADDRESS);
      
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        wallet.publicKey, 
        { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }
      );
      
      let optikFound = false;
      let usdcFound = false;
      
      for (const { account } of tokenAccounts.value) {
        const data = account.data.parsed.info;
        const mint = data.mint;
        const amount = parseFloat(data.tokenAmount.uiAmount || '0');
        
        if (mint === optikTokenMint.toBase58()) {
          setOptikBalance(amount);
          optikFound = true;
        }
        if (mint === usdcTokenMint.toBase58()) {
          setUsdcBalance(amount);
          usdcFound = true;
        }
      }
      
      // Set to 0 if tokens not found
      if (!optikFound) setOptikBalance(0);
      if (!usdcFound) setUsdcBalance(0);
      
    } catch (err) {
      console.error('Error fetching balances:', err);
      setError('Failed to fetch token balances');
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800/95 backdrop-blur-md border border-gray-700/50 rounded-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">OPTIK Wallet</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              ✕
            </button>
          )}
        </div>

        {wallet.publicKey ? (
          <div className="space-y-4">
            <div className="bg-gray-700/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-2">Wallet Address</p>
              <p className="text-white font-mono text-sm break-all">
                {wallet.publicKey.toBase58()}
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-3">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">OPTK Balance:</span>
                  <span className="text-white font-semibold">
                    {isLoading ? 'Loading...' : optikBalance.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">USDC Balance:</span>
                  <span className="text-white font-semibold">
                    {isLoading ? 'Loading...' : usdcBalance.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button 
                onClick={() => alert('Send functionality coming soon!')}
                className="flex-1"
              >
                Send
              </Button>
              <Button 
                onClick={() => alert('Receive functionality coming soon!')}
                className="flex-1"
              >
                Receive
              </Button>
            </div>

            <button
              onClick={fetchBalances}
              disabled={isLoading}
              className="w-full mt-4 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 py-2 rounded-lg transition-all duration-200 border border-blue-500/30 disabled:opacity-50"
            >
              {isLoading ? 'Refreshing...' : 'Refresh Balances'}
            </button>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">No wallet connected</p>
            <p className="text-gray-500 text-sm">
              Please connect your wallet to view balances
            </p>
          </div>
        )}
      </div>
    </div>
  );
}