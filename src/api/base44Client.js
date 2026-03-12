// Base44 disabled for self-hosted WooCommerce build.
// Any module importing `base44` will now throw a clear error
// so you can remove those calls safely.

export const base44 = null;

export function assertBase44Disabled() {
  throw new Error("Base44 SDK is disabled. Remove Base44 entity/analytics/user calls.");
}