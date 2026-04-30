type EnvOptions = {
  required?: boolean;
  default?: string;
};

export function env(name: string, options: { required: true }): string;
export function env(name: string, options?: EnvOptions): string | undefined;
export function env(name: string, options: EnvOptions = {}): string | undefined {
  const value = process.env[name];
  if (value === undefined || value === '') {
    if (options.required) {
      throw new Error(`Missing required environment variable: ${name}`);
    }
    return options.default;
  }
  return value;
}
