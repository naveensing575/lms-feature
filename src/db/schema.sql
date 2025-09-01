-- Create lessons table
create table if not exists lessons (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references auth.users(id) on delete cascade,
  title text not null,
  date timestamptz not null,
  completed boolean default false
);

-- Ensure RLS is enabled
alter table lessons enable row level security;

-- Policy: students can only see their own lessons
create policy "Students can view own lessons"
  on lessons for select
  using (auth.uid() = student_id);

create policy "Students can update own lessons"
  on lessons for update
  using (auth.uid() = student_id);
