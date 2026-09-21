const measurementId = "G-F44YPN95K7";
type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}
let initialized = false;

// Called after the initial page metadata is ready, including legacy URL migration.
// Subsequent pageviews belong exclusively to GA4 Enhanced Measurement (history).
export function initializeAnalytics() {
  if (
    !import.meta.env.PROD ||
    initialized ||
    location.hostname !== new URL(__SITE_URL__).hostname
  )
    return;
  initialized = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function () {
      window.dataLayer!.push(arguments);
    };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.append(script);

  document.addEventListener("click", (event) => {
    const link =
      event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>("a[href]")
        : null;
    if (!link) return;
    if (link.protocol === "mailto:") {
      window.gtag?.("event", "contact_email_click", { send_to: measurementId });
    } else if (link.classList.contains("work-card")) {
      const workId = new URL(link.href).searchParams.get("work");
      if (workId)
        window.gtag?.("event", "select_work", {
          send_to: measurementId,
          work_id: workId,
        });
    }
  });
}
