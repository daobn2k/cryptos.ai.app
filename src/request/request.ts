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
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzYTJjNDRiMS1jZmE3LTQzNmMtOGZhMS0zN2FhYjBjNGFkNmYiLCJpYXQiOjE3MTc1NzIyMzIsImV4cCI6MTcxODE3NzAzMn0.PHozg1XfoTxmHmI0pFnCdz3vRRjS1aTrMaVfUInHmT8';
  // if (localStorage?.getItem('accessToken')) {
  //   token = JSON?.parse(localStorage?.getItem('accessToken') || '');
  // }
  const apiUrl = 'https://cryptos-ai-server-dev.uslab.dev';

  console.log(process.env.REACT_APP_API_URL, 'log');

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
