import { API_PATH } from '@/src/request/api.request';
import request from '@/src/request/request';

export const getBlog = (params?: any) => {
  return request({
    path: API_PATH.BLOG,
    method: 'GET',
    params,
  });
};
export const getBlogFollowings = (params?: any) => {
  return request({
    path: API_PATH.BLOG_FOLLOWINGS,
    method: 'GET',
    params,
  });
};
export const getThread = (params?: any) => {
  return request({
    path: API_PATH.THREAD,
    method: 'GET',
    params,
  });
};

export const updateBearish = (id: string) => {
  return request({
    path: API_PATH.BLOGS_BEAR(id),
    method: 'POST',
  });
};

export const updateBullish = (id: string) => {
  return request({
    path: API_PATH.BLOGS_BULL(id),
    method: 'POST',
  });
};

export const serviceGetUnSeen = () => {
  return request({
    path: API_PATH.USER_UNSEEN,
    method: 'GET',
  });
};

export const servicePutUnSeen = () => {
  return request({
    path: API_PATH.USER_SEEN,
    method: 'PUT',
  });
};
export const serviceShareBlog = (id: string) => {
  return request({
    path: API_PATH.BLOG + `/${id}/share`,
    method: 'POST',
  });
};
