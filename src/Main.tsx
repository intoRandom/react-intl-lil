'use client';

import React from 'react';
import { LangConfigType, LangContextProvider, useShow } from './Context';

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
  const { show } = useShow();

  const transition = {
    opacity: !show ? 0 : 1,
    visibility: !show ? 'hidden' : 'visible',
    transition: !show ? '' : 'opacity 0.3s ease-in 0.2s',
  };

  return (
    <>
      <div style={transition}>{children}</div>
    </>
  );
};
