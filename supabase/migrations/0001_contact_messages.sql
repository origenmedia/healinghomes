-- Healing Homes Mexico — contact form messages
-- Submissions from the public Contact page. These rows are the seed of the
-- future CRM, so the shape is kept simple and durable.

create schema if not exists healinghomes;

create table if not exists healinghomes.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  message    text not null,
  source     text not null default 'website',
  status     text not null default 'new',
  created_at timestamptz not null default now()
);

-- Row level security is enabled. The website writes through the server using
-- the service key, which bypasses RLS, so no public policies are granted.
-- This keeps the table private; only privileged server code can read or write.
alter table healinghomes.contact_messages enable row level security;

create index if not exists contact_messages_created_at_idx
  on healinghomes.contact_messages (created_at desc);

create index if not exists contact_messages_status_idx
  on healinghomes.contact_messages (status);
