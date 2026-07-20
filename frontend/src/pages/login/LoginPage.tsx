import { useCallback, useEffect, useState } from 'react';
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

import { FormProvider, useForm } from 'react-hook-form';
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
const QUOTE_INTERVAL_MS = 7000;

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
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * QUOTES.length));
  const methods = useForm<LoginForm>({ defaultValues: { username: '', password: '', twoFactorCode: '' } });
  const [lang, setLang] = useState<string>(() => LanguageManager.getLanguage());
  const isFa = lang.startsWith('fa');

  useEffect(() => {
    const timer = window.setInterval(() => {
      setQuoteIndex((i) => (i + 1) % QUOTES.length);
    }, QUOTE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, []);

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

  const onSubmit = useCallback(async (values: LoginForm) => {
    setSubmitting(true);
    try {
      const msg = await HttpUtil.post('/login', values);
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
        <div className="login-toolbar">
          <button
            type="button"
            className="login-toolbar-btn"
            aria-label={t('menu.theme')}
            title={t('menu.theme')}
            onClick={cycleTheme}
          >
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

        <div className="login-split">
          <aside className="login-hero" aria-hidden="true">
            <div className="hero-arch">
              <img
                src={`${basePath}img/cyrus.jpg`}
                alt=""
                className="hero-image"
                loading="eager"
                decoding="async"
              />
              <div className="hero-image-veil" />
            </div>
            <div className="hero-caption" dir={isFa ? 'rtl' : 'ltr'}>
              <p className="hero-quote" key={quoteIndex}>
                {isFa ? quote.fa : quote.en}
              </p>
              <span className="hero-author">
                {isFa ? quote.authorFa : quote.authorEn}
              </span>
            </div>
            <div className="hero-frieze" />
          </aside>

          <main className="login-side">
            {!fetched ? (
              <div className="login-loading">
                <Spin size="large" />
              </div>
            ) : (
              <div className="login-container">
                <div className="login-brand">
                  <div className="login-logo-wrap">
                    <KouroshLogo size={62} />
                  </div>
                  <div className="login-headline">
                    <h1 className="login-headline-main">KOUROSH</h1>
                    <p className="login-headline-sub">{t('pages.login.title')}</p>
                  </div>
                </div>

                <FormProvider {...methods}>
                  <Form
                    layout="vertical"
                    className="login-form"
                    onFinish={methods.handleSubmit(onSubmit)}
                  >
                    <FormField
                      name="username"
                      rules={{ validate: rhfZodValidate(LoginFormSchema.shape.username) }}
                    >
                      <Input
                        prefix={<UserOutlined />}
                        autoComplete="username"
                        size="large"
                        placeholder={t('username')}
                        autoFocus
                      />
                    </FormField>

                    <FormField
                      name="password"
                      rules={{ validate: rhfZodValidate(LoginFormSchema.shape.password) }}
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        autoComplete="current-password"
                        size="large"
                        placeholder={t('password')}
                      />
                    </FormField>

                    {twoFactorEnable && (
                      <FormField
                        name="twoFactorCode"
                        rules={{ validate: rhfZodValidate(TwoFactorCodeSchema) }}
                      >
                        <Input
                          prefix={<KeyOutlined />}
                          autoComplete="one-time-code"
                          size="large"
                          placeholder={t('twoFactorCode')}
                        />
                      </FormField>
                    )}

                    <Form.Item className="submit-row">
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={submitting}
                        size="large"
                        block
                      >
                        {t('login')}
                      </Button>
                    </Form.Item>
                  </Form>
                </FormProvider>

                <div className="login-mobile-quote" dir={isFa ? 'rtl' : 'ltr'}>
                  <p key={quoteIndex}>{isFa ? quote.fa : quote.en}</p>
                  <span>{isFa ? quote.authorFa : quote.authorEn}</span>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </ConfigProvider>
  );
}
