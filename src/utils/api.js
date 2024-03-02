import checkResponse from './checkResponse';

function request(url, option) {
  return fetch(`https://js-test.kitactive.ru${url}`, option).then(checkResponse);
}

function setHeaders() {
  const token = localStorage.getItem('token');
  return { 
    'Authorization': `Bearer ${token}`,
  };
}

export function addNewFile(files) {
  return request('/api/media/upload', {
    method: 'POST',
    headers: setHeaders(),
    body: files
  });
}

export function getAllFiles() {
  return request('/api/media', { headers: setHeaders() })
};

export function deleteFile(idFile) {
  return request(`/api/media/${idFile}`, {
    method: 'DELETE',
    headers: setHeaders(),
  })
};
