import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NewsTicker from "@/components/NewsTicker";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import RecoveryTracker from "@/components/RecoveryTracker";
import SocialFeed from "@/components/SocialFeed";
import TreatmentsSection from "@/components/TreatmentsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <NewsTicker />
      <Header />
      <HeroSection />
      <SocialFeed />
      <RecoveryTracker />
      <TreatmentsSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </>
  );
}
