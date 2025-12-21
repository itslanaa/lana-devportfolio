
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Navigation Table
create table public.navigation (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  url text not null,
  "order" integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Services Table
create table public.services (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  icon text, -- Store icon name (e.g., 'FaCode')
  color text, -- Store hex code
  "order" integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Projects Table
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  category text not null, -- 'Web', 'Mobile', 'Design'
  image_url text,
  stack text[], -- Array of strings
  demo_url text,
  repo_url text,
  "order" integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Testimonials/Clients Table
create table public.testimonials (
  id uuid default uuid_generate_v4() primary key,
  client_name text not null,
  logo_url text,
  feedback text,
  "order" integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Contacts Table (for form submissions)
create table public.contacts (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  message text not null,
  read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert Default Navigation Links
insert into public.navigation (name, url, "order") values
('Home', 'home', 1),
('About', 'about', 2),
('Services', 'services', 3),
('Projects', 'projects', 4),
('Contact', 'contact', 5);

-- Enable Row Level Security (RLS)
alter table public.navigation enable row level security;
alter table public.services enable row level security;
alter table public.projects enable row level security;
alter table public.testimonials enable row level security;
alter table public.contacts enable row level security;

-- Create Policies (Public Read, Authenticated Write for Admin)
-- Use generic policies for now, assuming public read access
create policy "Allow public read access on navigation" on public.navigation for select using (true);
create policy "Allow public read access on services" on public.services for select using (true);
create policy "Allow public read access on projects" on public.projects for select using (true);
create policy "Allow public read access on testimonials" on public.testimonials for select using (true);

-- Allow anyone to insert into contacts (for the contact form)
create policy "Allow public insert on contacts" on public.contacts for insert with check (true);

-- Hero Content Table
create table public.hero_content (
  id uuid default uuid_generate_v4() primary key,
  greeting text default 'Hello, I''m',
  name text default 'John Doe',
  title text default 'Software Developer',
  description text default 'I build accessible, pixel-perfect, and performant web experiences.',
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- About Content Table
create table public.about_content (
  id uuid default uuid_generate_v4() primary key,
  bio text,
  years_experience text default '5+',
  projects_completed text default '50+',
  image_url text,
  cv_url text,
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Contact Information Table (Site Settings)
create table public.contact_info (
  id uuid default uuid_generate_v4() primary key,
  email text,
  phone text,
  address text,
  linkedin_url text,
  github_url text,
  dribbble_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert Default Hero Data
insert into public.hero_content (greeting, name, title, description) values
('Hello, I''m', 'John Doe', 'Software Developer', 'I build accessible, pixel-perfect, and performant web experiences. Passionate about creating digital solutions that help businesses grow.');

-- Insert Default About Data
insert into public.about_content (bio, years_experience, projects_completed) values
('I am a passionate software developer with a strong focus on building scalable web and mobile applications. With a background in both frontend aesthetics and backend logic, I create seamless digital experiences.', '5+', '50+');

-- Insert Default Contact Info
insert into public.contact_info (email, phone, address, linkedin_url, github_url, dribbble_url) values
('hello@johndoe.com', '+1 (555) 123-4567', 'San Francisco, CA', '#', '#', '#');

-- RLS for new tables
alter table public.hero_content enable row level security;
alter table public.about_content enable row level security;
alter table public.contact_info enable row level security;

create policy "Allow public read access on hero_content" on public.hero_content for select using (true);
create policy "Allow public read access on about_content" on public.about_content for select using (true);
create policy "Allow public read access on contact_info" on public.contact_info for select using (true);

