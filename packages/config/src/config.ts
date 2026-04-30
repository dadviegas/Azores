import { resolve } from 'node:path';
import { env } from './env.js';
import { loadFirstEnvFile } from './loader.js';

// Auto-load a local env file from cwd if present. CI/production rely on real
// environment variables (e.g. GitHub Secrets) and these files won't exist.
loadFirstEnvFile([
  resolve(process.cwd(), '.env.yml'),
  resolve(process.cwd(), '.env.yaml'),
  resolve(process.cwd(), '.env'),
]);

export type NodeEnv = 'development' | 'test' | 'production';

export type Config = {
  nodeEnv: NodeEnv;
  isProduction: boolean;
  isDevelopment: boolean;
  isTest: boolean;
  app: {
    name: string;
    port: number;
    publicUrl: string;
    basePath: string;
  };
  api: {
    baseUrl: string;
    key: string;
  };
};

function parseNodeEnv(value: string | undefined): NodeEnv {
  if (value === 'production' || value === 'test') return value;
  return 'development';
}

function parsePort(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const n = Number(value);
  if (!Number.isInteger(n) || n <= 0 || n > 65535) {
    throw new Error(`Invalid port: ${value}`);
  }
  return n;
}

function build(): Config {
  const nodeEnv = parseNodeEnv(env('NODE_ENV'));
  return {
    nodeEnv,
    isProduction: nodeEnv === 'production',
    isDevelopment: nodeEnv === 'development',
    isTest: nodeEnv === 'test',
    app: {
      name: env('APP_NAME', { default: 'azores' })!,
      port: parsePort(env('PORT'), 3000),
      publicUrl: env('PUBLIC_URL', { default: 'http://localhost:3000' })!,
      basePath: env('PAGES_BASE', { default: '/' })!,
    },
    api: {
      baseUrl: env('API_BASE_URL', { default: 'http://localhost:3001' })!,
      key: env('API_KEY', { required: nodeEnv === 'production' }) ?? '',
    },
  };
}

export const config: Config = build();
