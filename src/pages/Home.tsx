import MainLayout from "../layouts/MainLayout";

import Header from "../components/Header";
import SeamlessTransition from "../components/SeamlessTransition";
import Hero from "../components/Hero";
import Team from "../components/Team";
import Works from "../components/OurWorks";
import Images from "../components/Images";
import Gallery from "../components/Gallery";
import FAQs from "../components/FAQs";
import Feedback from "../components/Feedback";
import FollowUs from "../components/FollowUs";
import CustomerFeedbacks from "../components/CustomerFeedbacks";
import Footer from "../components/Footer";
import Booking from "../components/Booking";
import FloatingWhatsapp from "../components/FloatingWhatsapp";

export default function Home() {
  return (
    <MainLayout>
      <Header />
      <SeamlessTransition />
      <Hero />
      <Team />
      <Works />
      <Images />   
      <Gallery />   
      <FAQs />
      <Feedback />
      <FollowUs />
      <CustomerFeedbacks />
      <Booking />
      <Footer />
      <FloatingWhatsapp />
    </MainLayout >
  );
}