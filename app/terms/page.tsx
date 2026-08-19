import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { site, paymentMethods } from '@/content/site';

export const metadata: Metadata = {
  title: 'Terms of service',
  description:
    'The terms governing our courses, bootcamps, and advisory services — what we provide, what we do not, and how disputes are handled.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of service" updated="2026-08-20">
      <p>
        These terms govern your use of this website and any course, bootcamp, or advisory service
        you purchase from {site.name}. By using the site or booking a service, you agree to them.
      </p>

      <h2>1. What we provide</h2>
      <p>
        We provide financial education — courses, live bootcamps, written material, and free tools —
        and advisory services consisting of coaching, risk profiling, written investment plans, and
        portfolio review.
      </p>

      <h2>2. What we do not provide</h2>
      <p>This is the most important clause in these terms, so it is stated plainly:</p>
      <ul>
        <li>
          We are not licensed investment advisors under the SECP, and nothing we provide is a
          personal investment recommendation.
        </li>
        <li>We do not manage investments or accept discretionary authority over any account.</li>
        <li>We do not execute trades on your behalf.</li>
        <li>We do not hold, receive, or take custody of client funds or securities.</li>
        <li>We do not provide specific stock recommendations in any service tier.</li>
        <li>We do not provide tax, accounting, or legal advice.</li>
      </ul>

      <h2>3. Your responsibilities</h2>
      <p>
        Every investment decision you make is yours. You are responsible for evaluating any
        framework or analysis we teach, for choosing your own brokerage, for the accuracy of the
        information you give us, and for the consequences of your own trades.
      </p>
      <p>
        You agree not to share, resell, record, or redistribute our course material, recordings, or
        templates without written permission.
      </p>

      <h2>4. Bookings and payment</h2>
      <p>
        Bookings are made through WhatsApp or email. Payment is accepted via{' '}
        {paymentMethods.join(', ')}. Your place is confirmed once payment has cleared. Prices are in
        Pakistani Rupees and may change for future cohorts, but never after you have paid.
      </p>

      <h2>5. Refunds</h2>
      <p>
        Refund terms differ by service and are set out in full on our{' '}
        <a href="/refund">refund policy page</a>, which forms part of these terms.
      </p>

      <h2>6. Cancellation and rescheduling by us</h2>
      <p>
        We may reschedule a session where necessary. If we do, you may take a place in the next
        cohort or receive a full refund, at your choice.
      </p>

      <h2>7. Conduct</h2>
      <p>
        Cohort WhatsApp groups and live sessions are for learning. We may remove anyone who
        solicits, promotes stock tips, shares others’ information, or harasses other participants —
        without refund where the behaviour is deliberate.
      </p>

      <h2>8. Intellectual property</h2>
      <p>
        All course material, slides, templates, tools, and written content remain our property. You
        receive a personal, non-transferable licence to use them for your own learning.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, we are not liable for investment losses, lost
        profits, or any indirect or consequential loss arising from your use of our material or
        services. Our total liability in respect of any service is limited to the amount you paid
        for that service.
      </p>
      <p>Nothing in these terms excludes liability for fraud or for anything that cannot lawfully be excluded.</p>

      <h2>10. Third parties</h2>
      <p>
        We are not responsible for the acts or omissions of brokers, payment providers, or other
        third parties you choose to deal with. We receive no commission or referral fee from any of
        them.
      </p>

      <h2>11. Changes to these terms</h2>
      <p>
        We may update these terms. The version in force when you book is the version that applies to
        that booking.
      </p>

      <h2>12. Governing law</h2>
      <p>
        These terms are governed by the laws of Pakistan, and the courts of Karachi have exclusive
        jurisdiction over any dispute.
      </p>

      <h2>13. Resolving problems</h2>
      <p>
        If something goes wrong, contact us first at{' '}
        <a href={`mailto:${site.contact.emailSupport}`}>{site.contact.emailSupport}</a>. We would
        much rather fix it directly than have either of us end up in a formal process.
      </p>
    </LegalPage>
  );
}
