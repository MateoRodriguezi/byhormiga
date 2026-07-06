"use client";

import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const teamMembers = [
	{
		name: "Fernando Herrero",
		role: "Fundador & Director",
		bio: "Con más de 30 años de experiencia en la industria del entretenimiento, Fernando fundó ByHormiga con la visión de crear experiencias que trascienden.",
		image: "/team/fernando.jpg",
	},
	{
		name: "Equipo Creativo",
		role: "Diseño & Producción",
		bio: "Nuestro equipo de creativos trabaja incansablemente para dar vida a cada evento con diseño innovador y producción impecable.",
		image: "/team/creative.jpg",
	},
	{
		name: "Equipo Técnico",
		role: "Sonido & Luces",
		bio: "Expertos en tecnología audiovisual que garantizan que cada evento tenga la mejor calidad técnica.",
		image: "/team/tech.jpg",
	},
];

const storyBlocks = [
	{
		title: "El comienzo",
		text: (
			<>
				ByHormiga nació en 1996 con una misión clara:{" "}
				<span className="font-bold text-white">
					crear momentos únicos que las personas recordarán para siempre
				</span>
				. Lo que comenzó como una pequeña productora de eventos se ha convertido en la empresa líder de entretenimiento en Uruguay.
			</>
		),
		image: "/mock-photos/about-4.jpg",
	},
	{
		title: "Un crecimiento sostenido",
		text: (
			<>
				Hemos producido más de <span className="font-bold text-white">500 eventos</span>, trabajado con más de <span className="font-bold text-white">200 artistas</span> nacionales e internacionales, y creado <span className="font-bold text-white">experiencias para miles de personas</span> que confían en nosotros para los momentos más importantes de sus vidas.
			</>
		),
		image: "/mock-photos/about-6.jpg",
	},
	{
		title: "Nuestra forma de hacer",
		text: (
			<>
				Nuestra filosofía es simple: cada evento es una oportunidad para crear algo extraordinario. <span className="font-bold text-white">Combinamos creatividad, tecnología y pasión</span> para entregar experiencias que superan las expectativas.
			</>
		),
		image: "/mock-photos/about-11.jpg",
	},
];

function HeroSection() {
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
					<h1 className="mt-6 text-5xl lg:text-7xl font-black tracking-tight text-white uppercase">
						QUIÉNES SOMOS
					</h1>
					<p className="mt-8 text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
						Desde 1996, ByHormiga ha estado transformando la escena de eventos
						en Uruguay, creando experiencias inolvidables que conectan a las
						personas a través de la música, el arte y la cultura.
					</p>
				</motion.div>
			</div>
		</section>
	);
}

function AboutSection() {
	return (
		<section className="bg-[#0a0908] py-20 lg:py-32 px-4 sm:px-6 lg:px-12 border-t border-white/[.08]">
			<div className="max-w-[1200px] mx-auto">
				<div className="space-y-10 lg:space-y-14">
					{storyBlocks.map((block, index) => {
						const imageFirst = index % 2 === 1;

						return (
							<motion.div
								key={block.title}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: index * 0.08 }}
								className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
							>
								<div className={imageFirst ? "lg:order-2" : "lg:order-1"}>
									<h3 className="text-2xl lg:text-3xl font-black text-white uppercase mb-4">
										{block.title}
									</h3>
									<p className="text-gray-400 leading-relaxed text-base lg:text-lg">
										{block.text}
									</p>
								</div>

								<div className={imageFirst ? "lg:order-1" : "lg:order-2"}>
									<div className="relative aspect-[4/3] overflow-hidden border border-white/[.08] bg-white/[.03]">
										<Image
											src={block.image}
											alt={block.title}
											fill
											className="object-cover"
										/>
									</div>
								</div>
							</motion.div>
						);
					})}
				</div>

				{/* Stats Cards with Interactive Hover */}
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-14 lg:mt-20">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0 }}
						whileHover={{ scale: 1.05, y: -8 }}
						className="group border border-white/[.08] p-8 text-center cursor-pointer transition-colors duration-300 hover:bg-white hover:border-white"
					>
						<div className="text-5xl font-black text-white mb-2 group-hover:text-[#0a0908] transition-colors duration-300">
							30+
						</div>
						<div className="text-xs tracking-[.2em] text-gray-500 uppercase group-hover:text-[#0a0908]/70 transition-colors duration-300">
							Años
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.1 }}
						whileHover={{ scale: 1.05, y: -8 }}
						className="group border border-white/[.08] p-8 text-center cursor-pointer transition-colors duration-300 hover:bg-white hover:border-white"
					>
						<div className="text-5xl font-black text-white mb-2 group-hover:text-[#0a0908] transition-colors duration-300">
							500+
						</div>
						<div className="text-xs tracking-[.2em] text-gray-500 uppercase group-hover:text-[#0a0908]/70 transition-colors duration-300">
							Eventos
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
						whileHover={{ scale: 1.05, y: -8 }}
						className="group border border-white/[.08] p-8 text-center cursor-pointer transition-colors duration-300 hover:bg-white hover:border-white"
					>
						<div className="text-5xl font-black text-white mb-2 group-hover:text-[#0a0908] transition-colors duration-300">
							200+
						</div>
						<div className="text-xs tracking-[.2em] text-gray-500 uppercase group-hover:text-[#0a0908]/70 transition-colors duration-300">
							Artistas
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.3 }}
						whileHover={{ scale: 1.05, y: -8 }}
						className="group border border-white/[.08] p-8 text-center cursor-pointer transition-colors duration-300 hover:bg-white hover:border-white"
					>
						<div className="text-5xl font-black text-white mb-2 group-hover:text-[#0a0908] transition-colors duration-300">
							50+
						</div>
						<div className="text-xs tracking-[.2em] text-gray-500 uppercase group-hover:text-[#0a0908]/70 transition-colors duration-300">
							Por Mes
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

function TeamSection() {
	return (
		<section className="bg-[#0a0908] py-20 lg:py-32 px-4 sm:px-6 lg:px-12 border-t border-white/[.08]">
			<div className="max-w-[1600px] mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<span className="text-xs sm:text-sm tracking-[.25em] text-white uppercase font-mono">
						EL EQUIPO
					</span>
					<h2 className="mt-4 text-4xl lg:text-6xl font-black tracking-tight text-white uppercase">
						NUESTRO EQUIPO
					</h2>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
					{teamMembers.map((member, index) => (
						<motion.div
							key={member.name}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.15, duration: 0.6 }}
							className="group"
						>
							{/* Photo placeholder */}
							<div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 mb-6 overflow-hidden">
								<div className="w-full h-full flex items-center justify-center text-white/20 text-6xl font-black">
									{member.name.charAt(0)}
								</div>
							</div>

							{/* Info */}
							<h3 className="text-xl font-bold text-white uppercase mb-2">
								{member.name}
							</h3>
							<p className="text-xs tracking-[.2em] text-gray-500 uppercase mb-4">
								{member.role}
							</p>
							<p className="text-sm text-gray-400 leading-relaxed">
								{member.bio}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

export default function NosotrosPage() {
	return (
		<>
			<Navbar />
			<main>
				<HeroSection />
				<AboutSection />
				{/* Oculta temporalmente: todavia no hay contenido real del equipo cargado */}
				{/* <TeamSection /> */}
			</main>
			<Footer />
		</>
	);
}
