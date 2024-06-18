import { useRequest } from "ahooks";
import { atom, useAtom } from "jotai";
import { useCustomAsyncStorage } from "./useAsyncStorage";
import { serviceGetUnSeen, servicePutUnSeen } from "../screen/Trending/serivce";

const atomUnSeen = atom<number>(0);
export const useNewBlogs = () => {
  const { getAsyncStorage } = useCustomAsyncStorage();
  const { runAsync: getUnSeen } = useRequest(serviceGetUnSeen, {
    manual: true,
  });
  const { runAsync: seen } = useRequest(servicePutUnSeen, { manual: true });
  const [countUnS, setCountUnS] = useAtom(atomUnSeen);

  const gUnSeen = async () => {
    const token = await getAsyncStorage("accessToken");
    if (!token || token === "") return;
    try {
      const res: any = await getUnSeen();

      setCountUnS(res?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const seenNews = async (callback?: any) => {
    const accessToken = await getAsyncStorage("accessToken");
    if (!accessToken) return;
    try {
      const res: any = await seen();
      if (res.data) {
        setCountUnS(0);
        callback && callback();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    seenNews,
    countUnS,
    gUnSeen,
  };
};
