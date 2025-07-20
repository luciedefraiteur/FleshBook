const API_URL = 'http://localhost:5000';

export async function getCercles(token) {
  const res = await fetch(`${API_URL}/api/cercles`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}

export async function getCercleById({ token, id }) {
  const res = await fetch(`${API_URL}/api/cercles/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}

export async function createCercle({ token, nom }) {
  const res = await fetch(`${API_URL}/api/cercles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ nom })
  });
  return res.json();
}
