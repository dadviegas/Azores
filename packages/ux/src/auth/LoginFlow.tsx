import { useState, type FormEvent } from "react";
import { BrandMark, Button, Icon } from "@azores/ui";
import * as S from "./LoginFlow.styles.js";

export type LoginProvider = "github" | "google" | "sso";

export type LoginCredentials = { email: string; password: string };

export type LoginFlowProps = {
  onLogin?: (creds: LoginCredentials) => void | Promise<void>;
  onProvider?: (provider: LoginProvider) => void;
  onForgotPassword?: () => void;
  onCreateAccount?: () => void;
};

const STATS: ReadonlyArray<readonly [string, string]> = [
  ["UPTIME", "99.997%"],
  ["REGIONS", "14"],
  ["P99 LATENCY", "32ms"],
];

export const LoginFlow = ({
  onLogin,
  onProvider,
  onForgotPassword,
  onCreateAccount,
}: LoginFlowProps): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await onLogin?.({ email, password });
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Root>
      <S.FormPane>
        <S.BrandRow>
          <BrandMark size="md" />
          <S.BrandText>
            <S.BrandName>Azores</S.BrandName>
            <S.BrandTag>DESIGN SYSTEM</S.BrandTag>
          </S.BrandText>
        </S.BrandRow>

        <S.Eyebrow>WELCOME BACK</S.Eyebrow>
        <S.Title>Sign in to your console.</S.Title>
        <S.Lede>
          Continue with email or your SSO provider. We&apos;ll remember this
          device for 30 days.
        </S.Lede>

        <S.Form onSubmit={submit}>
          <S.ProviderRow>
            <Button
              type="button"
              size="md"
              style={{ flex: 1 }}
              onClick={() => onProvider?.("github")}
            >
              <Icon name="git" size={14} />
              GitHub
            </Button>
            <Button
              type="button"
              size="md"
              style={{ flex: 1 }}
              onClick={() => onProvider?.("google")}
            >
              <Icon name="globe" size={14} />
              Google
            </Button>
            <Button
              type="button"
              size="md"
              style={{ flex: 1 }}
              onClick={() => onProvider?.("sso")}
            >
              <Icon name="key" size={14} />
              SSO
            </Button>
          </S.ProviderRow>

          <S.Divider>OR CONTINUE WITH EMAIL</S.Divider>

          <div>
            <label htmlFor="az-login-email" style={{ display: "block", marginBottom: 6, fontSize: "var(--az-fs-sm)", fontWeight: 500, color: "var(--az-text-2)" }}>
              Email
            </label>
            <S.InputGroup>
              <S.InputAddon>
                <Icon name="mail" size={14} />
              </S.InputAddon>
              <input
                id="az-login-email"
                type="email"
                placeholder="you@azores.dev"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                autoComplete="email"
                required
              />
            </S.InputGroup>
          </div>

          <div>
            <S.FieldHead>
              <label htmlFor="az-login-pass" style={{ fontSize: "var(--az-fs-sm)", fontWeight: 500, color: "var(--az-text-2)" }}>
                Password
              </label>
              {onForgotPassword ? (
                <S.ForgotLink
                  onClick={(e) => {
                    e.preventDefault();
                    onForgotPassword();
                  }}
                >
                  Forgot?
                </S.ForgotLink>
              ) : null}
            </S.FieldHead>
            <S.InputGroup style={{ marginTop: 6 }}>
              <S.InputAddon>
                <Icon name="lock" size={14} />
              </S.InputAddon>
              <input
                id="az-login-pass"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </S.InputGroup>
          </div>

          <S.Checkbox>
            <input type="checkbox" defaultChecked />
            Keep me signed in for 30 days
          </S.Checkbox>

          <Button
            type="submit"
            variant="ocean"
            size="lg"
            disabled={loading}
            style={{ marginTop: 8 }}
          >
            {loading ? (
              <>
                <S.Spinner aria-hidden />
                Signing in…
              </>
            ) : (
              <>
                Sign in
                <Icon name="arrowright" size={14} />
              </>
            )}
          </Button>

          {onCreateAccount ? (
            <S.Footnote>
              New to Azores?{" "}
              <a
                onClick={(e) => {
                  e.preventDefault();
                  onCreateAccount();
                }}
              >
                Create an account →
              </a>
            </S.Footnote>
          ) : null}
        </S.Form>

        <S.Legal>
          <span>© 2026 Azores Cloud, S.A.</span>
          <a>Privacy</a>
          <a>Terms</a>
          <a>Status</a>
        </S.Legal>
      </S.FormPane>

      <S.VisualPane aria-hidden="true">
        <S.Topo viewBox="0 0 600 600" preserveAspectRatio="none">
          <g fill="none" stroke="white" strokeWidth="1">
            <path d="M0 300 Q 150 220 300 290 T 600 270" />
            <path d="M0 340 Q 150 260 300 330 T 600 310" />
            <path d="M0 380 Q 150 300 300 370 T 600 350" />
            <path d="M0 260 Q 150 180 300 250 T 600 230" />
            <path d="M0 220 Q 150 140 300 210 T 600 190" />
            <path d="M0 420 Q 150 340 300 410 T 600 390" />
            <path d="M0 180 Q 150 100 300 170 T 600 150" />
          </g>
          <g fill="none" stroke="#E07B53" strokeWidth="1.5" opacity="0.6">
            <circle cx="380" cy="280" r="40" />
            <circle cx="380" cy="280" r="80" />
            <circle cx="380" cy="280" r="130" />
          </g>
        </S.Topo>

        <S.VisualHeader>
          <S.Coords>37.7°N · 25.4°W · ATLANTIC</S.Coords>
          <S.Ticks>
            {[0, 1, 2, 3].map((i) => (
              <S.Tick key={i} $active={i === 0} />
            ))}
          </S.Ticks>
        </S.VisualHeader>

        <S.VisualBody>
          <S.Headline>
            Build at the
            <br />
            edge of the
            <br />
            Atlantic.
          </S.Headline>
          <S.HeadlineLede>
            Azores is a low-latency cloud platform for engineering teams who
            care about craft, reliability, and the feel of the tools they ship
            every day.
          </S.HeadlineLede>
        </S.VisualBody>

        <S.Stats>
          {STATS.map(([k, v]) => (
            <div key={k}>
              <S.StatLabel>{k}</S.StatLabel>
              <S.StatValue>{v}</S.StatValue>
            </div>
          ))}
        </S.Stats>
      </S.VisualPane>
    </S.Root>
  );
};
