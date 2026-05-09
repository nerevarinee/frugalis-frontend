// place files you want to import through the `$lib` alias in this folder.
const BASE_URL = 'http://localhost:8080';

export async function registerUser(userData) {
  const response = await fetch(`${BASE_URL}/api/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }

  return data;
}