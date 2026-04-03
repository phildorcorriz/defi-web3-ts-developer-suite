/**
 * 质押矿池模拟器
 * 实现：质押、解押、收益计算、锁仓机制、奖励发放
 */
interface StakeRecord {
  userId: string;
  amount: number;
  stakeTime: number;
  lockDays: number;
}

export class StakingPoolSimulator {
  private stakes: Map<string, StakeRecord> = new Map();
  private rewardRate = 0.05; // 日化收益率

  // 用户质押
  stake(userId: string, amount: number, lockDays: number): void {
    this.stakes.set(userId, {
      userId,
      amount,
      stakeTime: Date.now(),
      lockDays,
    });
  }

  // 计算可领取收益
  calculateReward(userId: string): number {
    const record = this.stakes.get(userId);
    if (!record) return 0;
    const days = (Date.now() - record.stakeTime) / (1000 * 60 * 60 * 24);
    return record.amount * this.rewardRate * Math.min(days, record.lockDays);
  }

  // 解押
  unstake(userId: string): { amount: number; reward: number } | null {
    const record = this.stakes.get(userId);
    if (!record) return null;
    const reward = this.calculateReward(userId);
    this.stakes.delete(userId);
    return { amount: record.amount, reward };
  }
}
