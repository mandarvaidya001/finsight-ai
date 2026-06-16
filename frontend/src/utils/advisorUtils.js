export const categories = [
  { key: "food", label: "Food" },
  { key: "shopping", label: "Shopping" },
  { key: "transport", label: "Transport" },
  { key: "utilities", label: "Utilities" },
  { key: "entertainment", label: "Entertainment" },
  { key: "healthcare", label: "Healthcare" },
  { key: "other", label: "Other expenses" },
];

export function getExpenseDistribution(values) {
  const income = Number(values.income) || 0;
  return categories
    .map((item) => {
      const amount = Number(values[item.key]) || 0;
      return {
        name: item.label,
        key: item.key,
        amount,
        percentage: income > 0 ? (amount / income) * 100 : 0,
      };
    })
    .filter((item) => item.amount > 0);
}

export function getAdvisorOverview(values) {
  const income = Number(values.income) || 0;
  const totalExpenses = getExpenseDistribution(values).reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const netSavings = Math.max(income - totalExpenses, 0);
  const savingsRate = income > 0 ? (netSavings / income) * 100 : 0;
  const healthScore = Math.min(Math.max(savingsRate, 0), 100);

  return { income, totalExpenses, netSavings, savingsRate, healthScore };
}

export function getHealthStatus(score) {
  if (score <= 40) return { label: "Poor", color: "#ef4444" };
  if (score <= 60) return { label: "Average", color: "#f59e0b" };
  if (score <= 80) return { label: "Good", color: "#22c55e" };
  return { label: "Excellent", color: "#38bdf8" };
}

export function getLeakAnalysis(values) {
  const income = Number(values.income) || 0;
  return getExpenseDistribution(values).map((item) => {
    const percentage = income > 0 ? (item.amount / income) * 100 : 0;
    let risk = "Low";
    let color = "bg-emerald-500 text-emerald-950";
    if (percentage > 20) {
      risk = "High";
      color = "bg-rose-500 text-rose-950";
    } else if (percentage >= 10) {
      risk = "Medium";
      color = "bg-amber-400 text-slate-950";
    }
    return {
      ...item,
      percentage,
      risk,
      badgeClass: color,
    };
  });
}

export function getAnnualProjection(values) {
  const { income, totalExpenses, netSavings } = getAdvisorOverview(values);
  const annualIncome = income * 12;
  const annualExpenses = totalExpenses * 12;
  const annualSavings = netSavings * 12;
  const projection3 = annualSavings * 3;
  const projection5 = annualSavings * 5;

  return {
    annualIncome,
    annualExpenses,
    annualSavings,
    projection3,
    projection5,
  };
}

export function buildFinancialStory(values) {
  const { netSavings, savingsRate, healthScore } = getAdvisorOverview(values);
  const analysis = getExpenseDistribution(values).sort((a, b) => b.amount - a.amount);
  const topCategory = analysis[0];
  const annualSavings = Math.max(netSavings * 12, 0);
  const reduceTarget = topCategory ? Math.round(topCategory.amount * 0.15 * 12) : 0;

  return [
    `You saved ${savingsRate.toFixed(0)}% of your income this month.`,
    topCategory
      ? `${topCategory.name} is your largest expense category.`
      : "No spending categories were entered yet.",
    `If your current spending pattern continues, you could save approximately ₹${annualSavings.toLocaleString()} annually.`,
    topCategory
      ? `Reducing ${topCategory.name.toLowerCase()} expenses by 15% could increase yearly savings by approximately ₹${reduceTarget.toLocaleString()}.`
      : "Review your expenses to uncover new savings opportunities.",
    `Your current financial health is ${healthScore.toFixed(0)}% (${getHealthStatus(healthScore).label}).`,
  ];
}

export function getRecommendations(values) {
  const { savingsRate, totalExpenses, income } = getAdvisorOverview(values);
  const leaks = getLeakAnalysis(values)
    .filter((item) => item.risk === "High")
    .map((item) => `${item.name} is consuming too much of your income.`);

  const recommendations = [
    savingsRate < 20
      ? "Aim to save at least 20% of your income each month."
      : "You are on track to build a strong savings habit.",
    totalExpenses > income
      ? "Reduce non-essential categories to avoid overspending."
      : "Continue tracking your expenses regularly.",
    ...leaks,
  ];

  return recommendations.length ? recommendations : ["Keep your budget balanced and monitor variable expenses."];
}

export default {
  categories,
  getExpenseDistribution,
  getAdvisorOverview,
  getHealthStatus,
  getLeakAnalysis,
  getAnnualProjection,
  buildFinancialStory,
  getRecommendations,
};
