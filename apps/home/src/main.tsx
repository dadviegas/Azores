// Async boundary for Module Federation. See bootstrap.tsx for the actual
// app render. The dynamic import gives MF a tick to wire up shared deps
// before any app code touches them.
import("./bootstrap");
