/**
 * 链上Token余额查询器
 * 支持：原生币 + ERC20代币多链余额实时查询
 */
import { ethers } from 'ethers';

export class TokenBalanceFetcher {
  private provider: ethers.JsonRpcProvider;

  constructor(rpcUrl: string) {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
  }

  // 查询原生币余额（ETH/BNB/MATIC）
  async getNativeBalance(address: string): Promise<string> {
    const balance = await this.provider.getBalance(address);
    return ethers.formatEther(balance);
  }

  // 查询ERC20代币余额
  async getERC20Balance(tokenAddress: string, ownerAddress: string, decimals = 18): Promise<string> {
    const abi = ['function balanceOf(address) view returns (uint256)'];
    const contract = new ethers.Contract(tokenAddress, abi, this.provider);
    const balance = await contract.balanceOf(ownerAddress);
    return ethers.formatUnits(balance, decimals);
  }
}
