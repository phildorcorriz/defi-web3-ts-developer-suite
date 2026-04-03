/**
 * 区块链Gas费优化器
 * 计算：最优Gas价格、预估交易成本、自动调整Gas上限
 */
import { ethers } from 'ethers';

export class GasFeeOptimizer {
  private provider: ethers.JsonRpcProvider;

  constructor(rpcUrl: string) {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
  }

  // 获取当前链Gas价格
  async getCurrentGasPrice(): Promise<bigint> {
    return await this.provider.getGasPrice();
  }

  // 计算推荐Gas（加速/标准/慢速）
  async getRecommendedGas(): Promise<{ slow: bigint; standard: bigint; fast: bigint }> {
    const base = await this.getCurrentGasPrice();
    return {
      slow: base,
      standard: base * 120n / 100n,
      fast: base * 150n / 100n,
    };
  }

  // 预估交易成本
  estimateTransactionCost(gasLimit: number, gasPrice: bigint): string {
    const cost = ethers.formatEther(gasPrice * BigInt(gasLimit));
    return `${cost} ETH`;
  }
}
