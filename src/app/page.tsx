import HeroSlider from "@/components/sections/HeroSlider";
import BenefitsBar from "@/components/sections/BenefitsBar";
import CategoriesGrid from "@/components/sections/CategoriesGrid";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import BarefootEducation from "@/components/sections/BarefootEducation";
import CustomerFavorites from "@/components/sections/CustomerFavorites";
import Testimonials from "@/components/sections/Testimonials";
import WhyBarefoot from "@/components/sections/WhyBarefoot";
import Newsletter from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <BenefitsBar />
      <CategoriesGrid />
      <FeaturedProducts />
      <BarefootEducation />
      <CustomerFavorites />
      <Testimonials />
      <WhyBarefoot />
      <Newsletter />
    </>
  );
}
