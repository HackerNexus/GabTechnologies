"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const faqs = [
  {
    question: "What security systems do you specialize in?",
    answer:
      "Gab Technologies specializes in high-end CCTV surveillance, smart home security systems, and biometric access control. We design custom solutions for both residential and commercial properties in Kenya, ensuring your premises are monitored 24/7 with the latest AI-driven detection technology.",
  },
  {
    question: "Do you provide Starlink and WiFi installation?",
    answer:
      "Yes, we are experts in high-speed connectivity. We offer professional Starlink installation, mesh WiFi networking, and structured cabling for offices. Our goal is to eliminate dead zones and provide seamless, high-bandwidth internet across your entire facility.",
  },
  {
    question: "How does your IT support service work?",
    answer:
      "We provide both on-site and remote IT support for businesses. This includes network maintenance, hardware troubleshooting, and software updates. Our team acts as your outsourced IT department, ensuring your technology infrastructure remains robust and secure.",
  },
  {
    question: "Are your smart systems mobile-compatible?",
    answer:
      "Absolutely. All our modern security and smart home installations are integrated with mobile applications. You can view live CCTV feeds, unlock doors, or manage your network settings directly from your smartphone, anywhere in the world.",
  },
];

export default function FaqAccordionCoachingValue() {
  return (
    <section
      id="techsolutionsfaq"
      className="w-full flex flex-col bg-background text-foreground"
    >
      <div className="w-full bg-gradient-to-b from-background to-accent/20 py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">

          {/* HEADING */}
          <div className="text-center mb-16">
            <span className="text-sm font-bold tracking-widest text-blue-500 uppercase mb-4 block font-default">
              Got Questions?
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-default tracking-tight text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-lg font-default">
              Everything you need to know about our security, networking, and
              IT support services.
            </p>
          </div>

          {/* ACCORDION */}
          <Accordion type="single" collapsible className="w-full space-y-10">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                data-index={i}
                className="border-none"
              >
                <AccordionTrigger className="text-blue-400 hover:text-cyan-400 font-default font-semibold text-xl md:text-2xl text-left hover:no-underline py-0 transition-colors duration-300 [&>svg]:text-ring [&>svg]:size-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-default text-base md:text-lg leading-relaxed pt-6 pb-4 border-b border-border/50">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

        </div>
      </div>
    </section>
  );
}