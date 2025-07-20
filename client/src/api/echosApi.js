const API_URL = 'http://localhost:5000';

export async function getEchosForOffrande({ token, offrandeId }) {
  const res = await fetch(`${API_URL}/api/echos/offrande/${offrandeId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}

export async function createEcho({ token, offrandeId, contenu }) {
  const res = await fetch(`${API_URL}/api/echos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON_stringify({ offrandeId, contenu })
  });
  return res.json();
}
