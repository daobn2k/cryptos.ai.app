import { useRequest } from 'ahooks';
import { useAtom } from 'jotai';
import { useLanguage } from './useLanguage';
import { API_PATH } from '../request/api.request';
import request from '../request/request';
import { atomProfile } from '../store/profile.store';

const serviceGetInfo = (token?: string) => {
  if (token) {
    return request({
      method: 'GET',
      path: API_PATH.GET_INFO,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return request({
    method: 'GET',
    path: API_PATH.GET_INFO,
  });
};

export const useProfile = () => {
  const [profile, setProfile] = useAtom(atomProfile);
  const { language, onChangeLanguage } = useLanguage();
  // const sLang = localStorageUtils.get("lang");
  const { runAsync } = useRequest(serviceGetInfo, {
    manual: true,
    onSuccess: (res: any) => {
      if (res.status_code === 200) {
        setProfile(res?.data);
        const newLang = res?.data?.language ?? language;
        onChangeLanguage(newLang);
      }
    },
  });

  const onGetInfo = async (token?: string) => {
    return await runAsync(token);
  };
  return { profile, setProfile, onGetInfo };
};
