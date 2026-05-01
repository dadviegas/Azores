// Shared contract every widget conforms to. Widgets receive the chrome from
// the host Dashboard; this prop bag carries runtime config the host wants
// to pass in — currently just the manifest's TTL.

export type WidgetProps = {
  // From the widget's manifest.yaml. `null` if the manifest didn't override
  // the source-level TTL — widgets pass it straight through to `useSource`,
  // which falls back to the source default.
  ttlMs: number | null;
  // Opaque per-instance config from `DashboardWidget.data`. Live widgets
  // ignore this; data-driven widgets (KPI etc.) cast it at the boundary.
  data?: unknown;
};
