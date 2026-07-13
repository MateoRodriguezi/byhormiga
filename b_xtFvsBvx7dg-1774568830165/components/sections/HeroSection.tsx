"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { InteractiveButton } from "@/components/ui/InteractiveButton";

const rotatingTexts = ["momentos únicos", "experiencias inolvidables"];

export function HeroSection() {
	const [currentTextIndex, setCurrentTextIndex] = useState(0);
	const [showContent, setShowContent] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setShowContent(true);
		}, 100);

		return () => clearTimeout(timeout);
	}, []);

	return (
		<section className="relative min-h-screen bg-[#0a0908] flex flex-col justify-end pb-12 md:pb-16 lg:pb-24 px-4 sm:px-6 lg:px-12 overflow-hidden">
			{/* Background Video */}
			<motion.div
				initial={{ opacity: 0.75 }}
				animate={{ opacity: showContent ? 1 : 0.75 }}
				transition={{ duration: 1.2, ease: "easeOut" }}
				className="absolute inset-0 z-0"
			>
				<video
					autoPlay
					loop
					muted
					playsInline
					className="w-full h-full object-cover opacity-70"
				>
					<source src="/videos/hero-background.mp4" type="video/mp4" />
				</video>
				<motion.div
					initial={{ opacity: 0.35 }}
					animate={{ opacity: showContent ? 0.68 : 0.35 }}
					transition={{ duration: 1.2, ease: "easeOut" }}
					className="absolute inset-0 bg-gradient-to-b from-[#0a0908]/70 via-[#0a0908]/50 to-[#0a0908]"
				/>
			</motion.div>

			{/* Background Logo with overlay effect */}
			<div className="absolute top-1/4 right-0 opacity-[0.08] pointer-events-none hidden sm:block z-[1] mix-blend-overlay">
				<Image
					src="/images/logo-hormiga.png"
					alt=""
					width={500}
					height={500}
					className="w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px] object-contain"
				/>
			</div>

			{/* Main content */}
			<div className="relative z-10 max-w-[1600px] mx-auto w-full flex flex-col items-center text-center">

				{/* Main Logo */}
				<motion.div
					initial={{ opacity: 0, y: 40, scale: 0.92 }}
					animate={
						showContent
							? { opacity: 1, y: 0, scale: 1 }
							: { opacity: 0, y: 40, scale: 0.92 }
					}
					transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
					className="flex justify-center"
				>
					<Image
						src="/images/logo.png"
						alt="ByHormiga"
						width={2060}
						height={396}
						priority
						className="w-[min(84vw,900px)] h-auto object-contain brightness-0 invert"
					/>
				</motion.div>

				{/* Tagline with rotating text */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{ delay: showContent ? 0.35 : 0, duration: 0.6 }}
					className="mt-8 text-base lg:text-xl max-w-2xl leading-relaxed"
				>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-x-2 gap-y-1 text-center">
						<span className="text-gray-400">Dedicados a crear</span>
						<div className="relative inline-block text-center">
							<AnimatePresence mode="wait">
								<motion.span
									key={currentTextIndex}
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									exit={{ y: -20, opacity: 0 }}
									transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
									className="block text-white font-bold"
								>
									{rotatingTexts[currentTextIndex]}
								</motion.span>
							</AnimatePresence>
						</div>
					</div>
				</motion.div>

				{/* CTA Buttons */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{ delay: showContent ? 0.5 : 0, duration: 0.6 }}
					className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
				>
					<InteractiveButton href="/#contacto" variant="outline">
						Trabajemos juntos
					</InteractiveButton>
					<InteractiveButton href="/eventos/todos" variant="outline">
						Ver Eventos
					</InteractiveButton>
				</motion.div>

				<motion.span
					initial={{ opacity: 0, y: 20 }}
					animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{ delay: showContent ? 0.65 : 0, duration: 0.6 }}
					className="mt-6 text-[12px] tracking-[.2em] text-white uppercase text-center"
				>
					Montevideo, Uruguay
				</motion.span>
			</div>

			{/* Scroll indicator - bottom right */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={showContent ? { opacity: 1 } : { opacity: 0 }}
				transition={{ delay: showContent ? 0.7 : 0, duration: 0.6 }}
				className="absolute bottom-8 right-6 lg:right-12 hidden lg:flex flex-col items-center gap-4"
			>
				<span className="text-[12px] tracking-[.25em] text-gray-500 uppercase origin-center rotate-90 translate-y-6">
					SCROLL
				</span>
				<div className="w-px h-16 bg-white/20 relative overflow-hidden mt-8">
					<div className="absolute inset-0 bg-white animate-scroll-line" />
				</div>
			</motion.div>
		</section>
	);
}
