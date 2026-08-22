/**
 * Financial Calculations
 * Core financial ratio and metric calculations
 */

/**
 * Calculate Gross Margin Percentage
 * Formula: (Gross Profit / Revenue) * 100
 *
 * @param revenue - Total revenue
 * @param costOfGoodsSold - Cost of goods sold
 * @returns Gross margin percentage (0-100)
 */
export function calculateGrossMargin(revenue: number, costOfGoodsSold: number): number {
  if (revenue === 0) return 0;
  const grossProfit = revenue - costOfGoodsSold;
  return (grossProfit / revenue) * 100;
}

/**
 * Calculate Net Margin Percentage
 * Formula: (Net Income / Revenue) * 100
 *
 * @param revenue - Total revenue
 * @param netIncome - Net profit/income
 * @returns Net margin percentage (0-100)
 */
export function calculateNetMargin(revenue: number, netIncome: number): number {
  if (revenue === 0) return 0;
  return (netIncome / revenue) * 100;
}

/**
 * Calculate Operating Margin Percentage
 * Formula: (Operating Income / Revenue) * 100
 *
 * @param revenue - Total revenue
 * @param operatingIncome - Operating profit before interest and taxes
 * @returns Operating margin percentage (0-100)
 */
export function calculateOperatingMargin(revenue: number, operatingIncome: number): number {
  if (revenue === 0) return 0;
  return (operatingIncome / revenue) * 100;
}

/**
 * Calculate Return on Investment (ROI)
 * Formula: (Profit / Investment) * 100
 *
 * @param profit - Net profit or gain
 * @param investment - Initial investment or total assets
 * @returns ROI percentage
 */
export function calculateROI(profit: number, investment: number): number {
  if (investment === 0) return 0;
  return (profit / investment) * 100;
}

/**
 * Calculate Return on Assets (ROA)
 * Formula: (Net Income / Total Assets) * 100
 *
 * @param netIncome - Net profit
 * @param totalAssets - Total assets
 * @returns ROA percentage
 */
export function calculateROA(netIncome: number, totalAssets: number): number {
  if (totalAssets === 0) return 0;
  return (netIncome / totalAssets) * 100;
}

/**
 * Calculate Return on Equity (ROE)
 * Formula: (Net Income / Shareholders' Equity) * 100
 *
 * @param netIncome - Net profit
 * @param equity - Shareholders' equity
 * @returns ROE percentage
 */
export function calculateROE(netIncome: number, equity: number): number {
  if (equity === 0) return 0;
  return (netIncome / equity) * 100;
}

/**
 * Calculate Current Ratio (Liquidity)
 * Formula: Current Assets / Current Liabilities
 * Benchmark: 1.5-2.0 is healthy
 *
 * @param currentAssets - Current assets (cash, receivables, inventory, etc.)
 * @param currentLiabilities - Current liabilities (payables, short-term debt)
 * @returns Current ratio (higher is better, 1.5+ is healthy)
 */
export function calculateCurrentRatio(currentAssets: number, currentLiabilities: number): number {
  if (currentLiabilities === 0) return 0;
  return currentAssets / currentLiabilities;
}

/**
 * Calculate Quick Ratio (Acid-Test Ratio)
 * Formula: (Current Assets - Inventory) / Current Liabilities
 * More conservative than current ratio
 *
 * @param currentAssets - Current assets
 * @param inventory - Inventory value
 * @param currentLiabilities - Current liabilities
 * @returns Quick ratio (1.0+ is healthy)
 */
export function calculateQuickRatio(
  currentAssets: number,
  inventory: number,
  currentLiabilities: number
): number {
  if (currentLiabilities === 0) return 0;
  const quickAssets = currentAssets - inventory;
  return quickAssets / currentLiabilities;
}

/**
 * Calculate Cash Ratio
 * Formula: Cash & Equivalents / Current Liabilities
 * Most conservative liquidity measure
 *
 * @param cashAndEquivalents - Cash and cash equivalents
 * @param currentLiabilities - Current liabilities
 * @returns Cash ratio
 */
export function calculateCashRatio(cashAndEquivalents: number, currentLiabilities: number): number {
  if (currentLiabilities === 0) return 0;
  return cashAndEquivalents / currentLiabilities;
}

/**
 * Calculate Debt Ratio
 * Formula: Total Debt / Total Assets
 * Measures financial leverage (lower is better)
 *
 * @param totalDebt - Total debt (short-term + long-term)
 * @param totalAssets - Total assets
 * @returns Debt ratio (0-1, lower is better)
 */
export function calculateDebtRatio(totalDebt: number, totalAssets: number): number {
  if (totalAssets === 0) return 0;
  return totalDebt / totalAssets;
}

/**
 * Calculate Debt-to-Equity Ratio
 * Formula: Total Debt / Shareholders' Equity
 * Measures financial leverage
 * Benchmark: < 1.0 is conservative, 1.0-2.0 is moderate
 *
 * @param totalDebt - Total debt
 * @param equity - Shareholders' equity
 * @returns Debt-to-equity ratio
 */
export function calculateDebtToEquityRatio(totalDebt: number, equity: number): number {
  if (equity === 0) return 0;
  return totalDebt / equity;
}

/**
 * Calculate Equity Ratio
 * Formula: Shareholders' Equity / Total Assets
 * Inverse of debt ratio
 *
 * @param equity - Shareholders' equity
 * @param totalAssets - Total assets
 * @returns Equity ratio (0-1, higher is better)
 */
export function calculateEquityRatio(equity: number, totalAssets: number): number {
  if (totalAssets === 0) return 0;
  return equity / totalAssets;
}

/**
 * Calculate EBITDA (Earnings Before Interest, Taxes, Depreciation, Amortization)
 * Formula: Net Income + Interest + Taxes + Depreciation + Amortization
 * Used for comparing profitability without capital structure impact
 *
 * @param netIncome - Net income
 * @param interestExpense - Interest expense
 * @param taxes - Tax expense
 * @param depreciation - Depreciation expense
 * @param amortization - Amortization expense
 * @returns EBITDA
 */
export function calculateEBITDA(
  netIncome: number,
  interestExpense: number,
  taxes: number,
  depreciation: number,
  amortization: number
): number {
  return netIncome + interestExpense + taxes + depreciation + amortization;
}

/**
 * Calculate EBITDA Margin
 * Formula: (EBITDA / Revenue) * 100
 *
 * @param ebitda - EBITDA value
 * @param revenue - Total revenue
 * @returns EBITDA margin percentage
 */
export function calculateEBITDAMargin(ebitda: number, revenue: number): number {
  if (revenue === 0) return 0;
  return (ebitda / revenue) * 100;
}

/**
 * Calculate Asset Turnover Ratio
 * Formula: Revenue / Average Total Assets
 * Measures how efficiently assets generate revenue
 *
 * @param revenue - Total revenue
 * @param totalAssets - Total assets
 * @returns Asset turnover ratio
 */
export function calculateAssetTurnover(revenue: number, totalAssets: number): number {
  if (totalAssets === 0) return 0;
  return revenue / totalAssets;
}

/**
 * Calculate Inventory Turnover Ratio
 * Formula: Cost of Goods Sold / Average Inventory
 * Higher is better (faster inventory movement)
 *
 * @param costOfGoodsSold - COGS
 * @param averageInventory - Average inventory value
 * @returns Inventory turnover ratio
 */
export function calculateInventoryTurnover(
  costOfGoodsSold: number,
  averageInventory: number
): number {
  if (averageInventory === 0) return 0;
  return costOfGoodsSold / averageInventory;
}

/**
 * Calculate Days Inventory Outstanding (DIO)
 * Formula: 365 / Inventory Turnover Ratio
 * Average days inventory is held before sale
 *
 * @param costOfGoodsSold - COGS
 * @param averageInventory - Average inventory value
 * @returns Days inventory outstanding
 */
export function calculateDaysInventoryOutstanding(
  costOfGoodsSold: number,
  averageInventory: number
): number {
  const turnover = calculateInventoryTurnover(costOfGoodsSold, averageInventory);
  if (turnover === 0) return 0;
  return 365 / turnover;
}

/**
 * Calculate Receivables Turnover Ratio
 * Formula: Revenue / Average Accounts Receivable
 * How efficiently credit sales are converted to cash
 *
 * @param revenue - Total revenue
 * @param averageReceivables - Average accounts receivable
 * @returns Receivables turnover ratio
 */
export function calculateReceivablesTurnover(revenue: number, averageReceivables: number): number {
  if (averageReceivables === 0) return 0;
  return revenue / averageReceivables;
}

/**
 * Calculate Days Sales Outstanding (DSO)
 * Formula: 365 / Receivables Turnover Ratio
 * Average days to collect payment from customers
 *
 * @param revenue - Total revenue
 * @param averageReceivables - Average accounts receivable
 * @returns Days sales outstanding
 */
export function calculateDaysSalesOutstanding(revenue: number, averageReceivables: number): number {
  const turnover = calculateReceivablesTurnover(revenue, averageReceivables);
  if (turnover === 0) return 0;
  return 365 / turnover;
}

/**
 * Calculate Payables Turnover Ratio
 * Formula: Cost of Goods Sold / Average Accounts Payable
 * How quickly the company pays suppliers
 *
 * @param costOfGoodsSold - COGS
 * @param averagePayables - Average accounts payable
 * @returns Payables turnover ratio
 */
export function calculatePayablesTurnover(costOfGoodsSold: number, averagePayables: number): number {
  if (averagePayables === 0) return 0;
  return costOfGoodsSold / averagePayables;
}

/**
 * Calculate Days Payable Outstanding (DPO)
 * Formula: 365 / Payables Turnover Ratio
 * Average days company takes to pay suppliers
 *
 * @param costOfGoodsSold - COGS
 * @param averagePayables - Average accounts payable
 * @returns Days payable outstanding
 */
export function calculateDaysPayableOutstanding(costOfGoodsSold: number, averagePayables: number): number {
  const turnover = calculatePayablesTurnover(costOfGoodsSold, averagePayables);
  if (turnover === 0) return 0;
  return 365 / turnover;
}

/**
 * Calculate Cash Conversion Cycle
 * Formula: DIO + DSO - DPO
 * Measures how efficiently working capital is managed
 * Lower is better (negative can indicate favorable terms)
 *
 * @param daysInventoryOutstanding - DIO
 * @param daysSalesOutstanding - DSO
 * @param daysPayableOutstanding - DPO
 * @returns Cash conversion cycle in days
 */
export function calculateCashConversionCycle(
  daysInventoryOutstanding: number,
  daysSalesOutstanding: number,
  daysPayableOutstanding: number
): number {
  return daysInventoryOutstanding + daysSalesOutstanding - daysPayableOutstanding;
}

/**
 * Calculate Year-over-Year Growth
 * Formula: ((Current Period - Prior Period) / Prior Period) * 100
 *
 * @param currentValue - Current period value
 * @param priorValue - Prior period value
 * @returns YoY growth percentage
 */
export function calculateYoYGrowth(currentValue: number, priorValue: number): number {
  if (priorValue === 0) return currentValue > 0 ? 100 : 0;
  return ((currentValue - priorValue) / Math.abs(priorValue)) * 100;
}

/**
 * Calculate Month-over-Month Growth
 * Formula: ((Current Month - Prior Month) / Prior Month) * 100
 *
 * @param currentValue - Current month value
 * @param priorValue - Prior month value
 * @returns MoM growth percentage
 */
export function calculateMoMGrowth(currentValue: number, priorValue: number): number {
  if (priorValue === 0) return currentValue > 0 ? 100 : 0;
  return ((currentValue - priorValue) / Math.abs(priorValue)) * 100;
}

/**
 * Calculate Budget Variance
 * Formula: Actual - Budget
 * Positive variance = under budget (favorable)
 * Negative variance = over budget (unfavorable)
 *
 * @param actual - Actual amount spent/earned
 * @param budgeted - Budgeted amount
 * @returns Variance amount
 */
export function calculateBudgetVariance(actual: number, budgeted: number): number {
  return budgeted - actual;
}

/**
 * Calculate Budget Variance Percentage
 * Formula: (Variance / Budget) * 100
 *
 * @param actual - Actual amount
 * @param budgeted - Budgeted amount
 * @returns Variance percentage
 */
export function calculateBudgetVariancePercent(actual: number, budgeted: number): number {
  if (budgeted === 0) return 0;
  return ((budgeted - actual) / budgeted) * 100;
}

/**
 * Calculate Working Capital
 * Formula: Current Assets - Current Liabilities
 * Measures short-term financial health
 *
 * @param currentAssets - Current assets
 * @param currentLiabilities - Current liabilities
 * @returns Working capital
 */
export function calculateWorkingCapital(currentAssets: number, currentLiabilities: number): number {
  return currentAssets - currentLiabilities;
}

/**
 * Calculate Operating Cash Flow Margin
 * Formula: (Operating Cash Flow / Revenue) * 100
 *
 * @param operatingCashFlow - Operating cash flow
 * @param revenue - Total revenue
 * @returns Operating cash flow margin percentage
 */
export function calculateOperatingCashFlowMargin(operatingCashFlow: number, revenue: number): number {
  if (revenue === 0) return 0;
  return (operatingCashFlow / revenue) * 100;
}

/**
 * Calculate Free Cash Flow
 * Formula: Operating Cash Flow - Capital Expenditures
 * Cash available after maintaining/expanding asset base
 *
 * @param operatingCashFlow - Operating cash flow
 * @param capitalExpenditures - Capital expenditures
 * @returns Free cash flow
 */
export function calculateFreeCashFlow(operatingCashFlow: number, capitalExpenditures: number): number {
  return operatingCashFlow - capitalExpenditures;
}

/**
 * Calculate DuPont Analysis Component - ROE Decomposition
 * ROE = Net Profit Margin × Asset Turnover × Equity Multiplier
 *
 * @param netMargin - Net profit margin (%)
 * @param assetTurnover - Asset turnover ratio
 * @param equityMultiplier - Equity multiplier (Assets/Equity)
 * @returns ROE from DuPont analysis
 */
export function calculateDuPontROE(netMargin: number, assetTurnover: number, equityMultiplier: number): number {
  return (netMargin / 100) * assetTurnover * equityMultiplier;
}

/**
 * Calculate Breakeven Point (units)
 * Formula: Fixed Costs / (Price per Unit - Variable Cost per Unit)
 *
 * @param fixedCosts - Total fixed costs
 * @param pricePerUnit - Selling price per unit
 * @param variableCostPerUnit - Variable cost per unit
 * @returns Units needed to breakeven
 */
export function calculateBreakEvenUnits(
  fixedCosts: number,
  pricePerUnit: number,
  variableCostPerUnit: number
): number {
  const contributionMargin = pricePerUnit - variableCostPerUnit;
  if (contributionMargin === 0) return 0;
  return fixedCosts / contributionMargin;
}

/**
 * Calculate Breakeven Point (revenue)
 * Formula: (Fixed Costs / Contribution Margin Ratio)
 *
 * @param fixedCosts - Total fixed costs
 * @param contributionMarginRatio - (Price - Variable Cost) / Price
 * @returns Revenue needed to breakeven
 */
export function calculateBreakEvenRevenue(fixedCosts: number, contributionMarginRatio: number): number {
  if (contributionMarginRatio === 0) return 0;
  return fixedCosts / contributionMarginRatio;
}
