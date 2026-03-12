
export function trackEvent(eventName: string, params?: Record<string, any>) {
  // GA4
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, params)
  }
  // Plausible
  if (typeof window !== "undefined" && (window as any).plausible) {
    (window as any).plausible(eventName, { props: params })
  }
}