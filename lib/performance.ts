// Performance monitoring and Core Web Vitals tracking

// Extend Window interface for gtag
declare global {
	interface Window {
		gtag?: (...args: any[]) => void;
	}
}

export function reportWebVitals(metric: any) {
	if (typeof window !== "undefined") {
		// Log to console in development
		if (process.env.NODE_ENV === "development") {
			console.log("Web Vital:", metric);
		}

		// Send to analytics in production
		if (process.env.NODE_ENV === "production") {
			// Send to Google Analytics or other analytics service
			if (window.gtag) {
				window.gtag("event", metric.name, {
					value: Math.round(
						metric.name === "CLS" ? metric.value * 1000 : metric.value
					),
					event_category: "Web Vitals",
					event_label: metric.id,
					non_interaction: true,
				});
			}
		}
	}
}

// Preload critical resources
export function preloadCriticalResources() {
	if (typeof window !== "undefined") {
		// Preload critical fonts
		const fontLink = document.createElement("link");
		fontLink.rel = "preload";
		fontLink.href =
			"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
		fontLink.as = "style";
		fontLink.onload = function () {
			(this as any).onload = null;
			(this as any).rel = "stylesheet";
		};
		document.head.appendChild(fontLink);
	}
}
