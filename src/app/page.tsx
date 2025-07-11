import DownloadApp from '@/components/Home/DownloadApp';
import HeroSection from '@/components/Home/HeroSection';
import HowItWorks from '@/components/Home/HowItWorks';
import ReferralSection from '@/components/Home/ReferralSection';
import Testimonials from '@/components/Home/Testimonials';
import WhyChooseUs from '@/components/Home/WhyChooseUs';
import React from 'react'

const RootPage = () => {
  return (
		<div>
			<HeroSection />
			<WhyChooseUs />
			<HowItWorks />
			<ReferralSection />
			<Testimonials />
			<DownloadApp />
		</div>
	);
}

export default RootPage

