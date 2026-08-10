"use client";

import { useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import type { Event } from "@/lib/types";

// Velocidad del desplazamiento continuo, en pixeles por segundo. Baja = mas lento.
const SCROLL_SPEED_PX_PER_SEC = 30;
// Cuanto esperar tras soltar/hacer click antes de retomar el desplazamiento automatico.
const RESUME_DELAY_MS = 1200;

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
			transition={{ delay: Math.min(index, 4) * 0.15, duration: 0.6 }}
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
						draggable={false}
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
				<div className="absolute top-6 right-6">
					<span
						className={`text-[10px] tracking-[.2em] uppercase px-3 py-1.5 border ${
							event.status === "en-venta"
								? "border-white text-white bg-white/10 backdrop-blur-sm"
								: "border-gray-600 text-gray-400 bg-gray-900/50 backdrop-blur-sm"
						}`}
					>
						{statusLabels[event.status]}
					</span>
				</div>

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
	const canLoop = featuredEvents.length > 1;
	// Se duplica la lista para poder resetear el scroll sin que se note el salto.
	const trackItems = canLoop ? [...featuredEvents, ...featuredEvents] : featuredEvents;

	const trackRef = useRef<HTMLDivElement>(null);
	const pausedRef = useRef(false);
	const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const dragStateRef = useRef<{ pointerId: number; startX: number; startY: number; dragging: boolean } | null>(null);

	const pause = useCallback(() => {
		if (resumeTimeoutRef.current) {
			clearTimeout(resumeTimeoutRef.current);
			resumeTimeoutRef.current = null;
		}
		pausedRef.current = true;
	}, []);

	const resumeSoon = useCallback(() => {
		if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
		resumeTimeoutRef.current = setTimeout(() => {
			pausedRef.current = false;
		}, RESUME_DELAY_MS);
	}, []);

	useEffect(() => {
		const track = trackRef.current;
		if (!track || !canLoop) return;

		let frameId: number;
		let lastTimestamp: number | null = null;

		const step = (timestamp: number) => {
			if (lastTimestamp === null) lastTimestamp = timestamp;
			const deltaSeconds = (timestamp - lastTimestamp) / 1000;
			lastTimestamp = timestamp;

			if (!pausedRef.current) {
				track.scrollLeft += SCROLL_SPEED_PX_PER_SEC * deltaSeconds;
				const halfWidth = track.scrollWidth / 2;
				if (halfWidth > 0 && track.scrollLeft >= halfWidth) {
					track.scrollLeft -= halfWidth;
				}
			}
			frameId = requestAnimationFrame(step);
		};

		frameId = requestAnimationFrame(step);
		return () => cancelAnimationFrame(frameId);
	}, [canLoop]);

	useEffect(() => {
		return () => {
			if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
		};
	}, []);

	const DRAG_THRESHOLD_PX = 6;

	const handlePointerDown = (e: ReactPointerEvent) => {
		dragStateRef.current = { pointerId: e.pointerId, startX: e.clientX, startY: e.clientY, dragging: false };
	};

	const handlePointerMove = (e: ReactPointerEvent) => {
		const state = dragStateRef.current;
		if (!state || state.pointerId !== e.pointerId || state.dragging) return;
		const dx = Math.abs(e.clientX - state.startX);
		const dy = Math.abs(e.clientY - state.startY);
		if (dx > DRAG_THRESHOLD_PX || dy > DRAG_THRESHOLD_PX) {
			state.dragging = true;
			pause();
		}
	};

	const handlePointerUp = (e: ReactPointerEvent) => {
		const wasDragging = dragStateRef.current?.pointerId === e.pointerId && dragStateRef.current.dragging;
		dragStateRef.current = null;
		if (wasDragging) resumeSoon();
	};

	const scrollByCard = (direction: 1 | -1) => {
		const track = trackRef.current;
		if (!track) return;
		pause();
		const firstCard = track.querySelector<HTMLElement>("[data-carousel-card]");
		const amount = firstCard
			? firstCard.getBoundingClientRect().width + 16
			: track.clientWidth * 0.85;
		track.scrollBy({ left: direction * amount, behavior: "smooth" });
		resumeSoon();
	};

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
					{canLoop && (
						<div className="hidden sm:flex items-center gap-3 shrink-0 mb-2">
							<button
								type="button"
								aria-label="Evento anterior"
								onClick={() => scrollByCard(-1)}
								className="flex items-center justify-center size-11 border border-white/30 text-white transition-colors duration-300 hover:bg-white hover:text-[#0a0908]"
							>
								<ArrowLeft className="size-4" />
							</button>
							<button
								type="button"
								aria-label="Siguiente evento"
								onClick={() => scrollByCard(1)}
								className="flex items-center justify-center size-11 border border-white/30 text-white transition-colors duration-300 hover:bg-white hover:text-[#0a0908]"
							>
								<ArrowRight className="size-4" />
							</button>
						</div>
					)}
				</motion.div>

				{/* Events - carrusel horizontal continuo tipo passline */}
				<div
					ref={trackRef}
					onPointerDown={handlePointerDown}
					onPointerMove={handlePointerMove}
					onPointerUp={handlePointerUp}
					onPointerCancel={handlePointerUp}
					className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [-webkit-mask-image:linear-gradient(to_right,transparent,black_56px,black_calc(100%-56px),transparent)] [-webkit-mask-repeat:no-repeat] [mask-image:linear-gradient(to_right,transparent,black_56px,black_calc(100%-56px),transparent)] [mask-repeat:no-repeat] [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:-mx-12 lg:gap-8 lg:px-12 [&::-webkit-scrollbar]:hidden"
				>
					{trackItems.map((event, index) => (
						<div
							key={`${event.slug}-${index}`}
							data-carousel-card
							className="w-[78%] shrink-0 sm:w-[55%] md:w-1/2 lg:w-1/3"
						>
							<EventCard event={event} index={index} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
