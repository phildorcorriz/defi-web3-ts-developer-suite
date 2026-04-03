/**
 * DeFi收益计算器
 * 支持：流动性挖矿、质押、Lending、APY/APR转换
 */
interface DeFiInvestment {
  principal: number;
  apy: number;
  days: number;
  compoundFrequency: 'daily' | 'weekly' | 'monthly';
}

export class DeFiYieldCalculator {
  // APR 转 APY
  aprToApy(apr: number, compoundTimes = 365): number {
    return (Math.pow(1 + apr / compoundTimes, compoundTimes) - 1) * 100;
  }

  // 计算复利收益
  calculateYield({ principal, apy, days, compoundFrequency }: DeFiInvestment): number {
    const rate = apy / 100;
    const periods = { daily: 365, weekly: 52, monthly: 12 }[compoundFrequency];
    const periodRate = rate / periods;
    const totalPeriods = periods * (days / 365);
    return principal * Math.pow(1 + periodRate, totalPeriods) - principal;
  }

  // 计算最终资产
  getTotalAssets(investment: DeFiInvestment): number {
    return investment.principal + this.calculateYield(investment);
  }
}
