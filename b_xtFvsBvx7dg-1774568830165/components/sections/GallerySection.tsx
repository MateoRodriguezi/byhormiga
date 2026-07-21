"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Link from "next/link";
import { getGalleryCoverImage } from "@/lib/gallery";
import type { GalleryItem } from "@/lib/types";

interface GallerySectionProps {
	items: GalleryItem[];
}

function SectionHeader() {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 30 }}
			animate={isInView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.6 }}
			className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16"
		>
			<div>
				<span className="text-xs sm:text-sm tracking-[.2em] sm:tracking-[.25em] text-white uppercase font-mono">
					NUESTRA TRAYECTORIA
				</span>
				<h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-6xl font-black tracking-tighter text-white">
					Momentos
				</h2>
			</div>
		</motion.div>
	);
}

function GalleryCell({ item, index }: { item: GalleryItem; index: number }) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-50px" });
	const coverImage = getGalleryCoverImage(item);
	const galleryImages = [
		coverImage,
		...item.photos.map((photo) => photo.image),
	].filter(
		(image, imageIndex, images): image is string =>
			Boolean(image) && images.indexOf(image) === imageIndex,
	);
	const [isHovered, setIsHovered] = useState(false);
	const [activeImageIndex, setActiveImageIndex] = useState(0);

	useEffect(() => {
		if (!isHovered || galleryImages.length < 2) {
			setActiveImageIndex(0);
			return;
		}

		const interval = setInterval(() => {
			setActiveImageIndex(
				(currentIndex) => (currentIndex + 1) % galleryImages.length,
			);
		}, 600);

		return () => clearInterval(interval);
	}, [galleryImages.length, isHovered]);

	// Determine grid span classes based on item position
	const getGridClasses = () => {
		if (index === 0) return "col-span-2 row-span-2 lg:col-span-5 lg:row-span-2";
		if (index === 1) return "col-span-1 lg:col-span-4";
		if (index === 2) return "col-span-1 lg:col-span-3";
		if (index === 3) return "col-span-1 lg:col-span-4";
		return "col-span-1 lg:col-span-3";
	};

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 30 }}
			animate={isInView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			className={`relative overflow-hidden ${getGridClasses()}`}
			style={{ minHeight: index === 0 ? "400px" : "200px" }}
		>
			<Link
				href={`/momentos/${item.slug}`}
				className="group absolute inset-0 block"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{coverImage ? (
					<AnimatePresence mode="wait">
						<motion.img
							key={galleryImages[activeImageIndex]}
							src={galleryImages[activeImageIndex]}
							alt={item.event_name}
							initial={{ opacity: 0.45 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0.45 }}
							transition={{ duration: 0.35, ease: "easeOut" }}
							className="w-full h-full object-cover transition-all duration-500 grayscale-[0.5] brightness-[0.7] group-hover:grayscale-0 group-hover:brightness-[0.9] group-hover:scale-[1.04]"
						/>
					</AnimatePresence>
				) : (
					<div
						className="absolute inset-0 transition-all duration-500 group-hover:scale-[1.04]"
						style={{
							background: `linear-gradient(${135 + index * 30}deg, #0a0908 0%, #1a1a1a ${30 + index * 10}%, #0f0f0f 100%)`,
						}}
					/>
				)}

				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

				<div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
					<h3 className="text-sm font-bold text-white uppercase tracking-wide">
						{item.event_name}
					</h3>
					<p className="mt-1 text-[12px] tracking-[.2em] text-gray-400 uppercase">
						{item.date}
					</p>
				</div>
			</Link>
		</motion.div>
	);
}

export function GallerySection({ items }: GallerySectionProps) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<section id="momentos" className="bg-[#0a0908] py-16 sm:py-24 lg:py-32">
			<div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12">
				<SectionHeader />

				{/* Masonry Grid */}
				<div className="grid grid-cols-2 lg:grid-cols-12 gap-[3px]">
					{items.map((item, index) => (
						<GalleryCell key={item.id} item={item} index={index} />
					))}
				</div>

				{/* CTA Button */}
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 0.3 }}
					className="mt-12 lg:mt-16 text-center"
				>
					<Link
						href="/momentos"
						className="inline-flex items-center justify-center border border-white/30 text-white px-8 py-4 text-[12px] font-bold tracking-[.2em] uppercase hover:bg-white hover:text-[#0a0908] transition-colors"
					>
						VER TODOS LOS MOMENTOS
					</Link>
				</motion.div>
			</div>
		</section>
	);
}
