'use client';

import React from 'react';
import { LangConfigType, LangContextProvider, useLanguage } from './Context';

export const LangProvider: React.FC<{
  children: React.ReactNode;
  langConfig: LangConfigType;
}> = ({ children, langConfig }) => {
  return (
    <LangContextProvider langConfig={langConfig}>
      <ContentLoader>{children}</ContentLoader>
    </LangContextProvider>
  );
};

const ContentLoader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getLanguage } = useLanguage();

  return (
    <>
      <div style={{ visibility: getLanguage === '' ? 'hidden' : 'visible' }}>
        {children}
      </div>
    </>
  );
};
