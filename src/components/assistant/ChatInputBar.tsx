'use client';

import { type ChatInputState } from '@/types/assistant';
import { cn } from '@/lib/utils';

interface ChatInputBarProps {
  state: ChatInputState;
  onTextChange: (text: string) => void;
  onSend: () => void;
  onMicToggle: () => void;
}

/**
 * ChatInputBar — the sticky input area at the bottom of the chat.
 *
 * AI INTEGRATION POINT:
 *   `onSend`     → POST /api/assistant/message { text } → streamed AIMessage
 *   `onMicToggle`→ Web Speech API or Gemini Live Audio when available
 *
 * The component is purely presentational — all state lives in AssistantPage.
 */
export function ChatInputBar({
  state,
  onTextChange,
  onSend,
  onMicToggle,
}: ChatInputBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const isEmpty = !state.text.trim();

  return (
    <div className="flex items-end gap-3">
      {/* Textarea */}
      <div className="relative flex-1 group">
        <textarea
          id="chat-input"
          value={state.text}
          onChange={(e) => onTextChange(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Ask anything about your finances…"
          disabled={state.isSending}
          className="w-full resize-none bg-white dark:bg-dark-surface-container border border-outline-variant/30 dark:border-dark-outline-variant/30 rounded-2xl py-4 pl-5 pr-14 font-inter text-body-md text-on-surface dark:text-dark-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 dark:focus:ring-dark-primary/30 focus:border-primary dark:focus:border-dark-primary transition-all shadow-sm placeholder:text-on-surface-variant/40 dark:placeholder:text-dark-on-surface-variant/30 disabled:opacity-50 disabled:cursor-not-allowed leading-relaxed max-h-36 overflow-y-auto scrollbar-thin"
          aria-label="Type a message to the AI Financial Assistant"
          style={{ fieldSizing: 'content' } as React.CSSProperties}
        />
        {/* Attach button inside field */}
        <button
          className="absolute right-4 bottom-4 text-on-surface-variant/50 hover:text-primary dark:hover:text-dark-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none"
          aria-label="Attach a file"
          tabIndex={-1}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>attach_file</span>
        </button>
      </div>

      {/* Mic button */}
      <button
        onClick={onMicToggle}
        className={cn(
          'w-12 h-12 rounded-2xl flex items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-primary outline-none shrink-0',
          state.isRecording
            ? 'bg-[#853638] text-white shadow-lg animate-pulse'
            : 'bg-primary dark:bg-dark-primary text-white hover:scale-105 active:scale-95 shadow-md'
        )}
        aria-label={state.isRecording ? 'Stop recording' : 'Start voice input'}
        aria-pressed={state.isRecording}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: '20px', fontVariationSettings: state.isRecording ? "'FILL' 1" : "'FILL' 0" }}
          aria-hidden="true"
        >
          {state.isRecording ? 'mic_off' : 'mic'}
        </span>
      </button>

      {/* Send button */}
      <button
        onClick={onSend}
        disabled={isEmpty || state.isSending}
        className={cn(
          'w-12 h-12 rounded-2xl flex items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-primary outline-none shrink-0 shadow-md',
          isEmpty || state.isSending
            ? 'bg-surface-container dark:bg-dark-surface-container-high text-on-surface-variant/40 cursor-not-allowed'
            : 'bg-secondary-container dark:bg-dark-secondary-container text-on-secondary-container dark:text-dark-on-surface hover:scale-105 active:scale-95'
        )}
        aria-label="Send message"
      >
        {state.isSending ? (
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }} aria-hidden="true">
            send
          </span>
        )}
      </button>
    </div>
  );
}
