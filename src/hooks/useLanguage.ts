import { atom, useAtom } from "jotai";
import request from "../request/request";
import { useCustomAsyncStorage } from "./useAsyncStorage";

export type Lang = "en" | "cn";

const atomLanguage = atom<Lang>("en");

const changeLanguage = (body: { language: Lang }) => {
  return request({
    path: "/user/language",
    method: "PUT",
    body: JSON.stringify(body),
  });
};

export const useLanguage = () => {
  const [language, setLanguage] = useAtom(atomLanguage);
  const { getAsyncStorage, setAsyncStorage } = useCustomAsyncStorage();

  const initLanguage = async () => {
    const sLang = (await getAsyncStorage("lang")) || "en";
    setLanguage(sLang);
  };

  const onChangeLanguage = async (lang: Lang) => {
    setLanguage(lang);
    const res: any = await changeLanguage({ language });
    if (res.status_code === 200) {
      setAsyncStorage("lang", lang);
    } else {
      // ToastCustom.error(res?.data?.msg ?? "Update language failed");
    }
  };
  return { language, onChangeLanguage, initLanguage };
};
