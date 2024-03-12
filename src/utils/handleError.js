export default function handleError(err, description) {
  console.log(err + ` : ${description}`);
  alert(description);
}
