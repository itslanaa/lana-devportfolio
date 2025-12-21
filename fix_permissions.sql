
-- Enable RLS permissions for Authenticated Users (Admin)

-- Hero Content
create policy "Enable all access for users based on email" on "public"."hero_content"
as PERMISSIVE for ALL
to authenticated
using (true)
with check (true);

-- About Content
create policy "Enable all access for users based on email" on "public"."about_content"
as PERMISSIVE for ALL
to authenticated
using (true)
with check (true);

-- Contact Info
create policy "Enable all access for users based on email" on "public"."contact_info"
as PERMISSIVE for ALL
to authenticated
using (true)
with check (true);

-- Projects
create policy "Enable all access for users based on email" on "public"."projects"
as PERMISSIVE for ALL
to authenticated
using (true)
with check (true);

-- Services
create policy "Enable all access for users based on email" on "public"."services"
as PERMISSIVE for ALL
to authenticated
using (true)
with check (true);

-- Testimonials
create policy "Enable all access for users based on email" on "public"."testimonials"
as PERMISSIVE for ALL
to authenticated
using (true)
with check (true);

-- Contacts (Messages)
create policy "Enable all access for users based on email" on "public"."contacts"
as PERMISSIVE for ALL
to authenticated
using (true)
with check (true);

-- Navigation
create policy "Enable all access for users based on email" on "public"."navigation"
as PERMISSIVE for ALL
to authenticated
using (true)
with check (true);
