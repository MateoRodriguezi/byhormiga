"use client";

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

// Oculta temporalmente: todavia no hay contenido real del equipo cargado
export function TeamSection() {
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
