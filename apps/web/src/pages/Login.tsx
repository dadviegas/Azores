import { LoginFlow, useToast } from "@azores/ux";

export const LoginPage = (): JSX.Element => {
  const toast = useToast();
  return (
    <LoginFlow
      onLogin={async ({ email }) => {
        await new Promise((r) => setTimeout(r, 700));
        toast.push({
          kind: "success",
          title: "Signed in",
          message: `Welcome back, ${email || "catarina@azores.dev"}.`,
        });
      }}
      onProvider={(p) =>
        toast.push({
          kind: "info",
          title: `Continue with ${p}`,
          message: "Provider flow not wired in the showcase.",
        })
      }
      onForgotPassword={() =>
        toast.push({ kind: "info", title: "Reset link sent" })
      }
      onCreateAccount={() =>
        toast.push({ kind: "info", title: "Sign-up flow not wired" })
      }
    />
  );
};
