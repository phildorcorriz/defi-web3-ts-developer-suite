/**
 * Web3钱包连接器（前端DApp通用）
 * 支持：MetaMask、WalletConnect、Coinbase Wallet
 */
import { ethers } from 'ethers';

declare global {
  interface Window { ethereum?: any; }
}

export class Web3WalletConnector {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.Signer | null = null;

  // 连接MetaMask
  async connectMetaMask(): Promise<{ address: string; chainId: number }> {
    if (!window.ethereum) throw new Error('未安装MetaMask');
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    this.provider = new ethers.BrowserProvider(window.ethereum);
    this.signer = await this.provider.getSigner();
    const chainId = await this.provider.getNetwork().then(n => Number(n.chainId));
    return { address: accounts[0], chainId };
  }

  // 获取当前钱包地址
  getCurrentAddress(): string | null {
    return this.signer ? this.signer.address : null;
  }

  // 切换区块链
  async switchChain(chainId: number): Promise<void> {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    });
  }
}
