-- Add is_pinned and youtube_url columns to projects table

alter table public.projects 
add column if not exists is_pinned boolean default false,
add column if not exists youtube_url text;

-- Update existing rows (optional, but good practice to ensure defaults)
update public.projects set is_pinned = false where is_pinned is null;
