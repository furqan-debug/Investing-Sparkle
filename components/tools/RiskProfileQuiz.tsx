'use client';

import { useState } from 'react';
import { RotateCcw, MessageCircle, ArrowRight, Send } from 'lucide-react';

import { whatsappLink } from '@/content/whatsapp';
import { riskBlueprintMessage, type AllocationSlice } from '@/lib/tool-result';
import { useAuth } from '@/components/auth/AuthProvider';
import { cn } from '@/lib/cn';

/**
 * Risk Profile Quiz — the highest-converting lead magnet in the plan.
 *
 * Scoring is deliberately transparent: every option carries a visible weight,
 * the total is shown with the result, and the bands are stated. A quiz that
 * hides its logic is a personality test, not a risk assessment.
 *
 * The whole quiz sits behind the Google sign-in gate, so the result already has
 * a name and email attached. Revealing the result also hands it to WhatsApp in
 * the same click, which is the only moment a new tab is allowed to open.
 *
 * This is educational, not a regulated suitability assessment — the result copy
 * says so plainly.
 */

type Option = { label: string; score: number };
type Question = { id: string; question: string; options: Option[] };

const questions: Question[] = [
  {
    id: 'horizon',
    question: 'When do you expect to need this money back?',
    options: [
      { label: 'Within a year', score: 1 },
      { label: 'One to three years', score: 2 },
      { label: 'Three to seven years', score: 3 },
      { label: 'More than seven years', score: 4 },
    ],
  },
  {
    id: 'drawdown',
    question:
      'Your portfolio falls 25% over two months. Nothing has changed about the companies you own. What do you do?',
    options: [
      { label: 'Sell everything. I could not sit through that', score: 1 },
      { label: 'Sell some of it to stop the bleeding', score: 2 },
      { label: 'Hold and wait it out', score: 3 },
      { label: 'Buy more, if my original reasoning still holds', score: 4 },
    ],
  },
  {
    id: 'emergency',
    question: 'Do you have an emergency fund covering several months of expenses?',
    options: [
      { label: 'No emergency fund at all', score: 1 },
      { label: 'About one month', score: 2 },
      { label: 'Three to five months', score: 3 },
      { label: 'Six months or more', score: 4 },
    ],
  },
  {
    id: 'experience',
    question: 'How much investing experience do you have?',
    options: [
      { label: 'None. I have never bought a share', score: 1 },
      { label: 'I have bought a few things on tips', score: 2 },
      { label: 'I invest regularly and follow the market', score: 3 },
      { label: 'I analyse companies myself before buying', score: 4 },
    ],
  },
  {
    id: 'income',
    question: 'How stable is your income?',
    options: [
      { label: 'Irregular and hard to predict', score: 1 },
      { label: 'Variable but usually sufficient', score: 2 },
      { label: 'Stable salary or business income', score: 3 },
      { label: 'Stable, with surplus every month', score: 4 },
    ],
  },
  {
    id: 'proportion',
    question: 'What share of your total savings would go into the stock market?',
    options: [
      { label: 'Nearly all of it', score: 1 },
      { label: 'More than half', score: 2 },
      { label: 'Between a quarter and half', score: 3 },
      { label: 'Less than a quarter', score: 4 },
    ],
  },
  {
    id: 'goal',
    question: 'What are you actually trying to do?',
    options: [
      { label: 'Turn a small amount into a lot, quickly', score: 1 },
      { label: 'Earn more than my bank savings rate', score: 2 },
      { label: 'Build wealth steadily over years', score: 3 },
      { label: 'Build long-term wealth and accept the swings', score: 4 },
    ],
  },
  {
    id: 'reaction',
    question: 'Someone you trust tells you a stock is about to move. What happens next?',
    options: [
      { label: 'I buy it. A good tip is a good tip', score: 1 },
      { label: 'I buy a small amount to test it', score: 2 },
      { label: 'I look into the company before deciding', score: 3 },
      { label: 'I ignore it unless it passes my own criteria', score: 4 },
    ],
  },
];

const MIN = questions.length * 1;
const MAX = questions.length * 4;

type Profile = {
  name: string;
  summary: string;
  guidance: string[];
  nextStep: string;
  allocation: AllocationSlice[];
  allocationNote: string;
};

function profileFor(score: number): Profile {
  const pct = (score - MIN) / (MAX - MIN);

  if (pct < 0.3) {
    return {
      name: 'Conservative: not ready yet',
      summary:
        'Your answers suggest the groundwork is not in place. That is not a criticism; it is the most useful thing this quiz can tell you. Investing before the foundation is set is how people end up selling at the worst possible moment.',
      guidance: [
        'Build an emergency fund covering at least three to six months of expenses, in cash, before any of it goes into shares.',
        'Do not invest money you will need within the next three years.',
        'Spend the waiting time learning. It costs nothing and it is the part that compounds.',
        'Be especially wary of anyone promising quick returns while you are in this position.',
      ],
      nextStep: 'Start with our free material and the free live session. Advisory can wait.',
      allocation: [
        { label: 'PSX equities', percent: 5 },
        { label: 'Cash and emergency fund', percent: 70 },
        { label: 'Gold', percent: 15 },
        { label: 'Other funds and REITs', percent: 10 },
      ],
      allocationNote:
        'With no emergency fund, the cash sleeve is the priority. Treat the equity slice as tuition, not a growth engine, and do not add to it until the foundation is funded.',
    };
  }

  if (pct < 0.55) {
    return {
      name: 'Cautious beginner',
      summary:
        'You have some of the foundation in place but not all of it, and your instinct under pressure is still to sell. That is worth knowing before you invest, because it tells you how to size your positions.',
      guidance: [
        'Start smaller than you think you should. Your first drawdown teaches you more about your risk tolerance than any quiz.',
        'Favour established, dividend-paying companies you can research and understand.',
        'Decide in advance what would make you sell, and write it down before you buy.',
        'Avoid leverage and short-term trading entirely at this stage.',
      ],
      nextStep:
        'Our free live session is the right start. A Launchpad call helps if you want a plan built with you.',
      allocation: [
        { label: 'PSX equities', percent: 30 },
        { label: 'Cash, T-bills and money market', percent: 45 },
        { label: 'Gold', percent: 15 },
        { label: 'Other funds and REITs', percent: 10 },
      ],
      allocationNote:
        'Start at the smaller end of the equity range. Increase it only after you have held through a real drawdown without selling.',
    };
  }

  if (pct < 0.8) {
    return {
      name: 'Balanced investor',
      summary:
        'You have a reasonable foundation, a sensible time horizon, and enough composure to hold through a fall. That combination is most of what long-term investing actually requires.',
      guidance: [
        'Diversify across sectors rather than concentrating in the ones you know best.',
        'Set a review schedule (quarterly, or at results) instead of watching prices daily.',
        'Keep a written thesis for every holding, so you can tell a broken thesis from a falling price.',
        'Rebalance on a rule, not on a feeling.',
      ],
      nextStep: 'Our courses will sharpen your analysis. Membership suits you if you want accountability.',
      allocation: [
        { label: 'PSX equities', percent: 50 },
        { label: 'Cash, T-bills and money market', percent: 30 },
        { label: 'Gold', percent: 15 },
        { label: 'Other funds and REITs', percent: 5 },
      ],
      allocationNote:
        'Spread the equity sleeve across sectors and rebalance back to these weights once a year, not every month.',
    };
  }

  return {
    name: 'Growth-oriented',
    summary:
      'Long horizon, stable income, an emergency fund in place, and the temperament to buy when others are selling. The main risk for you is not fear: it is overconfidence.',
    guidance: [
      'Position sizing matters more than stock picking at your stage. One concentrated mistake undoes a lot of good decisions.',
      'Keep a written record of why you bought each holding, and review it honestly against what actually happened.',
      'Guard against confusing a rising market for skill.',
      'Diversification still applies to you, however strong your convictions feel.',
    ],
    nextStep:
      'Focus on the fundamental analysis material. Membership works if you want a second opinion on your reasoning.',
    allocation: [
      { label: 'PSX equities', percent: 70 },
      { label: 'Cash, T-bills and money market', percent: 15 },
      { label: 'Gold', percent: 10 },
      { label: 'Other funds and REITs', percent: 5 },
    ],
    allocationNote:
      'Concentration is the real risk here. Cap any single holding and keep the cash sleeve funded before adding to equities.',
  };
}

const sliceColors = [
  'bg-green-500',
  'bg-green-300/50',
  'bg-sparkle-400',
  'bg-white/25',
];

type Stage = 'quiz' | 'result';

export function RiskProfileQuiz() {
  const { user } = useAuth();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [stage, setStage] = useState<Stage>('quiz');
  const [handoff, setHandoff] = useState<{ link: string; autoOpened: boolean } | null>(null);

  const answeredCount = Object.keys(answers).length;
  const complete = answeredCount === questions.length;
  const score = Object.values(answers).reduce((a, b) => a + b, 0);
  const profile = profileFor(score);

  function buildMessage() {
    return riskBlueprintMessage({
      user,
      profile: profile.name,
      score,
      maxScore: MAX,
      allocation: profile.allocation,
    });
  }

  /**
   * Reveals the result and hands it to WhatsApp in the same click. Browsers
   * only allow a new tab during a user gesture, and this click is the one
   * moment the result is both final and tied to a real interaction.
   */
  function reveal() {
    const message = buildMessage();
    const link = whatsappLink(message);

    let autoOpened = false;
    try {
      const win = window.open(link, '_blank');
      if (win) {
        win.opener = null;
        autoOpened = true;
      }
    } catch {
      autoOpened = false;
    }

    // Fire and forget: the result must never wait on our inbox.
    void fetch('/api/tool-result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tool: 'risk-profile', result: message }),
      keepalive: true,
    }).catch(() => undefined);

    setHandoff({ link, autoOpened });
    setStage('result');
  }

  function reset() {
    setAnswers({});
    setStage('quiz');
    setHandoff(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (stage === 'result' && complete && handoff) {
    const link = handoff.link;

    return (
      <div
        id="risk-profile-result"
        className="animate-fade-in rounded-2xl border border-sparkle-400/20 bg-white/[0.025] p-5 md:p-7"
      >
        <p className="mono-label text-sparkle-300">Your personalised risk profile</p>
        <h2 className="h2 mt-3">{profile.name}</h2>

        <p className="mt-2 text-sm text-muted">
          Score: <span className="num text-ink">{score}</span> out of{' '}
          <span className="num text-ink">{MAX}</span>
        </p>

        <p className="mt-3 flex items-start gap-2 rounded-xl border border-green-500/25 bg-green-500/[0.06] p-3.5 text-xs leading-relaxed text-muted">
          <Send className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-400" aria-hidden />
          <span>
            {handoff.autoOpened
              ? 'WhatsApp opened with your blueprint ready to send. Press send there to keep a copy and get our reply.'
              : 'WhatsApp did not open automatically. Use the button below to send your blueprint.'}
          </span>
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">{profile.summary}</p>

        <div className="mt-8 rounded-2xl border border-line bg-paper p-5 md:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="mono-label text-sparkle-300">Asset allocation blueprint</p>
            <p className="text-xs text-muted">A starting point, not a recommendation</p>
          </div>

          <div className="mt-5 flex h-2.5 overflow-hidden rounded-full" aria-hidden>
            {profile.allocation.map((slice, index) => (
              <span
                key={slice.label}
                className={sliceColors[index % sliceColors.length]}
                style={{ width: `${slice.percent}%` }}
              />
            ))}
          </div>

          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {profile.allocation.map((slice, index) => (
              <li
                key={slice.label}
                className="flex items-center justify-between gap-3 rounded-xl border border-line/70 px-3.5 py-2.5"
              >
                <span className="flex min-w-0 items-center gap-2 text-sm text-ink">
                  <span
                    className={cn(
                      'h-2 w-2 shrink-0 rounded-full',
                      sliceColors[index % sliceColors.length]
                    )}
                    aria-hidden
                  />
                  {slice.label}
                </span>
                <span className="num text-sm text-sparkle-300">{slice.percent}%</span>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs leading-relaxed text-muted">{profile.allocationNote}</p>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            This ignores your existing holdings, tax position, and any Shariah screening you follow.
            Apply those before acting on it.
          </p>
        </div>

        <h3 className="mt-8 font-sans text-lg font-semibold text-ink">What this means for you</h3>
        <ul className="mt-4 space-y-3">
          {profile.guidance.map((g) => (
            <li key={g} className="flex gap-3 text-sm leading-relaxed text-ink">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" aria-hidden />
              {g}
            </li>
          ))}
        </ul>

        <p className="mt-7 rounded-2xl border border-sparkle-400/25 bg-sparkle-400/[0.05] p-5 text-sm leading-relaxed text-muted">
          <span className="font-semibold text-sparkle-300">Suggested next step: </span>
          {profile.nextStep}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn--secondary btn--md">
            <MessageCircle className="h-4 w-4 text-green-400" aria-hidden /> Send my blueprint on
            WhatsApp
          </a>
          <a href="/live" className="btn btn--primary btn--md">
            Join the free live session <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-white/20 hover:bg-white/[0.04]"
          >
            <RotateCcw className="h-4 w-4" aria-hidden /> Retake
          </button>
        </div>

        <p className="mt-7 border-t border-line pt-5 text-xs leading-relaxed text-muted">
          This quiz is educational. It is not a regulated suitability assessment, and it does not
          account for your full financial circumstances. We are not licensed investment advisors
          under the SECP.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-5 md:p-7">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-ink">
            {answeredCount} of {questions.length} answered
          </span>
          <span className="text-muted">Takes about two minutes</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-green-600 transition-all duration-300"
            style={{ width: `${(answeredCount / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <ol className="space-y-7">
        {questions.map((q, qi) => (
          <li key={q.id}>
            <fieldset>
              <legend className="font-sans text-base font-semibold text-ink md:text-lg">
                <span className="mr-2 text-green-600">{qi + 1}.</span>
                {q.question}
              </legend>
              <div className="mt-4 grid gap-2.5">
                {q.options.map((opt) => {
                  const selected = answers[q.id] === opt.score;
                  return (
                    <label
                      key={opt.label}
                      className={cn(
                        'flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors',
                        selected
                          ? 'border-sparkle-400/60 bg-sparkle-400/[0.08] text-ink'
                          : 'border-line hover:border-white/20 hover:bg-white/[0.03]'
                      )}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={opt.score}
                        checked={selected}
                        onChange={() => setAnswers((a) => ({ ...a, [q.id]: opt.score }))}
                        className="h-4 w-4 accent-sparkle-400"
                      />
                      {opt.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>

      <button
        onClick={reveal}
        disabled={!complete}
        className="btn btn--primary btn--lg mt-8 w-full disabled:cursor-not-allowed"
      >
        {complete ? 'See my risk profile' : `Answer all ${questions.length} questions to continue`}
      </button>

      {complete && (
        <p className="mt-3 text-center text-xs text-muted">
          Your blueprint opens in WhatsApp at the same time, ready to send to our team.
        </p>
      )}
    </div>
  );
}
