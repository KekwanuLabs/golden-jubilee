-- Run once after creating the D1 database:
--   npx wrangler d1 execute golden-jubilee --file=./schema.sql --remote

CREATE TABLE IF NOT EXISTS tributes (
  id                   TEXT     PRIMARY KEY,
  author               TEXT     NOT NULL,
  relation             TEXT     NOT NULL,
  message              TEXT     NOT NULL,
  created_at           TEXT     NOT NULL,
  avatar_initials      TEXT     NOT NULL,
  avatar_gradient_idx  INTEGER  NOT NULL DEFAULT 0,
  is_featured          INTEGER  NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS rsvp (
  id         TEXT     PRIMARY KEY,
  name       TEXT     NOT NULL,
  attending  INTEGER  NOT NULL DEFAULT 1,
  guests     INTEGER  NOT NULL DEFAULT 1,
  timestamp  TEXT     NOT NULL
);

-- ── Seed tributes (the six children + grandchildren + family friend) ──────────
INSERT OR IGNORE INTO tributes
  (id, author, relation, message, created_at, avatar_initials, avatar_gradient_idx, is_featured)
VALUES
  ('seed-f1', '[Child 1 — add your name]', 'First Child',
   'Growing up, our home was always filled with the sound of your laughter and the smell of Mama''s cooking. Papa, you showed us what it means to work hard and walk with integrity. Mama, you showed us what it means to love unconditionally. Together, you are the reason we know what a family should feel like. Fifty years of this? We are the most blessed children on earth. Daalu unu! Ya gazie!',
   '2026-12-01', 'C1', 0, 1),

  ('seed-f2', '[Child 2 — add your name]', 'Second Child',
   'I have watched you both navigate life''s storms with grace and faith. Not once did we see you falter in your love for each other or for us. Papa, your quiet strength is a mountain. Mama, your gentle wisdom is an ocean. Together, you are the bedrock of this family. Thank you for giving us 50 years of the most beautiful blueprint for love. We honour you today and always.',
   '2026-12-01', 'C2', 1, 1),

  ('seed-f3', '[Child 3 — add your name]', 'Third Child',
   'Dear Papa and Mama, I kept deleting drafts because no words feel adequate. So I will simply say this: every good thing in my life traces back to the foundation you laid. Your love is not just a story we tell — it is the air we breathe. Here is to 50 years and to many more golden seasons ahead. Chineke gozie unu!',
   '2026-12-01', 'C3', 2, 1),

  ('seed-f4', '[Child 4 — add your name]', 'Fourth Child',
   'Fifty years is a testimony. I have watched Mama and Papa teach us that marriage is not a feeling — it is a decision made fresh every morning. A decision to show up, to forgive, to laugh, to hold on. Thank you for making that decision for fifty years running. We, your children, are the living proof of your legacy.',
   '2026-12-01', 'C4', 3, 1),

  ('seed-f5', '[Child 5 — add your name]', 'Fifth Child',
   'The thing I am most grateful for is that you gave us an example. In a world where love is treated as temporary, you showed us it can be permanent — that it deepens and shines brighter with time. Happy Golden Jubilee, my dearest Papa and Mama. You are our greatest treasure.',
   '2026-12-01', 'C5', 4, 1),

  ('seed-f6', '[Child 6 — add your name]', 'Sixth Child',
   'Being the last child, I grew up watching you both through grown-up eyes from the very beginning. I saw a partnership built on faith, sacrifice, and an unshakeable bond. You never needed to teach me about love — I simply watched the two of you. Fifty years down, and you still make each other laugh. That is everything. Daalu. I love you both beyond words.',
   '2026-12-01', 'C6', 0, 1),

  ('seed-g1', 'The Grandchildren', 'Grandchild',
   'Dearest Grandpa and Grandma, thank you for the chin-chin you always kept in your bags, for the Igbo proverbs at bedtime, and for showing us that real love is quiet, strong, and lasting. You are our favourite people in the world. Happy Anniversary!',
   '2026-12-01', 'GC', 2, 0),

  ('seed-fr1', 'Chief Mrs. [Family Friend]', 'Friend',
   'I have known this couple since we were young. Seeing them today, wrapped in gold and grace, fills my heart with indescribable joy. Their union has always been a quiet miracle — two people made for each other. Fifty years of this is proof that God is very real and very good. Eze na-adili unu oo!',
   '2026-11-28', 'FF', 3, 0);

-- ── Seed RSVP entries ─────────────────────────────────────────────────────────
INSERT OR IGNORE INTO rsvp (id, name, attending, guests, timestamp) VALUES
  ('seed-r1', 'The Obi Family',       1, 4, '2026-10-01'),
  ('seed-r2', 'Dr. Nneka Chukwu',     1, 2, '2026-10-03'),
  ('seed-r3', 'Engineer Emeka Nwosu', 1, 3, '2026-10-05'),
  ('seed-r4', 'The Eze Family',       0, 0, '2026-10-07');
