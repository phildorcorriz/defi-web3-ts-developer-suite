/**
 * 智能合约事件监听器
 * 实时监听：Transfer、Approval、Swap等链上事件
 */
import { ethers } from 'ethers';

interface ContractEventConfig {
  address: string;
  abi: any[];
  eventName: string;
}

export class ContractEventListener {
  private provider: ethers.JsonRpcProvider;

  constructor(rpcUrl: string) {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
  }

  // 监听合约事件
  listenEvent(config: ContractEventConfig, callback: (event: any) => void): void {
    const contract = new ethers.Contract(config.address, config.abi, this.provider);
    contract.on(config.eventName, (...args) => {
      callback({ event: config.eventName, data: args });
    });
  }

  // 获取历史事件
  async getHistoricalEvents(config: ContractEventConfig, fromBlock: number): Promise<any[]> {
    const contract = new ethers.Contract(config.address, config.abi, this.provider);
    const filter = contract.filters[config.eventName]();
    return await contract.queryFilter(filter, fromBlock, 'latest');
  }
}
