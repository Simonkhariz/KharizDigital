import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/**
 * Maps each template slug to its page component.
 * Every template is loaded on demand so a visitor only downloads the one they open.
 */
export const templateComponents: Record<string, ComponentType> = {
  "ai-consulting": dynamic(() => import("./ai-consulting/AiConsultingTemplate")),
  "ai-email-platform": dynamic(() => import("./ai-email-platform/AiEmailPlatformTemplate")),
  "ai-ugc-creator": dynamic(() => import("./ai-ugc-creator/AiUgcCreatorTemplate")),
  "auto-detailing": dynamic(() => import("./auto-detailing/AutoDetailingTemplate")),
  "boutique-hotel": dynamic(() => import("./boutique-hotel/BoutiqueHotelTemplate")),
  "coffee-shop": dynamic(() => import("./coffee-shop/CoffeeShopTemplate")),
  "creative-portfolio": dynamic(() => import("./creative-portfolio/CreativePortfolioTemplate")),
  "dental-practice": dynamic(() => import("./dental-practice/DentalPracticeTemplate")),
  "hvac-management": dynamic(() => import("./hvac-management/HvacManagementTemplate")),
  "landscaping-services": dynamic(
    () => import("./landscaping-services/LandscapingServicesTemplate"),
  ),
  "luxury-real-estate": dynamic(() => import("./luxury-real-estate/LuxuryRealEstateTemplate")),
  "med-spa": dynamic(() => import("./med-spa/MedSpaTemplate")),
  "natural-skincare": dynamic(() => import("./natural-skincare/NaturalSkincareTemplate")),
  "perfume-brand": dynamic(() => import("./perfume-brand/PerfumeBrandTemplate")),
  "personal-blogger": dynamic(() => import("./personal-blogger/PersonalBloggerTemplate")),
  "plumbing-services": dynamic(() => import("./plumbing-services/PlumbingServicesTemplate")),
  "product-showcase": dynamic(() => import("./product-showcase/ProductShowcaseTemplate")),
  "real-estate-agency": dynamic(() => import("./real-estate-agency/RealEstateAgencyTemplate")),
  "roofing-company": dynamic(() => import("./roofing-company/RoofingCompanyTemplate")),
  "saas-platform": dynamic(() => import("./saas-platform/SaasPlatformTemplate")),
  "travel-agency": dynamic(() => import("./travel-agency/TravelAgencyTemplate")),
  "web-agency": dynamic(() => import("./web-agency/WebAgencyTemplate")),
  "wellness-center": dynamic(() => import("./wellness-center/WellnessCenterTemplate")),
};
