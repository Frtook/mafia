export function setItem(key: string, value: string) {
  window.localStorage.setItem(key, value);
}

export function getItem(key: string) {
  if (window.localStorage.getItem(key) === null) {
    return "";
  }
  return window.localStorage.getItem(key);
}
