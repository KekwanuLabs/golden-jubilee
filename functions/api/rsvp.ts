interface Env { DB: D1Database; }

interface RsvpRow {
  id: string;
  name: string;
  attending: number;
  guests: number;
  timestamp: string;
  message: string;
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const { results } = await env.DB.prepare(
    'SELECT * FROM rsvp ORDER BY timestamp DESC'
  ).all<RsvpRow>();

  return Response.json(results.map(row => ({
    id: row.id,
    name: row.name,
    attending: row.attending === 1,
    guests: row.guests,
    timestamp: row.timestamp,
    message: row.message ?? '',
  })));
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: { name?: string; attending?: boolean; guests?: number; message?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { name, attending, guests = 1, message = '' } = body;

  if (!name?.trim()) {
    return Response.json({ error: 'name is required' }, { status: 400 });
  }

  const id = crypto.randomUUID();
  const timestamp = new Date().toISOString().split('T')[0];

  await env.DB.prepare(
    'INSERT INTO rsvp (id, name, attending, guests, timestamp, message) VALUES (?, ?, ?, ?, ?, ?)'
  ).bind(
    id,
    name.trim(),
    attending ? 1 : 0,
    attending ? guests : 0,
    timestamp,
    message.trim(),
  ).run();

  return Response.json({ success: true, id }, { status: 201 });
};
