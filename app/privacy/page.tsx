import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description:
    'What data we collect, why, who we share it with, and how to ask us to delete it.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="2026-08-20">
      <p>
        This policy explains what {site.name} collects, why, and what you can ask us to do about it.
        We have tried to write it in plain language rather than the usual wall of defensive prose.
      </p>

      <h2>What we collect</h2>
      <h3>Information you give us</h3>
      <ul>
        <li>Your email address, if you subscribe to the newsletter or request a tool result.</li>
        <li>
          Your name, email, optional WhatsApp number, and message, if you use the contact form.
        </li>
        <li>
          Information you share when you book a service — including details about your financial
          situation and goals that you choose to tell us during an advisory engagement.
        </li>
      </ul>

      <h3>Information collected automatically</h3>
      <ul>
        <li>
          Basic analytics: pages viewed, approximate location by country, device type, and referring
          site. This is only collected if you accept cookies.
        </li>
        <li>Standard server logs, including IP address, for security and reliability.</li>
      </ul>

      <h3>What we do not collect</h3>
      <ul>
        <li>
          Brokerage credentials. We will never ask for them, and you should never give them to
          anyone.
        </li>
        <li>Card or bank details. Payments are handled directly between you and the payment provider.</li>
        <li>CNIC numbers or identity documents.</li>
      </ul>

      <h2>Why we use it</h2>
      <ul>
        <li>To reply to your enquiry.</li>
        <li>To deliver the course, bootcamp, or advisory service you booked.</li>
        <li>To send the newsletter, if you asked for it.</li>
        <li>To understand which pages are useful, so we can improve them.</li>
      </ul>
      <p>
        Anything you tell us about your finances during an advisory engagement is used only to
        advise you. It is not shared, sold, or used for marketing.
      </p>

      <h2>Cookies</h2>
      <p>
        Analytics cookies load only after you accept them in the banner. Choosing “Reject” means no
        analytics or advertising scripts run at all — it is a real rejection, not a dismissal. You
        can change your mind by clearing this site’s data in your browser.
      </p>

      <h2>Who we share it with</h2>
      <p>We use a small number of third-party services to operate:</p>
      <ul>
        <li>Our website host, which processes requests and keeps server logs.</li>
        <li>Our email newsletter provider, which stores subscriber addresses.</li>
        <li>Our analytics provider, if you accepted cookies.</li>
        <li>WhatsApp, when you choose to message us — governed by WhatsApp’s own privacy terms.</li>
      </ul>
      <p>
        We do not sell your data. We do not share it with brokers, and we receive no payment from
        any broker for anything.
      </p>

      <h2>How long we keep it</h2>
      <ul>
        <li>Newsletter subscribers: until you unsubscribe.</li>
        <li>Contact enquiries: up to two years, then deleted.</li>
        <li>Client records: as long as needed for the engagement and any legal record-keeping.</li>
      </ul>

      <h2>Your rights</h2>
      <p>You can ask us to:</p>
      <ul>
        <li>Tell you what data we hold about you.</li>
        <li>Correct anything that is wrong.</li>
        <li>Delete your data, where we are not required to keep it.</li>
        <li>Stop sending you email — every newsletter has a one-click unsubscribe link.</li>
      </ul>
      <p>
        Email <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> and we
        will respond within 30 days.
      </p>

      <h2>Security</h2>
      <p>
        The site is served over HTTPS and we limit access to any personal data to the two of us. No
        system is perfectly secure, so we collect as little as we can get away with — that is the
        most effective protection available.
      </p>

      <h2>Children</h2>
      <p>
        Our services are not directed at anyone under 18, and we do not knowingly collect their
        data.
      </p>

      <h2>Changes</h2>
      <p>
        If we change this policy materially, we will update the date at the top and notify newsletter
        subscribers.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about privacy: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
        , or WhatsApp {site.contact.whatsapp}.
      </p>
    </LegalPage>
  );
}
