import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AboutHeroSection } from "@/components/sections/AboutHeroSection";
import { StoryBlocksSection } from "@/components/sections/StoryBlocksSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { getAboutContent } from "@/lib/api";
// import { TeamSection } from "@/components/sections/TeamSection";

export default async function NosotrosPage() {
	const about = await getAboutContent();

	return (
		<>
			<Navbar />
			<main>
				<AboutHeroSection title={about.hero_title} />
				<StoryBlocksSection storyBlocks={about.story_blocks} />
				<StatsSection stats={about.stats} />
				{/* Oculta temporalmente: todavia no hay contenido real del equipo cargado */}
				{/* <TeamSection /> */}
			</main>
			<Footer />
		</>
	);
}
