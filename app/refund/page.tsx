import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { site, refundPolicy, paymentMethods } from '@/content/site';

export const metadata: Metadata = {
  title: 'Refund policy',
  description:
    'Refund terms for bootcamps, courses, and each advisory service — stated explicitly, per service.',
  alternates: { canonical: '/refund' },
};

export default function RefundPage() {
  return (
    <LegalPage title="Refund policy" updated="2026-08-20">
      <p>
        Every service has its own refund terms, set out below. These are the same terms shown on the
        service pages — if you ever find a discrepancy between this page and another page on this
        site, tell us and the more generous term applies.
      </p>

      <h2>Bootcamps</h2>
      <p>{refundPolicy.bootcamp}</p>
      <p>
        If you cannot attend but do not want a refund, your seat is transferable to someone else at
        no charge. Tell us the replacement attendee’s name before the bootcamp starts.
      </p>

      <h2>Courses</h2>
      <p>
        Self-paced courses are refundable in full within 7 days of purchase, provided you have not
        completed more than the first module. After that point the material has been delivered and
        no refund is available.
      </p>

      <h2>Launchpad Advisory Call</h2>
      <p>{refundPolicy.launchpad}</p>
      <p>
        Once the session has taken place, the service has been delivered and no refund applies —
        including if you choose not to act on the plan.
      </p>

      <h2>Guided Start</h2>
      <p>{refundPolicy.guidedStart}</p>
      <p>
        “Prorated” means we refund the portion of the engagement not yet delivered, based on the
        stages completed. We will show you the calculation.
      </p>

      <h2>Sparkle Membership</h2>
      <p>{refundPolicy.membership}</p>
      <p>
        There is no minimum commitment beyond the first month and no cancellation fee. Cancel by
        messaging us on WhatsApp or emailing{' '}
        <a href={`mailto:${site.contact.emailSupport}`}>{site.contact.emailSupport}</a> — no
        retention call, no friction.
      </p>

      <h2>How refunds are paid</h2>
      <p>
        Refunds are returned via the method you paid with ({paymentMethods.join(', ')}) wherever
        possible, or by bank transfer where it is not. We process approved refunds within 7 working
        days. Any transfer charges levied by the payment provider are borne by us, not deducted from
        your refund.
      </p>

      <h2>If we cancel</h2>
      <p>
        If we cancel or reschedule a bootcamp or session for any reason, you receive a full refund
        or a place in the next cohort — your choice, with no time limit on deciding.
      </p>

      <h2>How to request a refund</h2>
      <p>
        Message us on WhatsApp at {site.contact.whatsapp} or email{' '}
        <a href={`mailto:${site.contact.emailSupport}`}>{site.contact.emailSupport}</a> with your
        name and what you paid for. You do not need to give a reason.
      </p>
    </LegalPage>
  );
}
