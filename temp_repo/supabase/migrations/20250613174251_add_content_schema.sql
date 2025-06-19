-- Extensions (idempotent)
create extension if not exists pgcrypto;
create extension if not exists pg_trgm;
create extension if not exists pg_cron;

-- ENUM
do $$
begin
  if not exists (select 1 from pg_type where typname = 'status_type') then
    create type status_type as enum ('draft','scheduled','published','archived');
  end if;
end$$;

-- Lookup tables
create table if not exists property_types (
  id serial primary key,
  name text unique not null,
  parent_id int references property_types(id)
);

create table if not exists categories (
  id serial primary key,
  name text unique not null
);

create table if not exists tags (
  id serial primary key,
  name text unique not null,
  slug text unique not null
);

create table if not exists roles (
  id serial primary key,
  name text unique not null
);

create table if not exists authors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique,
  avatar_url text
);

-- Core content tables
create table if not exists market_reports (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  locale text default 'en',
  title text not null,
  summary text,
  content text,
  property_type_id int references property_types(id),
  category_id int references categories(id),
  author_id uuid references authors(id),
  status status_type not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  is_premium boolean not null default false,
  views int not null default 0 check (views >= 0),
  downloads int not null default 0 check (downloads >= 0),
  pages int,
  reading_time int check (reading_time > 0),
  search_vector tsvector,
  unique (slug, locale)
);

create table if not exists insights (like market_reports including defaults);
alter table insights add primary key (id);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  locale text default 'en',
  title text not null,
  content text,
  author_id uuid references authors(id),
  status status_type not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  image_url text
);

-- Version tables
create table if not exists market_report_versions (
  id uuid primary key default gen_random_uuid(),
  market_report_id uuid references market_reports(id) on delete cascade,
  pdf_path text not null,
  revision int not null,
  created_at timestamptz default now(),
  unique (market_report_id, revision)
);

create table if not exists insight_versions (
  id uuid primary key default gen_random_uuid(),
  insight_id uuid references insights(id) on delete cascade,
  pdf_path text not null,
  revision int not null,
  created_at timestamptz default now(),
  unique (insight_id, revision)
);

-- Join tables
create table if not exists content_tags (
  content_id uuid not null,
  tag_id int not null references tags(id),
  content_table text not null check (content_table in ('market_reports','insights')),
  primary key (content_id, tag_id, content_table)
);

create table if not exists content_roles (
  content_id uuid not null,
  role_id int not null references roles(id),
  content_table text not null check (content_table in ('market_reports','insights')),
  primary key (content_id, role_id, content_table)
);

-- Analytics events
create table if not exists content_events (
  id bigserial primary key,
  content_id uuid not null,
  user_id uuid,
  event text not null check (event in ('view','download')),
  utm_source text, utm_medium text, utm_campaign text,
  referrer text, ip text, ua text,
  created_at timestamptz default now()
);

-- Triggers
create or replace function set_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end; $$ language plpgsql;

create or replace function tsv_content() returns trigger as $$
begin new.search_vector :=
  to_tsvector('english', coalesce(new.title,'') || ' ' ||
                           coalesce(new.summary,'') || ' ' ||
                           coalesce(new.content,'')); return new;
end; $$ language plpgsql;

create trigger trg_mr_upd before update on market_reports
  for each row execute procedure set_updated_at();
create trigger trg_mr_tsv before insert or update on market_reports
  for each row execute procedure tsv_content();

create trigger trg_ins_upd before update on insights
  for each row execute procedure set_updated_at();
create trigger trg_ins_tsv before insert or update on insights
  for each row execute procedure tsv_content();

create trigger trg_tes_upd before update on testimonials
  for each row execute procedure set_updated_at();
create trigger trg_tes_tsv before insert or update on testimonials
  for each row execute procedure tsv_content();

-- Indexes
create index if not exists idx_mr_pub
  on market_reports (published_at desc)
  where status='published' and deleted_at is null;
create index if not exists idx_ins_pub
  on insights (published_at desc)
  where status='published' and deleted_at is null;
create index if not exists idx_tes_pub
  on testimonials (published_at desc)
  where status='published' and deleted_at is null;
create index if not exists idx_mr_search on market_reports using gin (search_vector);
create index if not exists idx_ins_search on insights using gin (search_vector);
create index if not exists idx_tes_search on testimonials using gin (search_vector);

-- RLS
alter table market_reports enable row level security;
alter table insights enable row level security;
alter table testimonials enable row level security;

create policy mr_public_read on market_reports
  for select using (status='published' and deleted_at is null);
create policy ins_public_read on insights
  for select using (status='published' and deleted_at is null);
create policy tes_public_read on testimonials
  for select using (status='published' and deleted_at is null);

create policy mr_admin_all on market_reports
  for all using (auth.role() in ('service_role','authenticated'));
create policy ins_admin_all on insights
  for all using (auth.role() in ('service_role','authenticated'));
create policy tes_admin_all on testimonials
  for all using (auth.role() in ('service_role','authenticated'));

-- Scheduled publishing (requires superuser privileges)
-- insert into cron.job (schedule, command)
-- values ('* * * * *',
--   $$update market_reports set status='published'
--       where status='scheduled' and published_at<=now() and deleted_at is null;$$)
-- on conflict do nothing;

-- insert into cron.job (schedule, command)
-- values ('* * * * *',
--   $$update insights set status='published'
--       where status='scheduled' and published_at<=now() and deleted_at is null;$$)
-- on conflict do nothing;

-- insert into cron.job (schedule, command)
-- values ('* * * * *',
--   $$update testimonials set status='published'
--       where status='scheduled' and published_at<=now() and deleted_at is null;$$)
-- on conflict do nothing;