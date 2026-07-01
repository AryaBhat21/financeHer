'use client';

interface AIAssistantCardProps {
  insight?: string;
  suggestedPrompts?: string[];
}

const defaultPrompts = [
  'How can I save Rs. 200 more?',
  "Analyze last month's rent",
];

export function AIAssistantCard({
  insight = '"You spent Rs. 45 more on dining out than your weekend average. Should we adjust your weekend budget?"',
  suggestedPrompts = defaultPrompts,
}: AIAssistantCardProps) {
  return (
    <div className="bg-primary-container dark:bg-dark-primary-container p-6 rounded-xl shadow-[0_4px_20px_rgba(67,37,125,0.1)] dark:shadow-none text-white relative overflow-hidden group h-full flex flex-col justify-between">
      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-fixed dark:text-dark-primary text-2xl" aria-hidden="true">
            smart_toy
          </span>
          <h3 className="font-poppins text-headline-md font-semibold">
            Finance Assistant
          </h3>
        </div>
        <p className="font-inter text-body-sm text-on-primary-container dark:text-dark-on-surface/90 italic leading-relaxed">
          {insight}
        </p>
      </div>

      <div className="relative z-10 mt-6 grid grid-cols-1 gap-2">
        {suggestedPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            className="bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/15 text-left px-4 py-3 rounded-lg text-white font-inter text-label-md font-semibold border border-white/10 dark:border-white/5 transition-all duration-150 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Abstract glowing circles for visual interest */}
      <div 
        className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none" 
        aria-hidden="true" 
      />
    </div>
  );
}
