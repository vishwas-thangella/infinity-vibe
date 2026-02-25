import { useEffect } from 'react';
import { Hero } from '../components/Hero';
import { FeaturedCollection } from '../components/FeaturedCollection';
import { BrandStory } from '../components/BrandStory';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { CustomerReviews } from '../components/CustomerReviews';
import { CTASection } from '../components/CTASection';
import { Newsletter } from '../components/Newsletter';
import { InstagramFeed } from '../components/InstagramFeed';

export default function Home() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <>
      <Hero />
      <FeaturedCollection />
      <BrandStory />
      <WhyChooseUs />
      <CustomerReviews />
      <CTASection />
      <Newsletter />
      <InstagramFeed />
    </>
  );
}
