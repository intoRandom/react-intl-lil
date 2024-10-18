'use client';

import React from 'react';
import { LangConfigType, LangContextProvider, useLangContext } from './Context';

export const LangProvider: React.FC<{
  children: React.ReactNode;
  getLanguageConfig: LangConfigType;
}> = ({ children, getLanguageConfig }) => {
  return (
    <LangContextProvider langConfig={getLanguageConfig}>
      <ContentLoader>{children}</ContentLoader>
    </LangContextProvider>
  );
};

const ContentLoader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getLanguage } = useLangContext();

  return (
    <>
      <div style={{ visibility: getLanguage === '' ? 'hidden' : 'visible' }}>
        {children}
      </div>
    </>
  );
};
