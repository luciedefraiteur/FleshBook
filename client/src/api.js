const API_URL = 'http://localhost:5000';

export async function inscrireSinner({ email, password, name }) {
  const res = await fetch(`${API_URL}/sacrements/pacte`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name })
  });
  return res.json();
}

export async function connecterSinner({ email, password }) {
  const res = await fetch(`${API_URL}/sacrements/rituel`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function creerOffrande({ token, text }) {
  const res = await fetch(`${API_URL}/offrandes/offrande`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ text })
  });
  return res.json();
}

export async function getAbime(token) {
  const res = await fetch(`${API_URL}/offrandes/abime`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return res.json();
}
