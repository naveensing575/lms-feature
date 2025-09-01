-- Replace with your test user's actual UUID from Supabase Auth
-- Find this under Supabase → Authentication → Users
insert into lessons
  (student_id, title, date, completed)
values
  ('<PASTE-YOUR-USER-ID-HERE>', 'Math Lesson 1', now() + interval
'1 day', false),
('<PASTE-YOUR-USER-ID-HERE>', 'Science Lesson 1', now
() + interval '2 days', false),
('<PASTE-YOUR-USER-ID-HERE>', 'History Lesson 1', now
() + interval '3 days', false),
('<PASTE-YOUR-USER-ID-HERE>', 'English Lesson 1', now
() + interval '4 days', false);
