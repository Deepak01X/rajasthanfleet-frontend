"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <>
      {/* 🔹 Header */}
      <Header />

      <section className="min-h-screen bg-background text-foreground pt-36 pb-16">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl space-y-12">
          {/* Heading */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              About <span className="text-foreground">RajasthanFleet</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Your trusted travel companion across the royal land of Rajasthan
            </p>
          </div>

          {/* Who We Are */}
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">Who We Are</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to <strong>RajasthanFleet</strong>, your reliable partner for cab booking and travel services across Rajasthan and beyond.
              We are a professional <strong>car rental and travel company</strong> offering safe, comfortable, and timely transportation for
              <strong> tourists, corporates, event travelers, and locals</strong>. Whether it's a business trip, family vacation, or wedding event,
              RajasthanFleet ensures your journey is as pleasant as your destination.
            </p>
          </div>

          {/* Mission */}
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To make <strong>travel in Rajasthan effortless, enjoyable, and elegant</strong>.
              We focus on delivering a smooth booking experience powered by technology, transparency, and trust.
              Our goal is to provide punctual service with professional chauffeurs and well-maintained vehicles.
            </p>
          </div>

          {/* Vision */}
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              We aspire to be <strong>Rajasthan’s most reliable and preferred fleet service</strong> — combining
              <strong> traditional Rajasthani hospitality</strong> with <strong>modern travel convenience</strong>.
              Our focus is to redefine how people explore cities, heritage sites, and destinations across the state.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">Our Services</h2>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed space-y-1">
              <li><strong>Local & Outstation Cab Rentals:</strong> Explore Jaipur, Udaipur, Jodhpur, Jaisalmer, and more with comfort and class.</li>
              <li><strong>Airport Transfers:</strong> Smooth pickup and drop from all major airports across Rajasthan.</li>
              <li><strong>Corporate Travel Solutions:</strong> Reliable transport for meetings, events, and executives.</li>
              <li><strong>Wedding & Event Transportation:</strong> Luxury cars, tempo travellers, and buses for guests and VIPs.</li>
              <li><strong>Tour Packages:</strong> Customized sightseeing and Rajasthan heritage trips with expert drivers.</li>
            </ul>
          </div>

          {/* Why Choose Us */}
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">Why Choose Us</h2>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed space-y-1">
              <li><strong>Well-Maintained Fleet:</strong> From sedans to luxury cars, our vehicles are always ready.</li>
              <li><strong>Professional Chauffeurs:</strong> Polite, experienced, and knowledgeable about local routes.</li>
              <li><strong>Transparent Pricing:</strong> No hidden charges — you pay what you see.</li>
              <li><strong>On-Time Service:</strong> Punctuality is our promise, every single time.</li>
              <li><strong>24/7 Support:</strong> Our team is available anytime, anywhere.</li>
            </ul>
          </div>

          {/* Final CTA Section */}
          <div className="text-center bg-primary/10 rounded-2xl py-10 px-6">
            <h2 className="text-3xl font-semibold text-primary mb-3">Join the Journey</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6">
              With RajasthanFleet, you don’t just book a cab — you book <strong>comfort, safety, and trust</strong>.
              From the royal palaces of Jaipur to the dunes of Jaisalmer, let us take you there — smoothly,
              safely, and in true Rajasthani style.
            </p>
            <Button asChild>
              <a href="/contact" className="text-lg font-medium">
                Book Your Ride Now
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* 🔹 Footer */}
      <Footer />
    </>
  );
}
