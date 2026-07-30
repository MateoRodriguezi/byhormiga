"use client";

import { motion } from "framer-motion";
import { RotatingPhotos } from "@/components/RotatingPhotos";
import type { StoryBlock } from "@/lib/types";

export function StoryBlocksSection({ storyBlocks }: { storyBlocks: StoryBlock[] }) {
	return (
		<section className="bg-[#0a0908] py-10 lg:py-14 px-4 sm:px-6 lg:px-12 border-t border-white/[.08]">
			<div className="max-w-[1200px] mx-auto">
				<div className="space-y-10 lg:space-y-14">
					{storyBlocks.map((block, index) => {
						const imageFirst = index % 2 === 1;

						return (
							<motion.div
								key={`${block.title}-${index}`}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: index * 0.08 }}
								className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-center"
							>
								<div className={`lg:col-span-3 ${imageFirst ? "lg:order-1" : "lg:order-2"}`}>
									{block.images?.length > 0 && (
										<RotatingPhotos
											images={block.images}
											alt={block.title || "ByHormiga"}
											className="aspect-[4/3]"
										/>
									)}
								</div>

								<div className={`lg:col-span-2 ${imageFirst ? "lg:order-2" : "lg:order-1"}`}>
									{block.title && (
										<h3 className="text-2xl lg:text-3xl font-black text-white font-heading tracking-[-0.035em] mb-4">
											{block.title}
										</h3>
									)}
									<p
										className="max-w-lg lg:max-w-none text-gray-400 leading-relaxed text-balance text-base lg:text-lg [&_strong]:font-bold [&_strong]:text-white"
										dangerouslySetInnerHTML={{ __html: block.text }}
									/>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
