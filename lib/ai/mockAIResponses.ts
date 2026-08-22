/**
 * Mock AI Responses
 * Realistic, data-backed responses to common financial questions
 * Each response includes citations with data freshness indicators
 */

/**
 * Response to questions about overall company performance and health
 */
export function respondToPerformance(): string {
  return `Your company is showing strong financial health overall. Revenue is up 12.4% month-over-month,
driven primarily by sales growth in the Dubai and Abu Dhabi markets. However, I'm noticing that operating
expenses have increased 8.7%, mainly due to payroll expansion and marketing investments.

Key metrics:
- YTD revenue growth: 18.2%
- Net profit margin: 9.1% (improved from 8.2% last month)
- Cash position: Strong and positive for the next 90 days

Based on current trends, I'd recommend monitoring expense growth to ensure it remains aligned with revenue
increases. The ratio of expense growth to revenue growth is currently at 0.7x, which is healthy, but could
accelerate if we're not careful.

*Based on financial data, updated 2 hours ago*`;
}

/**
 * Response to questions about expense changes and trends
 */
export function respondToExpenses(): string {
  return `Your expenses are increasing, but the growth pattern is still sustainable. Here's the breakdown:

**Major Cost Drivers:**
- Payroll: Up 9.2%, accounting for 42% of total expenses (represents expansion of the team)
- Marketing: Up 15%, driven by Q4 campaign preparations
- Operations: Stable at +3% increase

**Areas of Concern:**
- 3 AP invoices are 30+ days overdue (245,000 AED total), which needs immediate attention
- Discretionary spending shows a concerning 18% increase

**Optimization Opportunities:**
- Renegotiated supplier contracts could save 6-8% on COGS (approximately 180,000 AED annually)
- Process automation in payroll could reduce administrative costs by 8-12%
- Marketing ROI analysis suggests potential 10-12% efficiency gain through channel optimization

Overall, while expenses are growing, they remain proportional to revenue growth. The key is maintaining
this balance as you scale.

*Based on expense and procurement data, updated 1 hour ago*`;
}

/**
 * Response to questions about branch or department profitability
 */
export function respondToTopBranch(): string {
  return `Here's how your branches are performing:

**Revenue Contribution:**
1. Dubai: 43% of total revenue (AED 2.1M) - Growth rate: 18%
2. Abu Dhabi: 38% of total revenue (AED 1.9M) - Growth rate: 12%
3. Sharjah: 19% of total revenue (AED 0.95M) - Growth rate: 8%

**Profitability Performance:**
1. Abu Dhabi: Highest margin at 12.3% - More efficient operations
2. Dubai: 9.8% margin - High volume, strong growth
3. Sharjah: 8.1% margin - Needs operational improvement

**Strategic Insights:**
- Dubai is your growth engine - consider increasing investment there
- Abu Dhabi has superior operational efficiency - study their processes for other branches
- Sharjah has untapped potential - operational improvements could increase margin to 10%+

The Dubai branch, while generating the most revenue, operates at lower margins due to competitive pricing.
Consider whether premium positioning might be viable in that market to improve profitability.

*Based on branch P&L data, updated 3 hours ago*`;
}

/**
 * Response to questions about overdue accounts receivable
 */
export function respondToOverdueAR(): string {
  return `Your AR situation is healthy overall, but there are some items requiring attention:

**Current Status:**
- Total AR: AED 1.2M
- Collection rate: 94% (improved by 2 points from last month - excellent improvement!)
- Days Sales Outstanding (DSO): 32 days (down from 37 days)

**Overdue Items (30+ days):**
1. Customer ABC Corp: AED 125,000 (45 days overdue) - Last contact: 5 days ago
2. XYZ Trading: AED 78,000 (38 days overdue) - Payment promised for next week
3. Premium Solutions LLC: AED 52,000 (32 days overdue) - Dispute on invoice amount

**Recommendations:**
- Follow up on the ABC Corp invoice - this is your largest overdue balance
- Verify dispute with Premium Solutions - may be resolved quickly
- The overall trend is very positive - your collection efforts are working

Current trajectory suggests you could reach 96% collection rate by end of quarter if current collection
efforts continue at this pace. This would be a significant achievement.

*Based on AR aging data, updated 2 hours ago*`;
}

/**
 * Response to month-over-month or period comparison questions
 */
export function respondToComparison(): string {
  return `Here's how this month compares to last month:

**Revenue Comparison:**
- Last month: AED 1.68M
- This month: AED 1.89M
- Change: +12.4% (AED 210K increase)

**Expense Comparison:**
- Last month: AED 1.54M
- This month: AED 1.67M
- Change: +8.4% (AED 130K increase)

**Profit Comparison:**
- Last month: AED 140K (8.2% margin)
- This month: AED 220K (9.1% margin)
- Change: +57% profit growth

**Key Drivers:**
- Sales increased across all three branches, with Dubai leading at +18%
- Marketing investments increased but contributed to revenue growth
- Operational efficiency improved, evidenced by rising margins

**Bottom Line:**
This is a very strong month. Not only is revenue growing, but profit is growing faster due to improved
operational efficiency. This is the healthiest pattern - your business is scaling profitably.

*Based on comparative monthly P&L, updated 2 hours ago*`;
}

/**
 * Response to cash position and liquidity questions
 */
export function respondToCashPosition(): string {
  return `Your cash position is solid and provides good financial flexibility:

**Current Cash Status:**
- Available cash: AED 450K
- Projected 30-day cash position: AED 520K (positive)
- Projected 90-day cash position: AED 480K (positive)

**Cash Inflows (next 90 days):**
- Expected AR collections: AED 1.1M
- Other operating inflows: AED 180K
- Total: AED 1.28M

**Cash Outflows (next 90 days):**
- Payables due: AED 890K
- Payroll: AED 210K
- Other operational: AED 120K
- Total: AED 1.22M

**Working Capital Efficiency:**
- Cash conversion cycle improved by 5 days
- Current ratio: 1.8 (healthy - above 1.5 benchmark)
- Quick ratio: 1.5 (strong liquidity)

**Notable Pattern:**
Q4 historically shows 35% reduction in cash inflows due to seasonal factors. Start building reserves now
or consider establishing a credit line as a safety net.

**Recommendation:**
Your cash position is healthy, but don't become complacent. Maintain focus on AR collection and AP
management, especially heading into the seasonal Q4 period.

*Based on cash flow projections and balance sheet data, updated 1 hour ago*`;
}

/**
 * Response to budget variance and performance questions
 */
export function respondToBudget(): string {
  return `Your budget performance shows mixed results - some areas are excellent, others need attention:

**On Track (90-100% of budget):**
- Operations: 94% - Well controlled
- IT & Systems: 87% - Slightly under budget
- HR: 92% - Controlled hiring and recruitment

**At Risk (101-110% of budget):**
- Marketing: 115% - Over budget by 15% (AED 45K) due to Q4 campaign prep
- Facilities: 108% - Over budget for facility upgrades
- Professional Services: 105% - Additional consulting for system upgrade

**Over Budget (>110%):**
- None currently - good overall control

**Analysis:**
Marketing overage is intentional and tied to revenue growth strategy. The ROI on marketing spend is
tracking well - every AED 1 spent on marketing is generating AED 2.80 in incremental revenue.

**Recommendations:**
1. Continue marketing investment - ROI justifies the spend
2. Review facilities overage - determine if it's necessary or can be rescheduled
3. Maintain strict control on remaining discretionary spend for remainder of period

Overall budget adherence is at 97%, which is excellent.

*Based on budgeted vs actual data, updated 2 hours ago*`;
}

/**
 * Collection of all mock response functions for easy iteration
 */
export const MOCK_RESPONSES = {
  performance: respondToPerformance,
  expenses: respondToExpenses,
  topBranch: respondToTopBranch,
  overdueAR: respondToOverdueAR,
  comparison: respondToComparison,
  cashPosition: respondToCashPosition,
  budget: respondToBudget,
};

/**
 * Get a random mock response (for testing)
 */
export function getRandomMockResponse(): string {
  const responses = Object.values(MOCK_RESPONSES);
  const randomFunction = responses[Math.floor(Math.random() * responses.length)];
  return randomFunction();
}
