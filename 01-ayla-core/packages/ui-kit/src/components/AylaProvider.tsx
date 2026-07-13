'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { tokens } from '@ayla/design-tokens';

// ============================================================
// سياق Ayla
// ============================================================
interface AylaContextType {
  theme: 'dark' | 'light';
  direction: 'rtl' | 'ltr';
  language: 'ar' | 'en';
  platformId: string;
  setTheme: (theme: 'dark' | 'light') => void;
  setDirection: (direction: 'rtl' | 'ltr') => void;
  setLanguage: (language: 'ar' | 'en') => void;
}

const AylaContext = createContext<AylaContextType | undefined>(undefined);

export function useAyla() {
  const context = useContext(AylaContext);
  if (!context) {
    throw new Error('useAyla must be used within AylaProvider');
  }
  return context;
}

// ============================================================
// إعدادات المنصة
// ============================================================
interface AylaProviderProps {
  children: React.ReactNode;
  platformId: string;
  defaultTheme?: 'dark' | 'light';
  defaultLanguage?: 'ar' | 'en';
}

export default function AylaProvider({
  children,
  platformId,
  defaultTheme = 'dark',
  defaultLanguage = 'ar',
}: AylaProviderProps) {
  const [theme, setThemeState] = useState<'dark' | 'light'>(defaultTheme);
  const [language, setLanguageState] = useState<'ar' | 'en'>(defaultLanguage);
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [direction, language, theme]);

  const setTheme = (newTheme: 'dark' | 'light') => {
    setThemeState(newTheme);
    localStorage.setItem(`ayla-${platformId}-theme`, newTheme);
  };

  const setLanguage = (newLanguage: 'ar' | 'en') => {
    setLanguageState(newLanguage);
    localStorage.setItem(`ayla-${platformId}-language`, newLanguage);
  };

  const setDirection = (newDirection: 'rtl' | 'ltr') => {
    // الاتجاه مرتبط باللغة تلقائياً
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem(`ayla-${platformId}-theme`) as 'dark' | 'light' | null;
    const savedLanguage = localStorage.getItem(`ayla-${platformId}-language`) as 'ar' | 'en' | null;
    if (savedTheme) setThemeState(savedTheme);
    if (savedLanguage) setLanguageState(savedLanguage);
  }, [platformId]);

  return (
    <AylaContext.Provider
      value={{
        theme,
        direction,
        language,
        platformId,
        setTheme,
        setDirection,
        setLanguage,
      }}
    >
      <div
        className={`ayla-root ayla-theme-${theme} ayla-direction-${direction}`}
        style={{
          '--ayla-bg-primary': tokens.colors.background.primary,
          '--ayla-bg-secondary': tokens.colors.background.secondary,
          '--ayla-bg-tertiary': tokens.colors.background.tertiary,
          '--ayla-gold-400': tokens.colors.gold[400],
          '--ayla-gold-500': tokens.colors.gold[500],
          '--ayla-gold-200': tokens.colors.gold[200],
          '--ayla-text-primary': tokens.colors.text.primary,
          '--ayla-text-secondary': tokens.colors.text.secondary,
          '--ayla-text-muted': tokens.colors.text.muted,
          '--ayla-border': tokens.colors.border.DEFAULT,
          '--ayla-border-light': tokens.colors.border.light,
          '--ayla-success': tokens.colors.state.success,
          '--ayla-warning': tokens.colors.state.warning,
          '--ayla-error': tokens.colors.state.error,
          '--ayla-info': tokens.colors.state.info,
          direction,
        } as React.CSSProperties}
      >
        {children}
      </div>
    </AylaContext.Provider>
  );
}
