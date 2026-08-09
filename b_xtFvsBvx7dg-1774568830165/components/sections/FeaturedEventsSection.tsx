"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	type CarouselApi,
} from "@/components/ui/carousel";
import type { Event } from "@/lib/types";

const AUTOPLAY_DELAY_MS = 5000;

interface FeaturedEventsSectionProps {
	events: Event[];
}

const statusLabels: Record<Event["status"], string> = {
	"en-venta": "EN VENTA",
	agotado: "AGOTADO",
	proximamente: "PRÓXIMAMENTE",
};

function EventCard({ event, index }: { event: Event; index: number }) {
	const displayDate =
		[event.weekday, event.day, event.month].filter(Boolean).join(" ") ||
		event.date;

	return (
		<motion.div
			initial={{ opacity: 0, y: 40 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-100px" }}
			transition={{ delay: index * 0.15, duration: 0.6 }}
			className="group relative aspect-[3/4] overflow-hidden"
		>
			{event.image ? (
				<div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
					<Image
						src={event.image}
						alt={event.name}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
						className="object-cover"
					/>
				</div>
			) : (
				<div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black" />
			)}

			{/* Overlay gradient */}
			<div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />

			{/* Content */}
			<div className="relative h-full flex flex-col justify-end p-6 lg:p-8">
				{/* Status badge */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: index * 0.15 + 0.3 }}
					className="absolute top-6 right-6"
				>
					<span
						className={`text-[10px] tracking-[.2em] uppercase px-3 py-1.5 border ${
							event.status === "en-venta"
								? "border-white text-white bg-white/10 backdrop-blur-sm"
								: "border-gray-600 text-gray-400 bg-gray-900/50 backdrop-blur-sm"
						}`}
					>
						{statusLabels[event.status]}
					</span>
				</motion.div>

				{/* Event name - Large */}
				<h3 className="text-4xl lg:text-5xl font-black text-white font-heading tracking-[-0.035em] mb-4 transform group-hover:translate-y-[-8px] transition-transform duration-500">
					{event.name}
				</h3>

				{/* Description - Hidden by default, shown on hover */}
				<div className="max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-500 overflow-hidden mb-4">
					<p className="text-sm text-gray-300 leading-relaxed text-balance">
						{event.description}
					</p>
				</div>

				{/* Info */}
				<div className="space-y-2 mb-6 transform group-hover:translate-y-0 translate-y-2 transition-transform duration-500">
					<div className="flex items-center gap-2 text-gray-400">
						<Calendar className="w-4 h-4" />
						<span className="text-sm">{displayDate}</span>
					</div>
					<div className="flex items-center gap-2 text-gray-400">
						<MapPin className="w-4 h-4" />
						<span className="text-sm">{event.venue}</span>
					</div>
				</div>

				{/* CTA Button */}
				<Link
					href={`/eventos/${event.slug}`}
					className="inline-flex items-center justify-center bg-white text-[#0a0908] px-6 py-3 text-[12px] font-bold tracking-[.2em] uppercase hover:bg-white/90 transition-all duration-300 transform translate-y-0 opacity-100 lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
				>
					{event.status === "en-venta" ? "COMPRAR ENTRADAS" : "MÁS INFO"}
				</Link>
			</div>

			{/* Shine effect on hover */}
			<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
		</motion.div>
	);
}

export function FeaturedEventsSection({ events }: FeaturedEventsSectionProps) {
	const featuredEvents = events.filter((event) => event.featured);

	const [api, setApi] = useState<CarouselApi>();
	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(false);
	const autoplayTimer = useRef<ReturnType<typeof setInterval> | null>(null);

	const stopAutoplay = useCallback(() => {
		if (autoplayTimer.current) {
			clearInterval(autoplayTimer.current);
			autoplayTimer.current = null;
		}
	}, []);

	const startAutoplay = useCallback(() => {
		if (!api) return;
		stopAutoplay();
		autoplayTimer.current = setInterval(() => {
			api.scrollNext();
		}, AUTOPLAY_DELAY_MS);
	}, [api, stopAutoplay]);

	useEffect(() => {
		if (!api) return;

		const onSelect = () => {
			setCanScrollPrev(api.canScrollPrev());
			setCanScrollNext(api.canScrollNext());
		};
		onSelect();
		api.on("select", onSelect);
		api.on("reInit", onSelect);

		startAutoplay();
		api.on("pointerDown", stopAutoplay);

		return () => {
			stopAutoplay();
			api.off("select", onSelect);
			api.off("reInit", onSelect);
			api.off("pointerDown", stopAutoplay);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [api]);

	if (!featuredEvents.length) {
		return null;
	}

	return (
		<section className="bg-[#0a0908] py-10 lg:py-14 px-4 sm:px-6 lg:px-12 border-t border-white/[.08]">
			<div className="max-w-[1600px] mx-auto">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-16 flex items-end justify-between gap-6"
				>
					<div>
						<span className="text-xs sm:text-sm tracking-[.18em] text-white uppercase font-mono">
							SELECCIÓN
						</span>
						<h2 className="mt-4 text-4xl lg:text-6xl font-black font-heading tracking-[-0.035em] text-white">
							Próximos eventos
						</h2>
					</div>

					{/* Arrows */}
					<div className="hidden sm:flex items-center gap-3 shrink-0 mb-2">
						<button
							type="button"
							aria-label="Evento anterior"
							onClick={() => {
								stopAutoplay();
								api?.scrollPrev();
							}}
							disabled={!canScrollPrev}
							className="flex items-center justify-center size-11 border border-white/30 text-white transition-colors duration-300 hover:bg-white hover:text-[#0a0908] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white"
						>
							<ArrowLeft className="size-4" />
						</button>
						<button
							type="button"
							aria-label="Siguiente evento"
							onClick={() => {
								stopAutoplay();
								api?.scrollNext();
							}}
							disabled={!canScrollNext}
							className="flex items-center justify-center size-11 border border-white/30 text-white transition-colors duration-300 hover:bg-white hover:text-[#0a0908] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white"
						>
							<ArrowRight className="size-4" />
						</button>
					</div>
				</motion.div>

				{/* Events - carrusel horizontal tipo passline */}
				<Carousel
					setApi={setApi}
					opts={{ loop: true, align: "start" }}
					className="-mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-12 lg:px-12"
					onMouseEnter={stopAutoplay}
					onMouseLeave={startAutoplay}
				>
					<CarouselContent>
						{featuredEvents.map((event, index) => (
							<CarouselItem
								key={event.slug}
								className="basis-[78%] sm:basis-[55%] md:basis-1/2 lg:basis-1/3"
							>
								<EventCard event={event} index={index} />
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</section>
	);
}
