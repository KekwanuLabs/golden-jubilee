interface Env {
  SITE_PASSWORD?: string;
}

export const onRequest: PagesFunction<Env> = async ({ request, next, env }) => {
  const password = env.SITE_PASSWORD;

  // No password set → open access (dev / after launch)
  if (!password) return next();

  const auth = request.headers.get('Authorization');
  if (auth?.startsWith('Basic ')) {
    const decoded = atob(auth.slice(6));
    const colon = decoded.indexOf(':');
    const pass = colon >= 0 ? decoded.slice(colon + 1) : decoded;
    if (pass === password) return next();
  }

  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Onwuneme Golden Jubilee", charset="UTF-8"',
      'Cache-Control': 'no-store',
    },
  });
};
