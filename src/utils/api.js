import checkResponse from './checkResponse';

function request(url, option) {
  return fetch(`https://js-test.kitactive.ru${url}`, option).then(checkResponse);
}

function setHeaders() {
  const token = localStorage.getItem('token');
  return { 
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  };
}

export function addNewFile(data) {
  return request('/api/media/upload', {
		mode: 'no-cors',
    method: 'POST',
    headers: setHeaders(),
    body: data
  });
}

export function getAllFiles() {
  return request('/api/media', { headers: setHeaders() })
};
