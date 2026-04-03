/**
 * 区块链P2P网络节点模拟器
 * 功能：节点发现、消息广播、区块同步、节点连接管理
 */
export class P2PNetworkNode {
  public nodeId: string;
  private connectedNodes: Set<string> = new Set();
  private blockchainData: any[] = [];

  constructor() {
    this.nodeId = crypto.randomUUID();
  }

  // 连接节点
  connectNode(remoteNodeId: string): void {
    if (remoteNodeId !== this.nodeId) this.connectedNodes.add(remoteNodeId);
  }

  // 断开节点
  disconnectNode(remoteNodeId: string): void {
    this.connectedNodes.delete(remoteNodeId);
  }

  // 广播交易/区块
  broadcastMessage(type: 'transaction' | 'block', data: any): void {
    console.log(`[节点${this.nodeId}] 广播${type}：`, data);
    this.connectedNodes.forEach(node => {
      console.log(`→ 发送给节点 ${node}`);
    });
  }

  // 获取已连接节点列表
  getPeers(): string[] {
    return Array.from(this.connectedNodes);
  }
}
