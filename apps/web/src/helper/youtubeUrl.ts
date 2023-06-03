const regExp =
  /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/;
export function isValidUrl(url: string) {
  const match = url.match(regExp);
  if (match && match[2].length == 11) {
    return true;
  }
  return false;
}

export function getVideoId(url: string) {
  const match = url.match(regExp);
  if (match && match[2].length == 11) {
    return match[2];
  }
  return '';
}
