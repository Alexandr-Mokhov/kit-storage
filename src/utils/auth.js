import checkResponse from './checkResponse';

function request(url, option) {
  return fetch(`https://js-test.kitactive.ru${url}`, option).then(checkResponse);
}

export const registerUser = (name, email, password) => {
  return request('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
}

