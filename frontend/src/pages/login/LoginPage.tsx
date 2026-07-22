import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Menu,
  Popover,
  Space,
  Spin,
  message,
} from 'antd';
import {
  KeyOutlined,
  LockOutlined,
  MoonFilled,
  MoonOutlined,
  SunOutlined,
  TranslationOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { HttpUtil, LanguageManager } from '@/utils';
import { FormField, rhfZodValidate } from '@/components/form/rhf';
import { setMessageInstance } from '@/utils/messageBus';
import { useTheme } from '@/hooks/useTheme';
import { LoginFormSchema, TwoFactorCodeSchema, type LoginFormValues } from '@/schemas/login';
import KouroshLogo from '@/components/ui/KouroshLogo';
import { QUOTES } from '@/pages/sub/quotes';
import './LoginPage.css';

type LoginForm = LoginFormValues;

const basePath = window.X_UI_BASE_PATH || '';
const initialQuoteIndex = Math.floor(Math.random() * QUOTES.length);

interface FloatingProps {
  filled: boolean;
  label: string;
  children: ReactNode;
}

function Floating({ filled, label, children }: FloatingProps) {
  const [focused, setFocused] = useState(false);
  const cls = `lp-field${focused ? ' is-focused' : ''}${filled ? ' is-filled' : ''}`;
  return (
    <div className={cls} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
      {children}
      <label className="lp-label">{label}</label>
    </div>
  );
}

export default function LoginPage() {
  const { t } = useTranslation();
  const { isDark, isUltra, toggleTheme, toggleUltra, antdThemeConfig } = useTheme();
  const [messageApi, messageContextHolder] = message.useMessage();

  useEffect(() => {
    setMessageInstance(messageApi);
  }, [messageApi]);

  const [fetched, setFetched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [twoFactorEnable, setTwoFactorEnable] = useState(false);
  const [quoteIndex] = useState(initialQuoteIndex);
  const methods = useForm<LoginForm>({ defaultValues: { username: '', password: '', twoFactorCode: '' } });
  const values = useWatch({ control: methods.control });
  const [lang, setLang] = useState<string>(() => LanguageManager.getLanguage());
  const isFa = lang.startsWith('fa');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const msg = await HttpUtil.post('/getTwoFactorEnable');
      if (cancelled) return;
      if (msg.success) setTwoFactorEnable(!!msg.obj);
      setFetched(true);
    })();
    return () => { cancelled = true; };
  }, []);

  const onSubmit = useCallback(async (v: LoginForm) => {
    setSubmitting(true);
    try {
      const msg = await HttpUtil.post('/login', v);
      if (msg.success) window.location.href = basePath + 'panel/';
    } finally {
      setSubmitting(false);
    }
  }, []);

  const onLangChange = useCallback((next: string) => {
    setLang(next);
    LanguageManager.setLanguage(next);
  }, []);

  const cycleTheme = useCallback(() => {
    if (!isDark) {
      toggleTheme();
      if (isUltra) toggleUltra();
    } else if (!isUltra) {
      toggleUltra();
    } else {
      toggleUltra();
      toggleTheme();
    }
  }, [isDark, isUltra, toggleTheme, toggleUltra]);

  const themeIcon = !isDark ? <SunOutlined /> : !isUltra ? <MoonOutlined /> : <MoonFilled />;
  const quote = QUOTES[quoteIndex];

  const langMenuItems = (LanguageManager.supportedLanguages as { value: string; name: string; icon: string }[]).map((l) => ({
    key: l.value,
    label: (
      <Space size={8}>
        <span aria-hidden="true">{l.icon}</span>
        <span>{l.name}</span>
      </Space>
    ),
  }));

  return (
    <ConfigProvider theme={antdThemeConfig}>
      {messageContextHolder}
      <div className={`login-page${isDark ? ' is-dark' : ''}${isUltra ? ' is-ultra' : ''}`}>
        <div className="lp-aurora" aria-hidden="true" />
        <div className="lp-grid" aria-hidden="true" />

        <div className="login-toolbar">
          <button type="button" className="login-toolbar-btn" aria-label={t('menu.theme')} title={t('menu.theme')} onClick={cycleTheme}>
            {themeIcon}
          </button>
          <Popover
            rootClassName={isDark ? 'dark' : 'light'}
            placement="bottomRight"
            trigger="click"
            styles={{ content: { padding: 4 } }}
            content={
              <Menu
                mode="vertical"
                selectable
                selectedKeys={[lang]}
                items={langMenuItems}
                onClick={({ key }) => onLangChange(key)}
                style={{ border: 'none', minWidth: 160 }}
              />
            }
          >
            <button type="button" className="login-toolbar-btn" aria-label={t('pages.settings.language')}>
              <TranslationOutlined />
            </button>
          </Popover>
        </div>

        <div className="login-wrap">
          <aside className="login-figure" aria-hidden="true">
            <img
              className="login-figure-img"
              src={`${basePath}img/cyrus.jpg`}
              alt=""
              loading="eager"
              decoding="async"
            />
          </aside>

          {!fetched ? (
            <div className="login-loading">
              <Spin size="large" />
            </div>
          ) : (
            <div className="login-card">
              <div className="login-brand">
                <div className="login-logo-wrap">
                  <KouroshLogo size={54} />
                </div>
                <div className="login-headline">
                  <h1 className="login-headline-main">KOUROSH</h1>
                  <p className="login-headline-sub">{t('pages.login.title')}</p>
                </div>
              </div>

              <div className="login-quote" dir={isFa ? 'rtl' : 'ltr'} key={quoteIndex}>
                {isFa ? quote.fa : quote.en}
                <strong>{isFa ? quote.authorFa : quote.authorEn}</strong>
              </div>

              <FormProvider {...methods}>
                <Form layout="vertical" className="login-form" onFinish={methods.handleSubmit(onSubmit)}>
                  <FormField
                    name="username"
                    rules={{ validate: rhfZodValidate(LoginFormSchema.shape.username) }}
                  >
                    <Floating filled={!!values.username} label={t('username')}>
                      <Input prefix={<UserOutlined />} autoComplete="username" size="large" autoFocus />
                    </Floating>
                  </FormField>

                  <FormField
                    name="password"
                    rules={{ validate: rhfZodValidate(LoginFormSchema.shape.password) }}
                  >
                    <Floating filled={!!values.password} label={t('password')}>
                      <Input.Password prefix={<LockOutlined />} autoComplete="current-password" size="large" />
                    </Floating>
                  </FormField>

                  {twoFactorEnable && (
                    <FormField
                      name="twoFactorCode"
                      rules={{ validate: rhfZodValidate(TwoFactorCodeSchema) }}
                    >
                      <Floating filled={!!values.twoFactorCode} label={t('twoFactorCode')}>
                        <Input prefix={<KeyOutlined />} autoComplete="one-time-code" size="large" />
                      </Floating>
                    </FormField>
                  )}

                  <Form.Item className="submit-row">
                    <Button type="primary" htmlType="submit" loading={submitting} size="large" block>
                      {t('login')}
                    </Button>
                  </Form.Item>
                </Form>
              </FormProvider>
            </div>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}
