-- Update testimonials table to support both companies and customer feedback

alter table public.testimonials
add column if not exists job_title text,
add column if not exists image_url text, -- For customer profile picture
add column if not exists type text default 'company'; -- 'company' or 'testimonial'

-- Update existing rows to be 'company' by default
update public.testimonials set type = 'company' where type is null;
