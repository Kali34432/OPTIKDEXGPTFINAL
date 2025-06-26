// OptikWallet.tsx - Wallet Balances & Send Functionality
import { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
// Update the import path below to the correct location of your Button component.
// Example for shadcn/ui: import { Button } from "@/components/ui/button";
// import { Button } from '@/components/ui/button';
import Button from '../components/ui/Button'; // Ensure the file name and import casing match exactly
// If the Button component is located at src/components/ui/button.tsx, use the above path.
// Otherwise, adjust the path according to your project structure.

const SOLANA_RPC_URL = import.meta.env.VITE_SOLANA_RPC_URL;
const OPTIK_TOKEN_ADDRESS = new PublicKey(import.meta.env.VITE_OPTIK_TOKEN_ADDRESS);
const USDC_TOKEN_ADDRESS = new PublicKey('INSERT_USDC_MINT_HERE'); // Replace with actual USDC mint

export default function OptikWallet() {
  const wallet = useWallet();
  const [optikBalance, setOptikBalance] = useState(0);
  const [usdcBalance, setUsdcBalance] = useState(0);

  useEffect(() => {
    const connection = new Connection(SOLANA_RPC_URL);
    if (wallet.publicKey) {
      (async () => {
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(wallet.publicKey!, { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') });
        for (const { account } of tokenAccounts.value) {
          const data = account.data.parsed.info;
          const mint = data.mint;
          const amount = parseFloat(data.tokenAmount.uiAmount);
          if (mint === OPTIK_TOKEN_ADDRESS.toBase58()) setOptikBalance(amount);
          if (mint === USDC_TOKEN_ADDRESS.toBase58()) setUsdcBalance(amount);
        }
      })();
    }
  }, [wallet.publicKey]);

  return (
    <div className="bg-black text-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl mb-4">Your Wallet</h2>
      <p><strong>Address:</strong> {wallet.publicKey?.toBase58()}</p>
      <p className="mt-2">$OPTIK Balance: {optikBalance}</p>
      <p>USDC Balance: {usdcBalance}</p>
      <div className="mt-6 flex gap-4">
        <Button>Send</Button>
        <Button>Receive</Button>
      </div>
    </div>
  );
}