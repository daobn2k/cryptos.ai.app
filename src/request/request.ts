import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { isEmpty } from 'lodash';

type MakeFetchRequestProps = {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: string;
  headers?: Record<string, string>;
  accessToken?: string;
  params?: { [key: string]: string | string[] };
  prefix?: string;
  responseType?: 'stream';
};

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
  let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNmU3MGVhNy1hNGI1LTRhMzUtOTZkNC0yNTI4Mzg3ODdhYzgiLCJpYXQiOjE3MTgxNzYyNzIsImV4cCI6MTcxODc4MTA3Mn0.zslfk49HzVxBz8nL5AeMPRalojSyKThc6VTHcQeDEDY"
  // if (localStorage?.getItem('accessToken')) {
  //   token = JSON?.parse(localStorage?.getItem('accessToken') || '');
  // }
  const apiUrl = 'https://cryptos-ai-server-dev.uslab.dev';

  let url = `${prefix ?? apiUrl}${path}`;

  const axiosOptions: AxiosRequestConfig = {
    method,
    url,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    params,
    data: body,
  };

  if (!isEmpty(token) || !isEmpty(accessToken)) {
    axiosOptions.headers = {
      ...axiosOptions.headers,
      ['Authorization']: `Bearer ${token || accessToken}`,
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
