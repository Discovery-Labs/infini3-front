import { hasWindow } from "./helpers";

export function isBrowser(): boolean {
  return hasWindow;
}
