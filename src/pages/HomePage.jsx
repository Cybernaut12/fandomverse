import { Hero } from '@/components/home/Hero';
import { CategoryDiscovery } from '@/components/home/CategoryDiscovery';
import { FeaturedContent } from '@/components/home/FeaturedContent';
import { FeaturedHighlights } from '@/components/home/FeaturedHighlights';
import { CharacterSpotlight } from '@/components/home/CharacterSpotlight';
import { MediaSection } from '@/components/home/MediaSection';
import { GallerySection } from '@/components/home/GallerySection';
import { EventsSection } from '@/components/home/EventsSection';
import { ReleasesSection } from '@/components/home/ReleasesSection';
import { MerchandiseSection } from '@/components/home/MerchandiseSection';
export function HomePage() {
    return (<>
      <Hero />
      <CategoryDiscovery />
      <FeaturedContent />
      <FeaturedHighlights />
      <CharacterSpotlight />
      <MediaSection />
      <GallerySection />
      <EventsSection />
      <ReleasesSection />
      <MerchandiseSection />
    </>);
}
