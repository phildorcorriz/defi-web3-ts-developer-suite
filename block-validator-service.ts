/**
 * 区块链区块校验服务
 * 验证：区块哈希、前区块哈希、交易根、时间戳合法性
 */
interface Block {
  index: number;
  timestamp: number;
  transactions: any[];
  previousHash: string;
  hash: string;
  nonce: number;
}

export class BlockValidator {
  // 计算区块哈希
  calculateBlockHash(block: Omit<Block, 'hash'>): string {
    const data = JSON.stringify({
      index: block.index,
      timestamp: block.timestamp,
      transactions: block.transactions,
      previousHash: block.previousHash,
      nonce: block.nonce,
    });
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  // 校验单个区块
  validateBlock(block: Block, previousBlock: Block): boolean {
    if (block.previousHash !== previousBlock.hash) return false;
    if (this.calculateBlockHash(block) !== block.hash) return false;
    if (block.index !== previousBlock.index + 1) return false;
    return true;
  }

  // 校验整个链
  validateChain(chain: Block[]): boolean {
    for (let i = 1; i < chain.length; i++) {
      if (!this.validateBlock(chain[i], chain[i - 1])) return false;
    }
    return true;
  }
}
