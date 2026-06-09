const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #7a5c00, #d4af37)',
  'linear-gradient(135deg, #2d1f00, #8b6914)',
  'linear-gradient(135deg, #5c4500, #c9a227)',
  'linear-gradient(135deg, #1a1200, #d4af37)',
  'linear-gradient(135deg, #3d2800, #b8960c)',
];

interface Env { DB: D1Database; }

interface TributeRow {
  id: string;
  author: string;
  relation: string;
  message: string;
  created_at: string;
  avatar_initials: string;
  avatar_gradient_idx: number;
  is_featured: number;
}

function mapRow(row: TributeRow) {
  return {
    id: row.id,
    author: row.author,
    relation: row.relation,
    message: row.message,
    createdAt: row.created_at,
    avatarInitials: row.avatar_initials,
    avatarGradient: AVATAR_GRADIENTS[row.avatar_gradient_idx % AVATAR_GRADIENTS.length],
    isFeatured: row.is_featured === 1,
  };
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const { results } = await env.DB.prepare(
    'SELECT * FROM tributes ORDER BY is_featured DESC, created_at DESC'
  ).all<TributeRow>();

  return Response.json(results.map(mapRow));
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: { author?: string; relation?: string; message?: string; avatarInitials?: string; avatarGradientIdx?: number };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { author, relation, message, avatarInitials, avatarGradientIdx = 0 } = body;

  if (!author?.trim() || !message?.trim()) {
    return Response.json({ error: 'author and message are required' }, { status: 400 });
  }

  const id = crypto.randomUUID();
  const created_at = new Date().toISOString().split('T')[0];

  await env.DB.prepare(
    `INSERT INTO tributes (id, author, relation, message, created_at, avatar_initials, avatar_gradient_idx, is_featured)
     VALUES (?, ?, ?, ?, ?, ?, ?, 0)`
  ).bind(
    id,
    author.trim(),
    relation?.trim() || 'Friend',
    message.trim(),
    created_at,
    avatarInitials?.trim() || author.trim().split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase(),
    avatarGradientIdx % AVATAR_GRADIENTS.length,
  ).run();

  return Response.json({ success: true, id }, { status: 201 });
};
