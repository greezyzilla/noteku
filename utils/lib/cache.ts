import Cookies from 'js-cookie';

function getAccessToken() {
  return Cookies.get('accessToken');
}

function putAccessToken(accessToken : string) {
  return Cookies.set('accessToken', accessToken);
}

function removeAccessToken() {
  return Cookies.remove('accessToken');
}

export const cookie = Cookies;
export { getAccessToken, putAccessToken, removeAccessToken };
