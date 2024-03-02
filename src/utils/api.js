import checkResponse from './checkResponse';

function request(url, option) {
  return fetch(`https://js-test.kitactive.ru${url}`, option).then(checkResponse);
}

//** устанавливаем общие заголовки */
function setHeaders() {
  //** как вариант токен можно записывать в стейт и брать от туда при запросах */
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
  return request('/api/media', {
    headers: setHeaders()
  })
};

export function deleteFile(idFile) {
  return request(`/api/media/${idFile}`, {
    method: 'DELETE',
    headers: setHeaders(),
  })
};

//** здесь пришлось видоизменить запрос поскольку все запросы ответ переводят в json, а тут в blob */
export function getFile(idFile) {
  return fetch(`https://js-test.kitactive.ru/api/media/${idFile}`, {
    method: 'GET',
    headers: setHeaders()
  })
}
