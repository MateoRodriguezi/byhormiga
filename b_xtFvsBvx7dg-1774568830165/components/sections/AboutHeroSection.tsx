"use client";

import { motion } from "framer-motion";

export function AboutHeroSection({ title }: { title: string }) {
	return (
		<section className="relative min-h-[60vh] bg-[#0a0908] flex items-center justify-center px-4 sm:px-6 lg:px-12 pt-24 overflow-hidden">
			<div className="absolute inset-0 z-0">
				<video
					autoPlay
					loop
					muted
					playsInline
					className="w-full h-full object-cover opacity-60"
				>
					<source src="/videos/hero-background.mp4" type="video/mp4" />
				</video>
				<div className="absolute inset-0 bg-gradient-to-b from-[#0a0908]/80 via-[#0a0908]/65 to-[#0a0908]" />
			</div>

			<div className="relative z-10 max-w-[1600px] mx-auto w-full text-center">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<h1 className="mt-6 text-5xl lg:text-7xl font-black font-heading tracking-[-0.035em] text-white">
						{title}
					</h1>
				</motion.div>
			</div>
		</section>
	);
}
