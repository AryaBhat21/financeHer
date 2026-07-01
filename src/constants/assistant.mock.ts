/**
 * assistant.mock.ts — Mock data for the FinanceHer AI Assistant
 *
 * AI INTEGRATION POINT: Replace all exports with live API calls from
 * `src/services/assistant.service.ts` when the Gemini backend is ready.
 * Type contracts remain stable — only the data source changes.
 *
 *   MOCK_MESSAGES          → POST /api/assistant/message (streamed)
 *   MOCK_CONVERSATION_HISTORY → GET /api/assistant/history
 *   MOCK_AI_RECOMMENDATIONS → GET /api/assistant/insights
 *   MOCK_SUGGESTED_PROMPTS  → GET /api/assistant/prompts (or static)
 */

import type {
  AIMessage,
  ConversationSession,
  SuggestedPrompt,
  AIRecommendation,
} from '@/types/assistant';

// ─── Initial Chat Thread ──────────────────────────────────────────────────────

export const MOCK_MESSAGES: AIMessage[] = [
  {
    id: 'msg_001',
    role: 'assistant',
    content:
      "Hello! I've been monitoring your portfolio and recent spending. You've successfully saved **12% more** than last month — great progress on your Emergency Fund goal!\n\nIs there anything specific you'd like to dive into today? I can help you analyse your rent burden, check your goal progress, or explain concepts like index funds and the 50/30/20 rule.",
    timestamp: '2026-07-01T09:41:00Z',
    displayTime: '9:41 AM',
    isAIGenerated: false,
  },
  {
    id: 'msg_002',
    role: 'user',
    content:
      "Can you analyse my rent? I'm worried it's taking up too much of my monthly income since the last increase.",
    timestamp: '2026-07-01T09:42:00Z',
    displayTime: '9:42 AM',
    isAIGenerated: false,
  },
  {
    id: 'msg_003',
    role: 'assistant',
    content:
      'Of course. Based on your linked accounts, your current monthly rent is **₹24,500** while your net income is **₹68,000**. This puts your rent-to-income ratio at **36%**.\n\nThe 50/30/20 rule recommends keeping housing under **30%** of net income. You are **6% over the guideline**. Should we look at trimming your "Wants" category to rebalance?',
    timestamp: '2026-07-01T09:42:20Z',
    displayTime: '9:42 AM',
    card: {
      type: 'metric',
      title: 'Rent-to-Income Ratio',
      data: {
        value: 36,
        recommended: 30,
        status: 'Slightly Over Budget',
        statusSeverity: 'warning',
        currentRent: 24500,
        monthlyIncome: 68000,
      },
    },
    actions: [
      {
        id: 'act_001',
        label: 'Trim my budget',
        icon: 'calculate',
        promptText: 'Show me where I can cut spending to bring my rent ratio under 30%',
      },
      {
        id: 'act_002',
        label: 'Adjust Goals',
        icon: 'savings',
        promptText: 'How should I adjust my savings goals given my rent situation?',
      },
    ],
    isAIGenerated: false,
  },
  {
    id: 'msg_004',
    role: 'user',
    content: 'Which budget framework suits me best?',
    timestamp: '2026-07-01T09:45:00Z',
    displayTime: '9:45 AM',
    isAIGenerated: false,
  },
  {
    id: 'msg_005',
    role: 'assistant',
    content:
      "Based on your income of ₹68,000/month and your 6 active financial goals, I'd recommend the **50/30/20 framework** as your foundation — with a twist.\n\nYour current split looks like this:",
    timestamp: '2026-07-01T09:45:30Z',
    displayTime: '9:45 AM',
    card: {
      type: 'comparison',
      title: 'Your Budget vs 50/30/20',
      data: {
        needsActual: 58,
        needsTarget: 50,
        wantsActual: 22,
        wantsTarget: 30,
        savingsActual: 20,
        savingsTarget: 20,
      },
    },
    actions: [
      {
        id: 'act_003',
        label: 'See full breakdown',
        icon: 'pie_chart',
        promptText: 'Give me a full breakdown of my spending across all categories',
      },
      {
        id: 'act_004',
        label: 'Set budget targets',
        icon: 'tune',
        promptText: 'Help me set monthly budget targets for each category',
      },
    ],
    isAIGenerated: false,
  },
];

// ─── Conversation History ─────────────────────────────────────────────────────

export const MOCK_CONVERSATION_HISTORY: ConversationSession[] = [
  {
    id: 'conv_001',
    title: 'Rent & Housing Analysis',
    lastMessageAt: '2026-07-01T09:45:00Z',
    displayDate: 'Today',
    preview: 'Your rent-to-income ratio is 36%, 6% over the recommended guideline...',
    messageCount: 5,
    category: 'budgeting',
  },
  {
    id: 'conv_002',
    title: 'Emergency Fund Projections',
    lastMessageAt: '2026-06-28T14:22:00Z',
    displayDate: 'Jun 28',
    preview: 'At ₹8,500/month you\'ll complete your emergency fund by January 2027...',
    messageCount: 8,
    category: 'goals',
  },
  {
    id: 'conv_003',
    title: 'Index Funds Explained',
    lastMessageAt: '2026-06-25T11:05:00Z',
    displayDate: 'Jun 25',
    preview: 'A NIFTY 50 index fund mirrors the top 50 companies on the NSE...',
    messageCount: 12,
    category: 'investing',
  },
  {
    id: 'conv_004',
    title: 'Dining Spend Spike — June',
    lastMessageAt: '2026-06-20T18:30:00Z',
    displayDate: 'Jun 20',
    preview: 'You spent ₹8,400 on dining in June — 3× your May average...',
    messageCount: 6,
    category: 'expenses',
  },
  {
    id: 'conv_005',
    title: 'Home Purchase Timeline',
    lastMessageAt: '2026-06-15T10:00:00Z',
    displayDate: 'Jun 15',
    preview: 'To meet your June 2029 deadline, increase monthly contribution to ₹22,000...',
    messageCount: 9,
    category: 'goals',
  },
];

// ─── Suggested Prompts ────────────────────────────────────────────────────────

export const MOCK_SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  {
    id: 'sp_001',
    label: 'How can I save more each month?',
    icon: 'savings',
    promptText: 'How can I save more each month based on my current spending?',
    category: 'budgeting',
  },
  {
    id: 'sp_002',
    label: 'Can I afford this purchase?',
    icon: 'shopping_cart',
    promptText: 'Can I afford a ₹15,000 purchase without hurting my savings goals?',
    category: 'budgeting',
  },
  {
    id: 'sp_003',
    label: 'Why did my financial score drop?',
    icon: 'trending_down',
    promptText: 'Why did my financial health score drop this month?',
    category: 'general',
  },
  {
    id: 'sp_004',
    label: 'Which budget framework suits me?',
    icon: 'balance',
    promptText: 'Which budget framework is best for my income and goals?',
    category: 'budgeting',
  },
  {
    id: 'sp_005',
    label: 'Analyse my dining spend',
    icon: 'restaurant',
    promptText: 'How much did I spend on dining last month and how does it compare?',
    category: 'expenses',
  },
  {
    id: 'sp_006',
    label: 'When will I hit my Home goal?',
    icon: 'home',
    promptText: 'When will I reach my Home Purchase goal at my current savings rate?',
    category: 'goals',
  },
  {
    id: 'sp_007',
    label: 'Explain index funds',
    icon: 'show_chart',
    promptText: 'Explain index funds in simple terms and how I can start investing',
    category: 'investing',
  },
  {
    id: 'sp_008',
    label: 'Review my subscriptions',
    icon: 'subscriptions',
    promptText: 'List all my recurring subscriptions and flag any I might not need',
    category: 'expenses',
  },
];

// ─── Proactive AI Recommendations ────────────────────────────────────────────

/**
 * AI INTEGRATION POINT: Replace with GET /api/assistant/insights.
 * Flip `isAIGenerated` to true when Gemini pipeline is connected.
 */
export const MOCK_AI_RECOMMENDATIONS: AIRecommendation[] = [
  {
    id: 'rec_001',
    title: 'Dining spend 3× above average',
    body: 'You spent ₹8,400 on dining in June — your highest ever. Cutting to ₹4,000 frees ₹4,400/month for your Home goal.',
    severity: 'warning',
    icon: 'restaurant',
    sourceModule: 'expenses',
    isAIGenerated: false,
  },
  {
    id: 'rec_002',
    title: 'Emergency Fund — final ₹50k',
    body: 'Only ₹50,000 remains. A one-time lump sum from your annual bonus could close it 3 months early.',
    severity: 'success',
    icon: 'health_and_safety',
    sourceModule: 'goals',
    isAIGenerated: false,
  },
  {
    id: 'rec_003',
    title: 'SIP top-up recommended',
    body: 'Your retirement corpus is 4% behind schedule. Increasing your SIP by ₹4,400/month gets you back on track.',
    severity: 'tip',
    icon: 'beach_access',
    sourceModule: 'goals',
    isAIGenerated: false,
  },
  {
    id: 'rec_004',
    title: 'Rent ratio above guideline',
    body: 'At 36%, your rent exceeds the 30% rule. Consider negotiating rent or exploring relocation options.',
    severity: 'warning',
    icon: 'home',
    sourceModule: 'budget',
    isAIGenerated: false,
  },
];
