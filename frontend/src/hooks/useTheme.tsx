import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { theme as antdTheme } from 'antd';
import type { ThemeConfig } from 'antd';

import '@/styles/kourosh.css';

const STORAGE_DARK = 'dark-mode';
const STORAGE_ULTRA = 'isUltraDarkThemeEnabled';

function readBool(key: string, fallback: boolean): boolean {
  const raw = localStorage.getItem(key);
  if (raw === null) return fallback;
  return raw === 'true';
}

function applyDom(isDark: boolean, isUltra: boolean) {
  document.body.setAttribute('class', isDark ? 'dark' : 'light');
  if (isUltra) {
    document.documentElement.setAttribute('data-theme', 'ultra-dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  const msg = document.getElementById('message');
  if (msg) msg.className = isDark ? 'dark' : 'light';
}

// module load so the document is in the right theme before React mounts.
const initialDark = readBool(STORAGE_DARK, true);
const initialUltra = readBool(STORAGE_ULTRA, false);
applyDom(initialDark, initialUltra);

// Achaemenid animated grid backdrop, mounted once behind every entry point.
if (typeof document !== 'undefined' && !document.querySelector('.kp-grid-bg')) {
  const gridBg = document.createElement('div');
  gridBg.className = 'kp-grid-bg';
  gridBg.setAttribute('aria-hidden', 'true');
  document.body.prepend(gridBg);
}

const KP_FONT = "'Inter', 'Vazirmatn', -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

const DARK_TOKENS = {
  colorBgBase: '#0a0e1a',
  colorBgLayout: '#0a0e1a',
  colorBgContainer: '#101527',
  colorBgElevated: '#171e33',
  colorPrimary: '#c9a227',
  colorInfo: '#2ec4b6',
  colorLink: '#e8c547',
  borderRadius: 10,
  fontFamily: KP_FONT,
};
const ULTRA_DARK_TOKENS = {
  colorBgBase: '#000',
  colorBgLayout: '#000',
  colorBgContainer: '#0a0e1a',
  colorBgElevated: '#101527',
  colorPrimary: '#c9a227',
  colorInfo: '#2ec4b6',
  colorLink: '#e8c547',
  borderRadius: 10,
  fontFamily: KP_FONT,
};
const DARK_LAYOUT_TOKENS = {
  bodyBg: '#0a0e1a',
  headerBg: '#080b14',
  headerColor: '#ffffff',
  footerBg: '#0a0e1a',
  siderBg: '#080b14',
  triggerBg: '#101527',
  triggerColor: '#e8c547',
};
const ULTRA_DARK_LAYOUT_TOKENS = {
  bodyBg: '#000',
  headerBg: '#030509',
  headerColor: '#ffffff',
  footerBg: '#000',
  siderBg: '#030509',
  triggerBg: '#0a0e1a',
  triggerColor: '#e8c547',
};
const DARK_MENU_TOKENS = {
  darkItemBg: '#080b14',
  darkSubMenuItemBg: '#0a0e1a',
  darkPopupBg: '#101527',
  darkItemSelectedBg: 'rgba(201, 162, 39, 0.16)',
  darkItemSelectedColor: '#e8c547',
};
const ULTRA_DARK_MENU_TOKENS = {
  darkItemBg: '#030509',
  darkSubMenuItemBg: '#000',
  darkPopupBg: '#0a0e1a',
  darkItemSelectedBg: 'rgba(201, 162, 39, 0.16)',
  darkItemSelectedColor: '#e8c547',
};
const DARK_CARD_TOKENS = {
  colorBorderSecondary: 'rgba(201, 162, 39, 0.14)',
};
const ULTRA_DARK_CARD_TOKENS = {
  colorBorderSecondary: 'rgba(201, 162, 39, 0.10)',
};
const STATISTIC_TOKENS = {
  contentFontSize: 17,
  titleFontSize: 11,
};
const LIGHT_CONTRAST_TOKENS = {
  colorTextDescription: 'rgba(0, 0, 0, 0.58)',
  colorTextTertiary: 'rgba(0, 0, 0, 0.58)',
  colorTextPlaceholder: '#767676',
  colorError: '#cf1322',
  colorErrorText: '#cf1322',
  colorSuccessText: '#237804',
  colorPrimary: '#8a6d13',
  colorInfo: '#0f766e',
  colorLink: '#8a6d13',
  borderRadius: 10,
  fontFamily: KP_FONT,
};
const LIGHT_BUTTON_TOKENS = {
  colorPrimary: '#8a6d13',
  colorPrimaryHover: '#a8861d',
  colorPrimaryActive: '#6d550e',
};

export function buildAntdThemeConfig(isDark: boolean, isUltra: boolean): ThemeConfig {
  if (!isDark) {
    return {
      algorithm: antdTheme.defaultAlgorithm,
      token: LIGHT_CONTRAST_TOKENS,
      components: {
        Statistic: STATISTIC_TOKENS,
        Button: LIGHT_BUTTON_TOKENS,
      },
    };
  }
  return {
    algorithm: antdTheme.darkAlgorithm,
    token: isUltra ? ULTRA_DARK_TOKENS : DARK_TOKENS,
    components: {
      Layout: isUltra ? ULTRA_DARK_LAYOUT_TOKENS : DARK_LAYOUT_TOKENS,
      Menu: isUltra ? ULTRA_DARK_MENU_TOKENS : DARK_MENU_TOKENS,
      Card: isUltra ? ULTRA_DARK_CARD_TOKENS : DARK_CARD_TOKENS,
      Statistic: STATISTIC_TOKENS,
    },
  };
}

export function pauseAnimationsUntilLeave(elementId: string): void {
  document.documentElement.setAttribute('data-theme-animations', 'off');
  const el = document.getElementById(elementId);
  if (!el) return;
  const restore = () => {
    document.documentElement.removeAttribute('data-theme-animations');
    el.removeEventListener('mouseleave', restore);
    el.removeEventListener('touchend', restore);
  };
  el.addEventListener('mouseleave', restore);
  el.addEventListener('touchend', restore);
}

interface ThemeContextValue {
  isDark: boolean;
  isUltra: boolean;
  toggleTheme: () => void;
  toggleUltra: () => void;
  antdThemeConfig: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(initialDark);
  const [isUltra, setIsUltra] = useState<boolean>(initialUltra);

  useEffect(() => {
    applyDom(isDark, isUltra);
    localStorage.setItem(STORAGE_DARK, String(isDark));
    localStorage.setItem(STORAGE_ULTRA, String(isUltra));
  }, [isDark, isUltra]);

  const toggleTheme = useCallback(() => setIsDark((v) => !v), []);
  const toggleUltra = useCallback(() => setIsUltra((v) => !v), []);

  const antdThemeConfig = useMemo(() => buildAntdThemeConfig(isDark, isUltra), [isDark, isUltra]);

  const value = useMemo<ThemeContextValue>(
    () => ({ isDark, isUltra, toggleTheme, toggleUltra, antdThemeConfig }),
    [isDark, isUltra, toggleTheme, toggleUltra, antdThemeConfig],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
