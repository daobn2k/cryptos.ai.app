import { useCustomAsyncStorage } from "@/src/hooks/useAsyncStorage";
import { Lang } from "@/src/hooks/useLanguage";
import { API_PATH } from "@/src/request/api.request";
import request, { apiUrl } from "@/src/request/request";
import "react-native-polyfill-globals/auto";
//@ts-ignore
import { fetch } from "react-native-fetch-api";

export const getBlog = (params?: any) => {
  return request({
    path: API_PATH.BLOG,
    method: "GET",
    params,
  });
};

export const getThreads = (params?: any) => {
  return request({
    path: API_PATH.THREAD,
    method: "GET",
    params,
  });
};

export const getMessageThread = async (
  data: {
    question: string;
    thread_id?: string;
    blog_id?: string;
    language?: Lang;
  },
  callback: (data: any) => void,
  f: () => void
) => {
  const { getAsyncStorage } = useCustomAsyncStorage();
  const token = await getAsyncStorage("accessToken");
  const url = `${apiUrl}${API_PATH.ASSISTANT_CONVERSATION}`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    reactNative: { textStreaming: true },
  };
  try {
    const response: any = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const reader = response.body.getReader();
    const pump = () => {
      return reader.read().then(({ done, value }: any) => {
        if (done) {
          console.log("<<<<---done");

          f();
          return;
        }
        const result = new TextDecoder().decode(value);
        result
          .split("\n\n\n")
          .filter(Boolean)
          .map((item) => {
            return callback(JSON.parse(item));
          });
        pump();
      });
    };

    pump();

    return true;
  } catch (error) {
    console.error("Error fetching whale price:", error);
  }
};

export const getMessages = (id: string, lang: Lang, take?: number) => {
  return request({
    method: "GET",
    path: API_PATH.MESSAGE,
    params: {
      thread_id: id,
      page: 1,
      take: take ?? 20,
      sort_field: "created_at",
      sort_type: "DESC",
      lang,
    } as any,
  });
};
export const createThread = (data: { blog_id: string; name: string }) => {
  return request({
    method: "POST",
    path: API_PATH.THREAD,
    body: JSON.stringify(data),
  });
};

export const getRelatedThread = (id: string) => {
  return request({
    method: "GET",
    path: `${API_PATH.THREAD}/${id}/recommend`,
  });
};
