// @azores/widgets — every Azores widget, with its YAML manifest and a lazy
// component thunk. Apps consume `widgetRegistry` and the `useSource` hook
// from @azores/dataprovider; they don't import widget components directly.

export { widgetRegistry, collectAllowedSources, type WidgetEntry } from "./registry.js";
export type { WidgetProps } from "./widget.js";
