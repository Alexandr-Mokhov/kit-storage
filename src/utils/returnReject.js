export default function returnReject(res) {
  return Promise.reject(res.status);
}
