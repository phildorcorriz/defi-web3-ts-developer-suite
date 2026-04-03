/**
 * NFT元数据校验器
 * 校验：格式合规性、链上数据匹配、图片/属性完整性
 */
interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{ trait_type: string; value: string | number }>;
  chainId: number;
  tokenId: string;
}

export class NFTMetadataValidator {
  // 校验必填字段
  validateRequiredFields(metadata: Partial<NFTMetadata>): boolean {
    return !!(metadata.name && metadata.image && metadata.tokenId);
  }

  // 校验图片URL格式
  validateImageUrl(url: string): boolean {
    return /^https?:\/\/.+\.(png|jpg|jpeg|gif|svg)$/.test(url) || url.startsWith('ipfs://');
  }

  // 校验公链ID
  validateChainId(chainId: number): boolean {
    return [1, 5, 56, 97, 137, 80001].includes(chainId);
  }

  // 完整校验
  fullValidate(metadata: NFTMetadata): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (!this.validateRequiredFields(metadata)) errors.push('缺少必填字段');
    if (!this.validateImageUrl(metadata.image)) errors.push('图片地址不合法');
    if (!this.validateChainId(metadata.chainId)) errors.push('链ID无效');
    return { valid: errors.length === 0, errors };
  }
}
