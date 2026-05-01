declare const __AZORES_BASE_PATH__: string;

declare module "*.css";

declare module "*.yaml" {
  const value: unknown;
  export default value;
}
declare module "*.yml" {
  const value: unknown;
  export default value;
}
