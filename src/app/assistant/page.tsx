'use client';

import { useState, useRef, useEffect } from 'react';
import { SidebarNav, DashboardFooter } from '@/components/dashboard';
import {
  ChatMessage,
  AIRecommendationsPanel,
  SuggestedPrompts,
  ConversationHistory,
  ChatInputBar,
} from '@/components/assistant';
import {
  MOCK_MESSAGES,
  MOCK_CONVERSATION_HISTORY,
  MOCK_SUGGESTED_PROMPTS,
  MOCK_AI_RECOMMENDATIONS,
} from '@/constants/assistant.mock';
import type { AIMessage, ChatInputState } from '@/types/assistant';
import { cn } from '@/lib/utils';

export default function AssistantPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>(MOCK_MESSAGES);
  const [activeSessionId, setActiveSessionId] = useState<string>('conv_001');

  const [inputState, setInputState] = useState<ChatInputState>({
    text: '',
    isRecording: false,
    isSending: false,
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSelectPrompt = (promptText: string) => {
    setInputState((prev) => ({ ...prev, text: promptText }));
  };

  const handleSend = () => {
    if (!inputState.text.trim() || inputState.isSending) return;

    const userText = inputState.text;
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    const userMessage: AIMessage = {
      id: `msg_user_${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp: now.toISOString(),
      displayTime: formattedTime,
      isAIGenerated: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputState((prev) => ({ ...prev, text: '', isSending: true }));

    // Mock AI reply (exact same pattern as dashboard chatbot widget stubs)
    setTimeout(() => {
      const aiMessage: AIMessage = {
        id: `msg_ai_${Date.now()}`,
        role: 'assistant',
        content: `I've received your query about: "${userText}". As this is the offline preview mode, I've noted down this prompt. Once the Gemini API connection is live, I will generate a context-aware financial response tailored to your profile.`,
        timestamp: new Date().toISOString(),
        displayTime: new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
        isAIGenerated: true,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setInputState((prev) => ({ ...prev, isSending: false }));
    }, 1000);
  };

  const handleMicToggle = () => {
    setInputState((prev) => {
      const nextRecording = !prev.isRecording;
      if (nextRecording) {
        // Mock recording start
        console.info('[AssistantPage] Speech recording started (mock)');
      } else {
        console.info('[AssistantPage] Speech recording stopped (mock)');
      }
      return { ...prev, isRecording: nextRecording };
    });
  };

  const handleSelectSession = (sessionId: string) => {
    setActiveSessionId(sessionId);
    // In a real app, this loads the messages for that session.
    // For this mock, we just reset to MOCK_MESSAGES to simulate a reload.
    setMessages(MOCK_MESSAGES);
    if (window.innerWidth < 1024) {
      setIsHistoryOpen(false);
    }
  };

  return (
    <div className="bg-background dark:bg-dark-background text-on-background dark:text-dark-on-background min-h-screen flex transition-colors duration-300">
      {/* ── Sidebar ───────────────────────────────────────────────── */}
      <SidebarNav isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* ── Main Canvas ────────────────────────────────────────────── */}
      <main className="flex-1 md:ml-64 flex flex-col h-screen relative overflow-hidden">
        {/* ── Top Bar ─────────────────────────────────────────────── */}
        <header className="flex justify-between items-center px-6 md:px-margin-desktop py-4 bg-white/70 dark:bg-dark-surface-container/70 backdrop-blur-md border-b border-outline-variant/20 dark:border-dark-outline-variant/20 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl bg-surface-container dark:bg-dark-surface-container-low text-on-surface-variant dark:text-dark-on-surface-variant hover:bg-surface-container-high dark:hover:bg-dark-surface-container-high transition-all active:scale-95 shrink-0"
              aria-label="Open navigation menu"
            >
              <span className="material-symbols-outlined" aria-hidden="true">menu</span>
            </button>
            <div>
              <h1 className="font-poppins text-headline-md text-primary dark:text-dark-primary font-bold">
                AI Financial Assistant
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                <span className="font-inter text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70 dark:text-dark-on-surface-variant/60">
                  Live Insight Engine
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            {/* History toggle (tablet/mobile and desktop context swap) */}
            <button
              onClick={() => setIsHistoryOpen((prev) => !prev)}
              className={cn(
                'p-2.5 rounded-xl border border-outline-variant/30 dark:border-dark-outline-variant/30 text-on-surface-variant dark:text-dark-on-surface-variant hover:bg-surface-container dark:hover:bg-dark-surface-container-high transition-all',
                isHistoryOpen && 'bg-primary/5 border-primary/30 text-primary dark:text-dark-primary'
              )}
              aria-label="Toggle chat history"
              aria-pressed={isHistoryOpen}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>history</span>
            </button>
          </div>
        </header>

        {/* ── Sub-layout: Split chat and side panels ─────────────────── */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Collapsible History Sidebar (Absolute on mobile/tablet, flex on wide screens) */}
          <div
            className={cn(
              'absolute inset-y-0 left-0 w-80 bg-background dark:bg-dark-background border-r border-outline-variant/20 dark:border-dark-outline-variant/20 p-4 transition-all duration-300 z-20 overflow-y-auto scrollbar-thin lg:relative lg:translate-x-0 lg:flex-shrink-0',
              isHistoryOpen ? 'translate-x-0' : '-translate-x-full lg:hidden lg:-mr-80'
            )}
          >
            <ConversationHistory
              sessions={MOCK_CONVERSATION_HISTORY}
              activeSessionId={activeSessionId}
              onSelect={handleSelectSession}
              onClose={() => setIsHistoryOpen(false)}
            />
          </div>

          {/* ── Chat Canvas ─────────────────────────────────────────── */}
          <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
            {/* Scrollable messages container */}
            <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-thin">
              {/* Disclaimer */}
              <div className="max-w-2xl mx-auto text-center px-5 py-3.5 bg-surface-container-low dark:bg-dark-surface-container-low rounded-2xl border border-outline-variant/20 dark:border-dark-outline-variant/20 mb-6">
                <span className="material-symbols-outlined text-primary dark:text-dark-primary text-xl mb-1" aria-hidden="true">
                  info
                </span>
                <p className="font-inter text-[11px] leading-relaxed text-on-surface-variant/80 dark:text-dark-on-surface-variant/70">
                  FinanceHer AI is an educational tool. Our responses are for informational purposes only and do not constitute professional financial, tax, or investment advice.
                </p>
              </div>

              {/* Messages feed */}
              <div className="space-y-6 max-w-3xl mx-auto" role="log" aria-label="Chat messages">
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} onActionClick={handleSelectPrompt} />
                ))}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Sticky input area */}
            <footer className="p-4 md:p-6 bg-white/90 dark:bg-dark-background/90 backdrop-blur-md border-t border-outline-variant/20 dark:border-dark-outline-variant/20 z-10 shrink-0">
              <div className="max-w-3xl mx-auto flex flex-col gap-4">
                {/* Horizontal prompts list */}
                <SuggestedPrompts prompts={MOCK_SUGGESTED_PROMPTS} onSelect={handleSelectPrompt} />

                {/* Input bar */}
                <ChatInputBar
                  state={inputState}
                  onTextChange={(text) => setInputState((prev) => ({ ...prev, text }))}
                  onSend={handleSend}
                  onMicToggle={handleMicToggle}
                />

                <p className="font-inter text-[10px] text-center text-on-surface-variant/50 dark:text-dark-on-surface-variant/40 leading-snug">
                  FinanceHer AI uses bank-grade encryption. Your conversations are private and never shared with third parties.
                </p>
              </div>
            </footer>
          </div>

          {/* Right-hand side panel — Proactive Insights (collapsible on smaller viewports) */}
          <div className="hidden xl:block w-80 shrink-0 border-l border-outline-variant/20 dark:border-dark-outline-variant/20 p-6 overflow-y-auto scrollbar-thin">
            <AIRecommendationsPanel recommendations={MOCK_AI_RECOMMENDATIONS} />
          </div>
        </div>
      </main>
    </div>
  );
}
