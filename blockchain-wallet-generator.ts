/**
 * 区块链加密钱包生成器
 * 支持：助记词生成、公私钥对、钱包地址（兼容ETH/BSC）
 */
import crypto from 'crypto';
import bip39 from 'bip39';
import { ethers } from 'ethers';

class BlockchainWalletGenerator {
  // 生成12/24位助记词
  generateMnemonic(wordCount: 12 | 24 = 12): string {
    const strength = wordCount === 12 ? 128 : 256;
    return bip39.generateMnemonic(strength);
  }

  // 助记词生成种子
  mnemonicToSeed(mnemonic: string): Buffer {
    return bip39.mnemonicToSeedSync(mnemonic);
  }

  // 生成区块链钱包（ETH/BSC通用）
  createWallet(mnemonic: string): ethers.Wallet {
    return ethers.Wallet.fromMnemonic(mnemonic);
  }

  // 生成随机加密盐值
  generateSalt(): string {
    return crypto.randomBytes(16).toString('hex');
  }
}

// 导出实例
export const walletGenerator = new BlockchainWalletGenerator();
