import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { isEmpty } from "lodash";
import { useCustomAsyncStorage } from "../hooks/useAsyncStorage";

type MakeFetchRequestProps = {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: string;
  headers?: Record<string, string>;
  accessToken?: string;
  params?: { [key: string]: string | string[] };
  prefix?: string;
  responseType?: "stream";
};
export const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default async function request(
  props: MakeFetchRequestProps
): Promise<AxiosResponse> {
  const {
    path,
    method,
    body,
    headers,
    accessToken,
    params,
    prefix,
    responseType,
  } = props;
  const { getAsyncStorage } = useCustomAsyncStorage();

  let token = (await getAsyncStorage("accessToken")) || "";

  let url = `${prefix ?? apiUrl}${path}`;

  const axiosOptions: AxiosRequestConfig = {
    method,
    url,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    params,
    data: body,
  };

  if (!isEmpty(token) || !isEmpty(accessToken)) {
    axiosOptions.headers = {
      ...axiosOptions.headers,
      ["Authorization"]: `Bearer ${token || accessToken}`,
    };
  }

  if (responseType) {
    axiosOptions.responseType = responseType;
  }

  try {
    const response = await axios(axiosOptions);
    return response?.data;
  } catch (error: any) {
    throw error;
  }
}
