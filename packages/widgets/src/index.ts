// @azores/widgets — every Azores widget, with its YAML manifest and a lazy
// component thunk. Apps consume `widgetRegistry` and the `useSource` hook
// from @azores/dataprovider; they don't import widget components directly.

export {
  widgetRegistry,
  widgetCatalog,
  collectAllowedSources,
  WIDGET_CATEGORY_ORDER,
  type WidgetEntry,
  type CatalogEntry,
  type WidgetCategory,
} from "./registry.js";
export { NEWS_PRESETS, type NewsPreset, type NewsRegion } from "./News/presets.js";
export type { WidgetProps } from "./widget.js";
