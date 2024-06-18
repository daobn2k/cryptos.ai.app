import { useCustomAsyncStorage } from "@/src/hooks/useAsyncStorage";
import { API_PATH } from "@/src/request/api.request";
import request from "@/src/request/request";

export const getBlogSlugDetail = async (id: any) => {
  const { getAsyncStorage } = useCustomAsyncStorage();
  const token = await getAsyncStorage("accessToken");
  const url = token
    ? `${API_PATH.BLOG}/slug/auth/${id}`
    : `${API_PATH.BLOG}/slug/${id}`;
  return request({
    path: url,
    method: "GET",
  });
};
export const updateBlogViews = (id: string) => {
  return request({
    path: API_PATH.UPDATE_BLOG_VIEWS(id),
    method: "PUT",
  });
};
