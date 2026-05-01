// Bundled YAML imports resolve to plain JS objects via the rspack yaml-loader
// rule wired into each app's rspack.config.mjs. Shape is unknown at the type
// system level — call `parseWidgetManifest` / `parseSourceManifest` to pin
// the schema.
declare module "*.yaml" {
  const value: unknown;
  export default value;
}
declare module "*.yml" {
  const value: unknown;
  export default value;
}
