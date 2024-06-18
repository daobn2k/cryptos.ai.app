import { API_PATH } from "@/src/request/api.request";
import request from "@/src/request/request";

export const getThread = (params?: any, type?: "thread" | "saved") => {
  console.log(type, "type");

  return request({
    path: type === "thread" ? API_PATH.THREAD : API_PATH.BLOG_SAVED,
    method: "GET",
    params,
  });
};
