const API_URL = 'http://localhost:5000';

export async function creerOffrande({ token, text }) {
  const res = await fetch(`${API_URL}/api/offrandes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ contenu: text })
  });
  return res.json();
}

export async function getAbime(token) {
  const res = await fetch(`${API_URL}/api/regard`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return res.json();
}
