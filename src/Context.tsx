'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

interface ContextType {
  getLanguage: string;
  setLanguage: (value: string) => void;
  gt: (value: string) => '';
}

const ContextDefault: ContextType = {
  getLanguage: '',
  setLanguage: () => null,
  gt: () => '',
};

interface LangType {
  [key: string]: object;
}

export interface LangConfigType {
  defaultLang: string;
  mode: 'local' | 'single';
  languages: LangType[];
}

const LangContext = createContext<ContextType>(ContextDefault);

export const LangContextProvider: React.FC<{
  children: React.ReactNode;
  langConfig: LangConfigType;
}> = ({ children, langConfig }) => {
  const [getLanguage, setLanguage] = useState<string>(
    langConfig.mode === 'single' ? langConfig.defaultLang : ''
  );

  const [transl, setTransl] = useState<object>(
    langConfig.mode === 'single'
      ? langConfig.languages.find((lang) => lang[langConfig.defaultLang]) ?? {}
      : {}
  );

  const initialSet = useRef(true);

  const languages = langConfig.languages.map(
    (language) => Object.keys(language)[0]
  );

  useEffect(() => {
    const loadConfig = () => {
      const savedLang = localStorage.getItem('lang');
      if (savedLang) {
        setTransl(langConfig.languages.find((lang) => lang[savedLang]) ?? {});
        setLanguage(savedLang);
      } else {
        setTransl(
          langConfig.languages.find((lang) => lang[langConfig.defaultLang]) ??
            {}
        );
        setLanguage(langConfig.defaultLang);
        localStorage.setItem('lang', langConfig.defaultLang);
      }
    };
    if (langConfig.mode === 'local') {
      loadConfig();
    }
  }, []);

  useEffect(() => {
    if (!initialSet.current) {
      setTransl(langConfig.languages.find((lang) => lang[getLanguage]) ?? {});
      if (langConfig.mode === 'local') {
        localStorage.setItem('lang', getLanguage);
      }
    } else {
      initialSet.current = false;
    }
  }, [getLanguage]);

  const SetLang = (newLang: string) => {
    if (languages.includes(newLang)) {
      if (getLanguage !== newLang) {
        setLanguage(newLang);
      }
      if (langConfig.mode === 'single') {
        console.warn('New language will not be reload persistent');
      }
    } else {
      console.error('New language not found in config file');
    }
  };

  const GetTransl = (field: string): any => {
    const keys = ['', ...field.split('.')];
    keys[0] = getLanguage;
    let result: any = transl;
    for (let key of keys) {
      if (result[key] !== undefined) {
        result = result[key];
      } else {
        return field;
      }
    }
    return result;
  };

  return (
    <LangContext.Provider
      value={{ getLanguage, setLanguage: SetLang, gt: GetTransl }}
    >
      {children}
    </LangContext.Provider>
  );
};

export const useLangContext = () => {
  return useContext(LangContext);
};
