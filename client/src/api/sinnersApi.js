const API_URL = 'http://localhost:5000';

export async function getSinnerProfile(token) {
  const res = await fetch(`${API_URL}/api/sinners/profile`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}

export async function updateSinnerProfile({ token, data }) {
  const res = await fetch(`${API_URL}/api/sinners/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function getSinnerById({ token, id }) {
  const res = await fetch(`${API_URL}/api/sinners/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}
