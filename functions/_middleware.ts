interface Env {
  SITE_PASSWORD?: string;
}

const COOKIE = 'gj_auth';
const AUTH_PATH = '/__auth';

function isAuthenticated(request: Request, password: string): boolean {
  const cookies = request.headers.get('Cookie') ?? '';
  const match = cookies.match(new RegExp(`${COOKIE}=([^;]+)`));
  return !!match && match[1] === btoa(password);
}

function loginPage(error = false): Response {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Golden Jubilee 2026</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Cormorant+Garamond:ital,wght@0,400;1,400&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100svh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0d0900;
      font-family: "Cormorant Garamond", Georgia, serif;
      background-image: radial-gradient(ellipse at 30% 40%, rgba(212,175,55,0.08) 0%, transparent 60%),
                        radial-gradient(ellipse at 70% 70%, rgba(212,175,55,0.05) 0%, transparent 50%);
    }
    .card {
      width: min(380px, 90vw);
      text-align: center;
      padding: 2.5rem 2rem;
      border: 1px solid rgba(212,175,55,0.35);
      border-radius: 4px;
      background: rgba(20,14,0,0.9);
      box-shadow: 0 0 60px rgba(212,175,55,0.1), inset 0 0 40px rgba(212,175,55,0.04);
    }
    .ornament { color: #d4af37; font-size: 1.1rem; letter-spacing: 0.5em; margin-bottom: 1.2rem; opacity: 0.7; }
    h1 {
      font-family: "Cinzel", serif;
      font-size: 1.05rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #d4af37;
      margin-bottom: 0.4rem;
    }
    .subtitle {
      font-size: 0.95rem;
      color: rgba(255,224,130,0.5);
      font-style: italic;
      margin-bottom: 2rem;
    }
    input[type="password"] {
      width: 100%;
      padding: 0.75rem 1rem;
      background: rgba(212,175,55,0.06);
      border: 1px solid rgba(212,175,55,0.3);
      border-radius: 2px;
      color: #fdf6e3;
      font-family: "Cormorant Garamond", serif;
      font-size: 1.1rem;
      text-align: center;
      letter-spacing: 0.1em;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
      margin-bottom: 1rem;
    }
    input[type="password"]:focus {
      border-color: rgba(212,175,55,0.7);
      box-shadow: 0 0 0 3px rgba(212,175,55,0.1);
    }
    input[type="password"]::placeholder { color: rgba(212,175,55,0.3); }
    button {
      width: 100%;
      padding: 0.75rem;
      background: linear-gradient(135deg, #8b6914, #d4af37 50%, #ffe082 75%, #d4af37);
      background-size: 200% auto;
      border: none;
      border-radius: 2px;
      color: #0d0900;
      font-family: "Cinzel", serif;
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      cursor: pointer;
      transition: background-position 0.4s, box-shadow 0.2s;
    }
    button:hover {
      background-position: right center;
      box-shadow: 0 4px 20px rgba(212,175,55,0.4);
    }
    .error {
      margin-top: 1rem;
      color: rgba(255,160,100,0.8);
      font-size: 0.9rem;
      font-style: italic;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="ornament">✦ ❖ ✦</div>
    <h1>Golden Jubilee 2026</h1>
    <p class="subtitle">Chief Engr & Lolo Cosmas U. Onwuneme</p>
    <form method="POST" action="${AUTH_PATH}">
      <input type="password" name="password" placeholder="Enter password" autofocus autocomplete="current-password" />
      <button type="submit">Enter</button>
      ${error ? '<p class="error">Incorrect password — please try again.</p>' : ''}
    </form>
  </div>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=UTF-8', 'Cache-Control': 'no-store' },
  });
}

export const onRequest: PagesFunction<Env> = async ({ request, next, env }) => {
  const password = env.SITE_PASSWORD;
  if (!password) return next();

  const url = new URL(request.url);

  if (url.pathname === AUTH_PATH && request.method === 'POST') {
    const form = await request.formData();
    const submitted = (form.get('password') as string) ?? '';
    if (submitted === password) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/',
          'Set-Cookie': `${COOKIE}=${btoa(password)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`,
          'Cache-Control': 'no-store',
        },
      });
    }
    return loginPage(true);
  }

  if (isAuthenticated(request, password)) return next();

  return loginPage();
};
