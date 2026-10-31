import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SitePage } from '@/components/site/SitePage';
import { SiteContactForm } from '@/components/site/SiteContactForm';
import { HEADS, toTopic } from '@/lib/site/contactHeads';
import { html } from '@/lib/site/pages/contact';
import '@/lib/site/css/site-std.css';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const DESCRIPTION = 'Become a founding family at El Refugio, or talk with Nathaniel on a 20 minute call.';

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const topic = toTopic((await searchParams).topic);
  return { title: HEADS[topic].title, description: DESCRIPTION };
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export default async function ContactPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  // Render the head for the chosen topic on the server, so the first paint
  // already says the right thing.
  const head = HEADS[toTopic((await searchParams).topic)];
  const page = html
    .replace(/(id="cf-eyebrow">)[^<]*(<)/, `$1${esc(head.eyebrow)}$2`)
    .replace(/(id="cf-head">)[^<]*(<)/, `$1${esc(head.head)}$2`)
    .replace(/(id="cf-lede">)[^<]*(<)/, `$1${esc(head.lede)}$2`);
  return (
    <SitePage html={page} theme="std">
      <SiteContactForm />
    </SitePage>
  );
}
