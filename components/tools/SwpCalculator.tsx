'use client';

import { useMemo, useState } from 'react';

import { ResultPanel, ToolFooter } from './CalculatorShell';
import {
  AssumptionNote,
  Breakdown,
  MiniStat,
  NumberField,
  ToolGrid,
  ToolPanel,
  WarningNote,
} from './ToolUI';
import { sustainableWithdrawal, swp } from '@/lib/growth';
import { formatPKR, formatPct } from '@/lib/format';

function durationLabel(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const yearPart = years > 0 ? `${years} ${years === 1 ? 'year' : 'years'}` : '';
  const monthPart = rest > 0 ? `${rest} ${rest === 1 ? 'month' : 'months'}` : '';
  return [yearPart, monthPart].filter(Boolean).join(' ') || '0 months';
}

/**
 * A systematic withdrawal plan, simulated month by month. The headline is how
 * long the money lasts, not what it is worth on day one.
 */
export function SwpCalculator() {
  const [corpus, setCorpus] = useState(5_000_000);
  const [annualRate, setAnnualRate] = useState(10);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(50_000);
  const [years, setYears] = useState(20);

  const result = useMemo(
    () =>
      swp({
        corpus,
        annualRate: annualRate / 100,
        monthlyWithdrawal,
        years,
      }),
    [corpus, annualRate, monthlyWithdrawal, years]
  );

  const sustainable = useMemo(
    () => sustainableWithdrawal({ corpus, annualRate: annualRate / 100, years }),
    [corpus, annualRate, years]
  );

  const schedule = useMemo(() => {
    const rows = result.schedule;
    if (rows.length <= 12) return rows;
    const step = Math.ceil(rows.length / 12);
    return rows.filter((row, index) => index === 0 || index === rows.length - 1 || index % step === 0);
  }, [result.schedule]);

  const overdraw = monthlyWithdrawal > sustainable + 1;

  return (
    <ToolGrid>
      <div className="space-y-4">
        <ToolPanel
          title="The plan"
          intro="A fixed amount taken out every month, from a corpus that stays invested. The return is an assumption, not a promise."
        >
          <NumberField
            id="swp-corpus"
            label="Starting corpus"
            value={corpus}
            set={setCorpus}
            step={100_000}
            prefix="PKR"
            hint="The amount invested on day one."
          />
          <NumberField
            id="swp-rate"
            label="Assumed annual return"
            value={annualRate}
            set={setAnnualRate}
            step={0.5}
            prefix="%"
            hint="Applied monthly. A constant return flatters a real portfolio, especially one being drawn down."
          />
          <NumberField
            id="swp-withdrawal"
            label="Withdrawn every month"
            value={monthlyWithdrawal}
            set={setMonthlyWithdrawal}
            step={5_000}
            prefix="PKR"
          />
          <NumberField
            id="swp-years"
            label="Planning horizon"
            value={years}
            set={setYears}
            step={1}
            prefix="Years"
            hint="The tool stops at the horizon even if money remains."
          />
        </ToolPanel>

        {overdraw ? (
          <WarningNote>
            At PKR {formatPKR(monthlyWithdrawal)} a month, the corpus runs out before the horizon. A
            withdrawal of about PKR {formatPKR(sustainable)} a month would last the full {years}{' '}
            years at this assumed return.
          </WarningNote>
        ) : (
          <AssumptionNote>
            This withdrawal is below the amount that exhausts the corpus at the horizon, so a balance
            remains. That surplus is the margin against a lower return or a longer life.
          </AssumptionNote>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <ResultPanel
          eyebrow={
            result.exhausted
              ? 'The corpus runs out after'
              : `Balance after ${years} ${years === 1 ? 'year' : 'years'}`
          }
          headline={
            result.exhausted
              ? durationLabel(result.monthsLasted)
              : `PKR ${formatPKR(result.finalBalance)}`
          }
          sub={`PKR ${formatPKR(monthlyWithdrawal)} a month from PKR ${formatPKR(corpus)} at ${annualRate}% a year.`}
          rows={[
            { label: 'Total withdrawn', value: `PKR ${formatPKR(result.totalWithdrawn)}`, accent: true },
            { label: 'Money left', value: `PKR ${formatPKR(result.finalBalance)}` },
            { label: 'Sustainable monthly', value: `PKR ${formatPKR(sustainable)}` },
            { label: 'Withdrawal rate', value: formatPct(corpus > 0 ? (monthlyWithdrawal * 12) / corpus : 0) },
          ]}
        />

        <div className="grid grid-cols-2 gap-2">
          <MiniStat label="Months covered" value={String(result.monthsLasted)} />
          <MiniStat
            label="Withdrawal vs sustainable"
            value={formatPct(sustainable > 0 ? monthlyWithdrawal / sustainable : 0)}
          />
        </div>

        <div className="rounded-2xl border border-line bg-white/[0.018] p-5 md:p-6">
          <h2 className="font-sans text-base font-semibold text-ink">Balance path</h2>
          <p className="mt-1 text-xs text-muted">All figures in PKR. Withdrawn is cumulative.</p>

          <div className="mono-label mt-4 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-2 text-[10px]">
            <span>Point</span>
            <span className="text-right">Balance</span>
            <span className="text-right">Withdrawn</span>
          </div>

          <div className="divide-y divide-line">
            {schedule.map((row, index) => (
              <div
                key={`${row.year}-${index}`}
                className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-2 py-2.5 text-[11px]"
              >
                <span className="text-muted">
                  {Number.isInteger(row.year) ? `Year ${row.year}` : 'Final'}
                </span>
                <span className="num text-right text-ink">{formatPKR(row.balance)}</span>
                <span className="num text-right text-ink">{formatPKR(row.withdrawn)}</span>
              </div>
            ))}
          </div>
        </div>

        <Breakdown
          title="The two limits"
          rows={[
            { label: 'Your monthly withdrawal', value: `PKR ${formatPKR(monthlyWithdrawal)}` },
            { label: 'Sustainable for the horizon', value: `PKR ${formatPKR(sustainable)}`, accent: true },
            { label: 'Annual withdrawal rate', value: formatPct(corpus > 0 ? (monthlyWithdrawal * 12) / corpus : 0) },
            { label: 'Monthly return used', value: formatPct(result.monthlyRate, 3) },
          ]}
        />

        <ToolFooter
          calculatorName="SWP Calculator"
          disclaimer="A constant return is the biggest simplification here. Real portfolios fall as well as rise, and withdrawals during a fall lock in the loss. The result also ignores tax on withdrawals, fund expenses and inflation, which raises the amount you need each year."
        />
      </div>
    </ToolGrid>
  );
}
