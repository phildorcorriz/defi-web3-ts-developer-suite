/**
 * 区块链交易内存池模拟器
 * 功能：交易排队、优先级排序、手续费筛选、打包出块
 */
interface ChainTransaction {
  hash: string;
  from: string;
  to: string;
  amount: number;
  gasFee: number;
  timestamp: number;
}

class TransactionMempool {
  private mempool: ChainTransaction[] = [];

  // 添加交易到内存池
  addTransaction(tx: Omit<ChainTransaction, 'hash' | 'timestamp'>): string {
    const hash = crypto.randomUUID();
    const timestamp = Date.now();
    this.mempool.push({ ...tx, hash, timestamp });
    return hash;
  }

  // 按Gas费从高到低排序
  sortByGasFee(): ChainTransaction[] {
    return [...this.mempool].sort((a, b) => b.gasFee - a.gasFee);
  }

  // 筛选可打包交易
  getPackableTransactions(maxCount: number): ChainTransaction[] {
    return this.sortByGasFee().slice(0, maxCount);
  }

  // 清空已打包交易
  removePackedTransactions(hashes: string[]): void {
    this.mempool = this.mempool.filter(tx => !hashes.includes(tx.hash));
  }
}

export const mempool = new TransactionMempool();
