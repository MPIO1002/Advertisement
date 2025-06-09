export function getMobileOS(): "android" | "ios" | "other" {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  if (/android/i.test(userAgent)) return "android";
  if (/iPad|iPhone|iPod/.test(userAgent) && !('MSStream' in window)) return "ios";
  return "other";
}