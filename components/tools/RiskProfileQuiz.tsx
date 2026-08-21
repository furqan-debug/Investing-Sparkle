'use client';

import { useState } from 'react';
import { RotateCcw, MessageCircle, ArrowRight } from 'lucide-react';
import { whatsappLink, whatsappMessages } from '@/content/whatsapp';
import { Newsletter } from '@/components/Newsletter';
import { cn } from '@/lib/cn';

/**
 * Risk Profile Quiz — the highest-converting lead magnet in the plan.
 *
 * Scoring is deliberately transparent: every option carries a visible weight,
 * the total is shown with the result, and the bands are stated. A quiz that
 * hides its logic is a personality test, not a risk assessment.
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
      { label: "I buy it. A good tip is a good tip", score: 1 },
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
      nextStep: 'Start with our free material and the bootcamp. Advisory can wait.',
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
      nextStep: 'The bootcamp is the right fit. A Launchpad call helps if you want a plan built with you.',
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
      nextStep: 'The bootcamp will sharpen your analysis. Membership suits you if you want accountability.',
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
    nextStep: 'Focus on the fundamental analysis material. Membership works if you want a second opinion on your reasoning.',
  };
}

export function RiskProfileQuiz() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const complete = answeredCount === questions.length;
  const score = Object.values(answers).reduce((a, b) => a + b, 0);

  function reset() {
    setAnswers({});
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (submitted && complete) {
    const profile = profileFor(score);

    return (
      <div className="rounded-3xl border border-line bg-white p-7 md:p-10">
        <p className="eyebrow text-green-600">Your result</p>
        <h2 className="h2 mt-3">{profile.name}</h2>

        <p className="mt-2 text-sm text-muted">
          Score: {score} out of {MAX}
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">{profile.summary}</p>

        <h3 className="mt-8 font-sans text-lg font-semibold text-ink">What this means for you</h3>
        <ul className="mt-4 space-y-3">
          {profile.guidance.map((g) => (
            <li key={g} className="flex gap-3 text-sm leading-relaxed text-ink">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" aria-hidden />
              {g}
            </li>
          ))}
        </ul>

        <p className="mt-7 rounded-2xl bg-green-50 p-5 text-sm leading-relaxed text-green-800">
          <span className="font-semibold">Suggested next step: </span>
          {profile.nextStep}
        </p>

        <div className="mt-8 rounded-2xl border border-line bg-paper p-6">
          <Newsletter compact />
          <p className="mt-3 text-xs text-muted">
            Get the weekly email: one PSX explainer, one market update. Unsubscribe in one click.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappLink(whatsappMessages.riskProfileResult)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-green-950 hover:bg-[#1eb857]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden /> Discuss my result on WhatsApp
          </a>
          <a
            href="/learn/bootcamp"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-green-800 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700"
          >
            See the bootcamp <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-line px-6 py-3 text-sm font-semibold text-ink hover:bg-paper"
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
    <div className="rounded-3xl border border-line bg-white p-7 md:p-10">
      {/* Progress */}
      <div className="mb-8">
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

      <ol className="space-y-9">
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
                        'flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 text-sm transition-colors',
                        selected
                          ? 'border-green-600 bg-green-50 text-ink'
                          : 'border-line hover:border-green-300'
                      )}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={opt.score}
                        checked={selected}
                        onChange={() => setAnswers((a) => ({ ...a, [q.id]: opt.score }))}
                        className="h-4 w-4 accent-green-700"
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
        onClick={() => setSubmitted(true)}
        disabled={!complete}
        className="mt-9 w-full rounded-full bg-sparkle-400 px-7 py-3.5 font-semibold text-green-950 transition-colors hover:bg-sparkle-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {complete ? 'See my risk profile' : `Answer all ${questions.length} questions to continue`}
      </button>
    </div>
  );
}
