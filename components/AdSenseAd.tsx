"use client";

interface AdSenseAdProps {
	slot: string;
	format?: string;
	responsive?: boolean;
	style?: React.CSSProperties;
	className?: string;
}

export default function AdSenseAd({
	slot,
	format = "auto",
	responsive = true,
	style = { display: "block" },
	className = "",
}: AdSenseAdProps) {
	// This component will be ready for AdSense integration
	// For now, it shows a placeholder that's SEO-friendly

	return (
		<div className={`adsense-placeholder ${className}`} style={style}>
			<div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
				<div className="space-y-2">
					<svg
						className="w-12 h-12 text-gray-400 mx-auto"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
						/>
					</svg>
					<p className="text-sm text-gray-500 font-medium">
						Advertisement Space
					</p>
					<p className="text-xs text-gray-400">
						Supporting free education for Bihar nursing students
					</p>
				</div>
			</div>

			{/* Actual AdSense code will go here when ready */}
			{/* 
			<ins 
				className="adsbygoogle"
				style={style}
				data-ad-client="ca-pub-XXXXXXXXXX"
				data-ad-slot={slot}
				data-ad-format={format}
				data-full-width-responsive={responsive.toString()}
			></ins>
			*/}
		</div>
	);
}
