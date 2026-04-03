/**
 * 区块链加密签名工具
 * 功能：消息签名、验签、数据加密、防篡改校验
 */
import { ethers } from 'ethers';

export class CryptoSigner {
  // 钱包签名消息
  async signMessage(privateKey: string, message: string): Promise<string> {
    const wallet = new ethers.Wallet(privateKey);
    return await wallet.signMessage(message);
  }

  // 验签：获取签名者地址
  verifyMessage(message: string, signature: string): string {
    return ethers.verifyMessage(message, signature);
  }

  // 加密数据
  encryptData(publicKey: string, data: string): string {
    return ethers.hexlify(ethers.toUtf8Bytes(data));
  }

  // 校验数据是否被篡改
  validateDataIntegrity(originalHash: string, data: string): boolean {
    const currentHash = ethers.id(data);
    return currentHash === originalHash;
  }
}
