import { useMemo } from 'react';
import { Blog } from '../utils/blog.utils';
import { Lang, useLanguage } from './useLanguage';

export const useDataBlog = (data?: Blog) => {
  const { language } = useLanguage();

  const getTitle = (data: Blog, language: Lang) => {
    switch (language) {
      case 'cn':
        return data.title_cn;
      default:
        return data.title;
    }
  };

  const getContent = (data: Blog, language: Lang) => {
    switch (language) {
      case 'cn':
        return data.content_cn;
      default:
        return data.content;
    }
  };
  const getDescription = (data: Blog, language: Lang) => {
    switch (language) {
      case 'cn':
        return data.description_cn;
      default:
        return data.description;
    }
  };
  const getRelated = (data: Blog, language: Lang) => {
    switch (language) {
      case 'cn':
        return data.related_cn_questions;
      default:
        return data.related_questions;
    }
  };

  const blog = useMemo(() => {
    if (!data) return {};
    const title = getTitle(data, language);
    const content = getContent(data, language);
    const description = getDescription(data, language);
    const related_questions = getRelated(data, language);
    return {
      ...data,
      title,
      content,
      description,
      related_questions,
    };
  }, [data, language]);

  return blog as Blog;
};
