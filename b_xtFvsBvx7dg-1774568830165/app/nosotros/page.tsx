"use client";

import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StatsSection } from "@/components/sections/StatsSection";
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
		title: "¿Quiénes somos?",
		hideTitle: true,
		text: (
			<>
				Somos una <span className="font-bold text-white">productora de eventos y entretenimiento en Uruguay</span>, enfocada en crear propuestas de alta convocatoria que integran producción, contenido y ejecución profesional. Lo que comenzó como un pequeño proyecto hoy se convirtió en un referente del entretenimiento, desarrollando formatos innovadores para distintos públicos, con{" "}
				<span className="font-bold text-white">
					impacto, recordación y conexión emocional
				</span>
				.
			</>
		),
		image: "/mock-photos/about-4.jpg",
	},
	{
		title: "Nuestro crecimiento",
		hideTitle: false,
		text: (
			<>
				Al año producimos un promedio de más de <span className="font-bold text-white">200 eventos</span>, trabajamos junto a más de <span className="font-bold text-white">150 artistas</span> nacionales e internacionales y convocamos a más de <span className="font-bold text-white">200.000 personas</span>. Además, somos una de las empresas con mayor volumen de eventos para menores de 18 años en Uruguay, con un conocimiento profundo de las particularidades operativas, legales y logísticas que este tipo de producciones requiere.
			</>
		),
		image: "/mock-photos/about-6.jpg",
	},
	{
		title: "Nuestra forma de hacer",
		hideTitle: false,
		text: (
			<>
				Nuestra filosofía es simple: cada evento es una oportunidad para crear algo extraordinario. Por eso,{" "}
				<span className="font-bold text-white">
					combinamos creatividad, tecnología y pasión
				</span>{" "}
				para diseñar propuestas memorables, capaces de superar las expectativas de cada cliente.
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
					<h1 className="mt-6 text-5xl lg:text-7xl font-black font-heading tracking-[-0.035em] text-white">
						¿Quiénes somos?
					</h1>
				</motion.div>
			</div>
		</section>
	);
}

function AboutSection() {
	return (
		<section className="bg-[#0a0908] py-10 lg:py-14 px-4 sm:px-6 lg:px-12 border-t border-white/[.08]">
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
									{!block.hideTitle && (
										<h3 className="text-2xl lg:text-3xl font-black text-white font-heading tracking-[-0.035em] mb-4">
											{block.title}
										</h3>
									)}
									<p className="text-gray-400 leading-relaxed text-balance text-base lg:text-lg">
										{block.text}
									</p>
								</div>

								<div className={imageFirst ? "lg:order-1" : "lg:order-2"}>
									<div className="relative aspect-[4/3] overflow-hidden">
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

			</div>
		</section>
	);
}

function TeamSection() {
	return (
		<section className="bg-[#0a0908] py-10 lg:py-14 px-4 sm:px-6 lg:px-12 border-t border-white/[.08]">
			<div className="max-w-[1600px] mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<span className="text-xs sm:text-sm tracking-[.18em] text-white uppercase font-mono">
						EL EQUIPO
					</span>
					<h2 className="mt-4 text-4xl lg:text-6xl font-black font-heading tracking-[-0.035em] text-white">
						Nuestro equipo
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
							<p className="text-sm text-gray-400 leading-relaxed text-balance">
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
				<StatsSection />
				{/* Oculta temporalmente: todavia no hay contenido real del equipo cargado */}
				{/* <TeamSection /> */}
			</main>
			<Footer />
		</>
	);
}
