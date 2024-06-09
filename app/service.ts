import { API_PATH } from '@/src/request/api.request';
import request from '@/src/request/request';

export const serviceVerifyLogin = () => {
  return request({
    path: API_PATH.AUTH_VERIFY_LOGIN_TWITTER,
    method: 'GET',
  });
};
export const serviceAuthLogin = (data: { code: string }) => {
  return request({
    path: API_PATH.AUTH_LOGIN,
    method: 'POST',
    body: JSON.stringify(data),
  });
};
