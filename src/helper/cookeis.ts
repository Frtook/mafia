import Cookies from "cookies-ts";
const cookies = new Cookies();
export function setCookie(name: string, vale: string) {
  cookies.set(name, vale);
}

export function getCookie(name: string) {
  return cookies.get(name);
}
// mafia he wan't kill self
//fix if not ded for loop again
