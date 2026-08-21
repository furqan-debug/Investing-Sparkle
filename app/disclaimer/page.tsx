import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description:
    'Our licensing status, the limits of what we provide, and the risks of investing in the stock market.',
  alternates: { canonical: '/disclaimer' },
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" updated="2026-08-20">
      <h2>Education, not investment advice</h2>
      <p>
        {site.name} provides financial education and general guidance. We are not licensed
        investment advisors under the Securities and Exchange Commission of Pakistan (SECP), and
        nothing on this website, in our courses, in our bootcamps, or in our advisory sessions
        constitutes a personal recommendation to buy, sell, or hold any security.
      </p>
      <p>
        Our material teaches frameworks for analysing companies and building portfolios. Applying
        those frameworks, and every resulting decision, is yours alone.
      </p>

      <h2>We do not handle your money</h2>
      <p>
        We do not manage client investments. We do not execute trades. We do not hold, receive, or
        take custody of client funds or securities at any time. We do not accept discretionary
        authority over any account, and we will never ask for your brokerage login credentials.
      </p>
      <p>
        All investment decisions and all executions are made by you, through your own brokerage
        account, at your own discretion.
      </p>

      <h2>No specific recommendations</h2>
      <p>
        We do not provide stock tips or specific buy and sell recommendations, in any service tier,
        at any price. Where a company is discussed in our material, it is used to illustrate a
        method of analysis, not as a suggestion to invest in it.
      </p>

      <h2>Market risk</h2>
      <p>
        Investing in the stock market carries risk, including the loss of principal. The value of
        investments can fall as well as rise, and you may get back less than you invested. Past
        performance does not guarantee or indicate future results.
      </p>
      <p>
        We make no representation, warranty, or guarantee about any level of return. Anyone who
        offers you one (including anyone claiming to represent us) is not telling you the truth.
      </p>

      <h2>Accuracy of information</h2>
      <p>
        We take care to be accurate, but market data, regulations, tax treatment, brokerage fee
        structures, and index constituents change. Information on this site may become out of date,
        and it is provided without warranty as to accuracy or completeness. Verify current figures,
        rules, and rates at source, or with a qualified professional, before acting on them.
      </p>

      <h2>Not tax or legal advice</h2>
      <p>
        Nothing here is tax, accounting, or legal advice. Tax treatment depends on your individual
        circumstances and on rules that change. Consult a qualified tax professional about your own
        position.
      </p>

      <h2>Third-party content</h2>
      <p>
        Links or references to third-party websites, brokers, or services are provided for
        convenience. We do not endorse them, we earn no commission or referral fee from them, and we
        are not responsible for their content or conduct.
      </p>

      <h2>Jurisdiction</h2>
      <p>
        This website and our services are directed at residents of Pakistan and are governed by the
        laws of Pakistan.
      </p>

      <h2>Questions</h2>
      <p>
        If anything here is unclear, write to{' '}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> and we will
        explain it in plain terms.
      </p>
    </LegalPage>
  );
}
