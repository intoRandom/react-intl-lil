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
  gs: (field: string, values?: Record<any, any>) => string;
  ga: (value: string) => any[];
}

const ContextDefault: ContextType = {
  getLanguage: '',
  setLanguage: () => null,
  gs: () => '',
  ga: () => [],
};

interface InnerContextType {
  show: boolean;
}

const InnerContextDefault: InnerContextType = {
  show: false,
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

const InnerContext = createContext<InnerContextType>(InnerContextDefault);

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

  const [show, setShow] = useState<boolean>(false);

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
        document.documentElement.lang = savedLang;
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
      document.documentElement.lang = getLanguage;
      setTransl(langConfig.languages.find((lang) => lang[getLanguage]) ?? {});
      setShow(true);
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
        setShow(false);
        setTimeout(() => {
          setLanguage(newLang);
          if (langConfig.mode === 'single') {
            console.warn('New language will not be reload persistent');
          }
        }, 200);
      }
    } else {
      console.error('New language not found in config file');
    }
  };

  const GetString = (
    field: string,
    values: Record<string, string> = {}
  ): string => {
    const keys = [getLanguage, ...field.split('.')];
    let result: any = transl;
    for (let key of keys) {
      if (result[key] !== undefined) {
        result = result[key];
      } else {
        return field;
      }
    }
    if (typeof result === 'string') {
      return result.replace(/{{(.*?)}}/g, (_, key) => {
        return key in values ? values[key] : '';
      });
    } else {
      console.error(`${field} is not a string`);
      return field;
    }
  };

  const GetArray = (field: string): any[] => {
    const keys = [getLanguage, ...field.split('.')];
    let result: any = transl;
    for (let key of keys) {
      if (result[key] !== undefined) {
        result = result[key];
      } else {
        return [];
      }
    }
    if (Array.isArray(result)) {
      return result;
    } else {
      console.error(`${field} is not an array`);
      return [];
    }
  };

  return (
    <InnerContext.Provider value={{ show }}>
      <LangContext.Provider
        value={{
          getLanguage,
          setLanguage: SetLang,
          gs: GetString,
          ga: GetArray,
        }}
      >
        {children}
      </LangContext.Provider>
    </InnerContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LangContext);
};

export const useShow = () => {
  return useContext(InnerContext);
};
