import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NewsTicker from "@/components/NewsTicker";
import BlogSection from "@/components/BlogSection";
import ShopSection from "@/components/ShopSection";
import RecoveryTracker from "@/components/RecoveryTracker";
import SocialFeed from "@/components/SocialFeed";
import TreatmentsSection from "@/components/TreatmentsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <NewsTicker />
      <BlogSection />
      <ShopSection />
      <RecoveryTracker />
      <SocialFeed />
      <TreatmentsSection />
      <Footer />
    </>
  );
}
