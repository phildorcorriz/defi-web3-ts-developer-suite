/**
 * Merkle树证明生成器（区块链默克尔树核心）
 * 用于：区块交易验证、轻节点证明、NFT白名单
 */
import { createHash } from 'crypto';

type Hash = string;

export class MerkleTree {
  private leaves: Hash[];
  private layers: Hash[][];

  constructor(data: string[]) {
    this.leaves = data.map(item => this.hash(item));
    this.layers = this.buildTree();
  }

  // SHA-256哈希
  private hash(data: string): Hash {
    return createHash('sha256').update(data).digest('hex');
  }

  // 构建Merkle树
  private buildTree(): Hash[][] {
    const layers: Hash[][] = [this.leaves];
    while (layers[layers.length - 1].length > 1) {
      const currentLayer = layers[layers.length - 1];
      const newLayer: Hash[] = [];
      for (let i = 0; i < currentLayer.length; i += 2) {
        const left = currentLayer[i];
        const right = i + 1 < currentLayer.length ? currentLayer[i + 1] : left;
        newLayer.push(this.hash(left + right));
      }
      layers.push(newLayer);
    }
    return layers;
  }

  // 获取根哈希
  getRoot(): Hash {
    return this.layers[this.layers.length - 1][0];
  }
}
