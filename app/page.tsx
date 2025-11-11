"use client"
import { API_BASE_URL } from "@/lib/apiConfig";
import { useRouter } from "next/navigation";  // 🔹 Add this line
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Services from "@/lib/Services";
import ImageCarousel from "@/components/ImageCarousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import {
  Clock, Shield, Car, DollarSign, Users, Award, Calendar, Phone,
  Mail, MapPin, MapPinIcon, ChevronDown, Star, BookOpen,
  Compass, Utensils, CloudRain, User,
} from "lucide-react"




export default function WelcomeRajasthanPage() {



  const [showMagic, setShowMagic] = useState(false);
const [previewOpen, setPreviewOpen] = useState<number | null>(null);

  const { addToast } = useToast();  
  // ---------------- Dynamic States ----------------
  const [fleet, setFleet] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [tips, setTips] = useState<any[]>([]);
    const router = useRouter(); // 🔹 Add this line just below useState hooks

    useEffect(() => {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.innerHTML = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Rajasthan Fleet",
    url: "https://rajasthanfleet.com",
    image: "https://rajasthanfleet.com/logo7.png",
    telephone: "+91-9119373381",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    description:
      "Rajasthan Fleet offers premium taxi, cab, and car rental services across Rajasthan including Jaipur, Udaipur, and Jodhpur.",
    priceRange: "₹₹",
    sameAs: [
      "https://www.facebook.com/YourPageName",
      "https://www.instagram.com/YourUsername",
      "https://wa.me/9119373381",
    ],
  });
  document.head.appendChild(script);
}, []);


  useEffect(() => {
    fetch(`${API_BASE_URL}/api/fleet`)
      .then((res) => res.json())
      .then((data) => setFleet(data))
      .catch(() => {});

    fetch(`${API_BASE_URL}/api/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch(() => {});

    fetch(`${API_BASE_URL}/api/faqs`)
      .then((res) => res.json())
      .then((data) => setFaqs(data))
      .catch(() => {});

    fetch(`${API_BASE_URL}/api/tips`)
      .then((res) => res.json())
      .then((data) => setTips(data))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* ---------------- Navbar ---------------- */}
      <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-3 text-2xl font-bold text-foreground">
  <img
    src="/logo7.png"  // 🔹 Apna logo public folder me daal, e.g. public/logo.png
    alt="Rajasthan Fleet Taxi Logo"
   className="w-24 h-16 sm:w-50 sm:h-20 rounded-full object-cover"
 // 🔹 Size & shape yahan se change kar sakta hai
  />
  
</div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-muted-foreground hover:text-primary transition-colors">Home</a>
            <a href="/services" className="text-muted-foreground hover:text-primary transition-colors">Services</a>
            <a href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </div>
        <div className="flex items-center space-x-4">
  {/* Facebook (official svg) */}
  <a
    href="https://www.facebook.com/profile.php?id=61582597211874" // <-- apna FB link daal
    target="_blank"
    rel="noopener noreferrer"
    className="hover:scale-110 transition-transform"
  >
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg"
      alt="Facebook"
      className="w-7 h-7"
    />
  </a>

  {/* Instagram (official png/svg) */}
  <a
    href="https://www.instagram.com/rajasthanfleet/" // <-- apna Insta link daal
    target="_blank"
    rel="noopener noreferrer"
    className="hover:scale-110 transition-transform"
  >
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
      alt="Instagram"
      className="w-7 h-7 rounded-sm"
    />
  </a>

  {/* WhatsApp (official svg) */}
  <a
    href="https://wa.me/919119373381?text=Hello%20Rajasthan%20Fleet%21%20I%20want%20to%20book%20a%20ride." // <-- apna number + message daal
    target="_blank"
    rel="noopener noreferrer"
    className="hover:scale-110 transition-transform"
  >
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
      alt="WhatsApp"
      className="w-7 h-7"
    />
  </a>

  {/* Book Now Button */}
  <a href="/services">
    <Button className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover-glow">
      Book Now
    </Button>
  </a>
</div>


        </div>
      </nav>
<section
  id="home"
  className="relative flex items-center justify-center overflow-hidden"
  style={{
    minHeight: "100dvh", // full viewport height for all devices
    marginTop: "-5px",  // 🧹 remove the navbar black gap
    paddingTop: "70px",  // ✅ push text below navbar so it doesn’t hide
  }}
>
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-no-repeat bg-center bg-cover bg-mobile-crop"
    style={{
      backgroundImage: "url('/HomeTop1.png')",
     
    }}
  >
    {/* Optional soft gradient instead of hard black overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40"></div>
  </div>

  {/* Text Container */}
  <div className="relative z-10 container mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center min-h-[70vh]">
    <div className="max-w-[850px] w-full">
      <h1
        className="
          text-[26px]
          sm:text-[34px]
          md:text-[42px]
          lg:text-[50px]
          font-extrabold
          mb-6
          leading-snug
          gradient-text
          drop-shadow-[2px_2px_6px_rgba(0,0,0,0.7)]
          tracking-tight
          text-center
          px-2
          break-words
        "
      >
        Rajasthan Fleet – Reliable Taxi & Cab Booking Service in Rajasthan
      </h1>

      <p
        className="
          text-[15px]
          sm:text-[17px]
          md:text-[19px]
          lg:text-[21px]
          text-white
          leading-relaxed
          mb-8
          max-w-[750px]
          mx-auto
          drop-shadow-[1px_1px_4px_rgba(0,0,0,0.6)]
          px-3
          text-center
        "
      >
        Book premium taxis and tempo travellers for Jaipur, Udaipur, and Jodhpur. 
        24×7 affordable cab service across Rajasthan.
      </p>

      <a href="#book">
        <Button
          size="lg"
          className="
            bg-[#ff2ea6]
            hover:bg-[#ff168f]
            text-white
            font-semibold
            text-base
            rounded-xl
            shadow-lg
            px-6
            py-3
            hover:scale-105
            transition-transform
            hover:shadow-[0_0_30px_rgba(255,46,166,0.7)]
          "
        >
          Get A Quote
        </Button>
      </a>
    </div>
  </div>
</section>

{/* ---------------- Service Promotional Slider (Dual Image Layout) ---------------- */}
<section className="w-full px-0 relative overflow-hidden rounded-2xl my-2 md:my-10">
  <Swiper
    modules={[Autoplay, EffectFade]}
    effect="fade"
    autoplay={{ delay: 4000, disableOnInteraction: false }}
    loop={true}
    className="w-full h-full min-h-[180px]"
  >

    {[
      { textImage: "/localtext.png", mainImage: "/localadd.jpg" },
      { textImage: "/airporttext.png", mainImage: "/airport.png" },
      { textImage: "/corporatetext.png", mainImage: "/corporate1.png" },
      { textImage: "/eventshutal.png", mainImage: "/group.jpg" },
    ].map((s, i) => (
      <SwiperSlide key={i}>
        <div className="w-full flex flex-row items-stretch justify-center md:h-[55vh]">
          {/* Left block */}
          <div className="w-1/2 flex flex-col items-center justify-center bg-black">
            <div className="w-full aspect-[1/1] md:aspect-auto flex items-center justify-center md:h-full">
              <img
                src={s.textImage}
                alt=""
                className="w-full h-full object-contain rounded-xl md:h-[90%] md:max-w-[320px]"
              />
            </div>
          </div>
          {/* Right block */}
          <div className="w-1/2 flex flex-col items-center justify-center bg-black relative">
            <div className="w-full aspect-[1/1] md:aspect-auto flex items-center justify-center md:h-full">
              <img
                src={s.mainImage}
                alt=""
                className="w-full h-full object-contain rounded-xl md:w-full md:h-full md:object-cover md:max-w-none"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-l from-black/50 to-transparent rounded-xl md:block hidden"></div>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</section>





      {/* ---------------- Carousel ---------------- */}
    <section className="py-4 md:py-20 bg-[#1a0f0f]">

  <div className="container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <ImageCarousel />
          </div>
        </div>
      </section>

    
     {/* ---------------- Fleet Section (Dynamic) ---------------- */}
{/* ---------------- Fleet Section (Dynamic, Badge Fixed Only) ---------------- */}
<section className="py-16">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-10 text-pink-500">
      Our Fleet of Freedom
    </h2>

    <div className="grid md:grid-cols-3 gap-6">
      {fleet.map((car) => (
        <div key={car.id} className="relative">
          {/* ✅ Fixed Badge (Perfect Circle + Text Fit + Float) */}
          {car.badge && (
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-pink-500 text-white text-[11px] font-bold shadow-md border-4 border-[#2a1717] leading-tight text-center px-1">
                {car.badge}
              </div>
            </div>
          )}

          <Card className="relative overflow-visible hover:shadow-lg transition-all duration-300 hover:scale-105 rounded-xl border border-pink-300 bg-[#2a1717] pt-8 max-w-sm mx-auto">
            {/* Car Image */}
            <div className="w-full h-60 flex justify-center items-center">
              <img
                src={car.imageUrl}
                alt={car.name}
                className="h-full object-contain"
              />
            </div>

            {/* Card Content */}
            <div className="relative z-10 px-4 py-3 text-left">
              <CardTitle className="text-lg font-bold text-white mb-1">
                {car.name}
              </CardTitle>

              <CardContent className="p-0 space-y-1 text-sm text-gray-300">
                {/* Capacity */}
                <p className="mb-0.5">
                  <span className="font-medium text-white">Capacity:</span>{" "}
                  <span className="text-pink-400">{car.capacity} Seater</span>
                </p>

                {/* Best For */}
                <p className="mb-0.5">
                  <span className="font-medium text-white">Best For:</span>{" "}
                  <span className="text-pink-400">{car.bestFor}</span>
                </p>

                {/* Features */}
                <div>
                  <span className="font-medium text-white">Features:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {car.features?.map((feature: string, idx: number) => (
                      <span
                        key={idx}
                        className="bg-pink-100/10 text-pink-400 border border-pink-400/40 px-2 py-0.5 text-[11px] rounded-md"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hire Button */}
                <Button
                  onClick={() => router.push("/services")}
                  className="w-full bg-pink-500 text-white hover:bg-pink-600 mt-2 py-2 text-sm"
                >
                  Hire Now
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      ))}
    </div>
  </div>
</section>

{/*this section is for form fill */}
    <section id="book" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-balance">Book Your Ride</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Quick and easy booking for all your travel needs in Rajasthan
            </p>
          </div>

          {/* Card */}
          <Card className="overflow-hidden rounded-2xl shadow-2xl">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Side Info */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 h-full">
                    <h3 className="text-2xl font-bold mb-4 text-primary">Trip Details</h3>
                    <p className="text-muted-foreground mb-6">
                      Select your preferences and we'll provide you with an instant quote
                      for your journey across the royal state of Rajasthan.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span className="text-sm">Pickup & Drop locations</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span className="text-sm">Date & Time selection</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Car className="w-5 h-5 text-primary" />
                        <span className="text-sm">Service type preference</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-primary" />
                        <span className="text-sm">Personal details</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Booking Form */}
                <div className="lg:col-span-2">
                  <form
                    className="space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = {
                        pickup: e.target.pickup.value,
                        destination: e.target.destination.value,
                        date: e.target.date.value,
                        time: e.target.time.value,
                        service: e.target.service.value,
                        name: e.target.name.value,
                        email: e.target.email.value,
                        phone: e.target.phone.value,
                      };

                      fetch(`${API_BASE_URL}/api/quotations`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData),
                      })
                        .then((res) => {
                          if (res.ok) {
                            addToast({
                              title: "✅ Request Sent",
                              description:
                                "Your booking has been saved. Our team will contact you soon.",
                            });
                            e.target.reset();
                          } else {
                            addToast({
                              title: "❌ Error",
                              description: "Failed to submit booking. Please try again.",
                              variant: "destructive",
                            });
                          }
                        })
                        .catch(() =>
                          addToast({
                            title: "⚠️ Server Error",
                            description: "Backend not reachable. Try again later.",
                            variant: "destructive",
                          })
                        );
                    }}
                  >
                    {/* Trip Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Pickup Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <input
                            name="pickup"
                            type="text"
                            placeholder="Enter pickup location"
                            className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Destination</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <input
                            name="destination"
                            type="text"
                            placeholder="Enter destination"
                            className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Travel Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <input
                            name="date"
                            type="date"
                            className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Time</label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <input
                            name="time"
                            type="time"
                            className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Service Type</label>
                      <div className="relative">
                        <Car className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <select
                          name="service"
                          className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white text-black"
                          required
                        >
                          <option value="">Select service type</option>
                          <option value="local-travel">Local Travel</option>
                          <option value="across-rajasthan">Across Rajasthan</option>
                          <option value="one-way-trip">One Way Trip</option>
                          <option value="round-trip">Round Trip</option>
                          <option value="airport-transfer">Airport Transfer</option>
                          <option value="corporate-travel">Corporate Travel</option>
                          <option value="wedding-cars">Wedding Cars</option>
                          <option value="event-shuttles">Event Shuttles</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>

                    {/* Personal Information */}
                    <div className="border-t pt-6">
                      <h4 className="text-lg font-semibold mb-4">Personal Information</h4>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <input
                              name="name"
                              type="text"
                              placeholder="Enter your full name"
                              className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <input
                              name="email"
                              type="email"
                              placeholder="Enter your email"
                              className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Phone Number</label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <input
                              name="phone"
                              type="tel"
                              placeholder="Enter your phone number"
                              className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                      <Button
                        type="submit"
                        className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90 hover-glow rounded-lg"
                      >
                        Book Now - Get Instant Quote
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>


      {/* ---------------- Vibes ---------------- */}
      <section className="relative overflow-hidden">
        <div className="h-96 bg-gradient-to-br from-primary/20 to-secondary/20 relative">
          <div className="absolute inset-0 grid grid-cols-4 gap-2 p-4">
            <div className="col-span-2 row-span-2 bg-cover bg-center rounded-lg shadow-lg" style={{ backgroundImage: "url('/chitorvibes.jpg')" }}></div>
            <div className="bg-cover bg-center rounded-lg shadow-lg" style={{ backgroundImage: "url('/lakevibes.jpg')" }}></div>
            <div className="bg-cover bg-center rounded-lg shadow-lg" style={{ backgroundImage: "url('/jalmahalvibes.jpg')" }}></div>
            <div className="bg-cover bg-center rounded-lg shadow-lg" style={{ backgroundImage: "url('/musicvibes.jpg')" }}></div>
            <div className="bg-cover bg-center rounded-lg shadow-lg" style={{ backgroundImage: "url('/nightvibes.jpg')" }}></div>
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-5xl md:text-6xl font-bold mb-4 text-pink-500 drop-shadow-[2px_2px_8px_rgba(0,0,0,0.8)]">Vibes</h2>
              <h3 className="text-3xl md:text-4xl font-semibold text-white drop-shadow-[2px_2px_8px_rgba(0,0,0,0.8)]">Rajasthan on Wheels</h3>
            </div>
          </div>
        </div>
      </section>
{/* ---------------- Hero Video Section (Fully Responsive, No Gaps) ---------------- */}
<section className="video-section relative w-full h-[100svh] md:h-[90vh] overflow-hidden m-0 p-0">
  {/* 🎥 Background Video */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover object-center"
  >
    <source src="/roadvideo.mp4" type="video/mp4" />
  </video>

  {/* 🧊 Text Content - Centered with local blur behind text only */}
  <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4">
    <div className="bg-black/40 backdrop-blur-md p-6 sm:p-8 rounded-2xl max-w-[90%] sm:max-w-2xl">
      <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 md:mb-4 drop-shadow-md">
        Rajasthan Calling?
      </h2>
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 md:mb-6 text-primary drop-shadow-md">
        We Drive You
      </h3>
      <p className="text-base sm:text-lg md:text-2xl mb-6 md:mb-8">
        Your adventure across Rajasthan starts with a click. Get moving with us!
      </p>
      <a href="/booking">
        <Button className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover-glow">
          Book Now
        </Button>
      </a>
    </div>
  </div>
</section>



      {/* ---------------- Statistics ---------------- 
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">By The Numbers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-2xl transition-all duration-300 rounded-2xl">
              <CardHeader><Users className="w-16 h-16 text-primary mx-auto mb-4" /><CardTitle className="text-5xl font-bold text-primary">5000</CardTitle><CardDescription className="text-lg">Happy Clients</CardDescription></CardHeader>
            </Card>
            <Card className="text-center hover:shadow-2xl transition-all duration-300 rounded-2xl">
              <CardHeader><Car className="w-16 h-16 text-primary mx-auto mb-4" /><CardTitle className="text-5xl font-bold text-primary">200</CardTitle><CardDescription className="text-lg">Vehicles</CardDescription></CardHeader>
            </Card>
            <Card className="text-center hover:shadow-2xl transition-all duration-300 rounded-2xl">
              <CardHeader><Award className="w-16 h-16 text-primary mx-auto mb-4" /><CardTitle className="text-5xl font-bold text-primary">15</CardTitle><CardDescription className="text-lg">Awards</CardDescription></CardHeader>
            </Card>
          </div>
        </div>
      </section>*/}

      {/* ---------------- Services ---------------- */}
      <main><Services /></main>
{/* ---------------- Our Guest is Our God ---------------- */}
<section className="py-16 md:py-20 relative">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url('/amergate.jpg')` }}
  >
    <div className="absolute inset-0 bg-black/70"></div>
  </div>

  {/* Content */}
  <div className="relative z-10 container mx-auto px-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[400px] md:min-h-[500px]">
      
      {/* Text Section */}
      <div className="text-center lg:text-left space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Every Guest, Our God
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
          In the land of kings and queens, we believe every traveler deserves royal treatment. 
          As your trusted travel companion across Rajasthan, we don't just drive you from point A to B – 
          we craft experiences that honor the majestic spirit of this incredible state.
        </p>
        <Button className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all">
          Our Story
        </Button>
      </div>

      {/* Image Section */}
      <div className="flex justify-center lg:justify-end">
        <div className="w-full max-w-[400px] md:max-w-[480px] lg:max-w-[500px] rounded-2xl overflow-hidden shadow-2xl">
          <img
            src="/rajasthan-royal-hospitality.jpg"
            alt="Rajasthan Royal Hospitality and Taxi Service by Rajasthan Fleet"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</section>

{/* ---------------- Travel Tips Section ---------------- */}
<section className="py-20 bg-card">
  <div className="container mx-auto px-4">
    {/* Heading + Magic Button */}
    <div className="flex items-center justify-center mb-16">
      <h2 className="text-4xl font-bold text-center mb-16 mr-4">Travel Tips</h2>
      <div className="relative group">
        <button
          className="w-12 h-12 bg-primary/20 hover:bg-primary/40 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 animate-pulse hover:animate-none"
          onClick={() => setShowMagic(!showMagic)}
        >
          <Star className="w-6 h-6 text-primary animate-spin hover:animate-none" />
        </button>
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Touch me to see magic ✨
        </div>
      </div>
    </div>

    {/* Hidden Magic Tips (ye tips array me se aa sakte hain agar API aise return kare) */}
    {showMagic && (
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30 rounded-2xl overflow-hidden mb-12 animate-fade-in-up">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-primary mb-2">🎭 Secret Rajasthan Magic Revealed! 🎭</h3>
            <p className="text-muted-foreground">Hidden gems only locals know about...</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {tips
              .filter((tip: any) => tip.category === "magic") // <- API se "magic" category ke liye filter
              .map((tip: any) => (
                <div key={tip.id} className="bg-card/50 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="font-semibold text-primary mb-2">{tip.title}</h4>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    )}

    {/* Travel Tip Cards */}
    <div className="grid md:grid-cols-2 gap-8">
      {tips
        .filter((tip: any) => tip.category === "card") // <- API se "card" category ke liye filter
        .map((tip: any) => {
          const Icon =
            tip.icon === "Compass"
              ? Compass
              : tip.icon === "BookOpen"
              ? BookOpen
              : tip.icon === "Utensils"
              ? Utensils
              : CloudRain;

          return (
            <Card
              key={tip.id}
              className="hover:shadow-2xl transition-all duration-300 rounded-2xl relative"
            >
              <div className="absolute top-4 right-4 z-10">
                <button
                  className="w-8 h-8 bg-primary/20 hover:bg-primary/40 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group relative"
                  onClick={() => setPreviewOpen(previewOpen === tip.id ? null : tip.id)}
                >
                  <Icon className="w-4 h-4 text-primary transition-transform duration-300" />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Click to see magic
                  </div>
                </button>
              </div>
              <CardHeader>
                <Icon className="w-12 h-12 text-primary mb-4" />
                <CardTitle>{tip.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{tip.description}</p>
                {previewOpen === tip.id && tip.imageUrl && (
                  <div className="mt-4 rounded-lg overflow-hidden animate-fade-in-up">
                    <img
  src={`${API_BASE_URL}${tip.imageUrl}`}
  alt={tip.title}
  className="w-full h-32 object-cover rounded-md"
/>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      {tip.previewText}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
    </div>
  </div>
</section>


      {/* ---------------- Why Us ---------------- */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Why Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl">
              <CardHeader><Clock className="w-12 h-12 text-primary mx-auto mb-4" /><CardTitle>Punctual</CardTitle></CardHeader>
              <CardContent><p className="text-muted-foreground">We're never late. Seriously, don't even bother checking your watch. We'll be there.</p></CardContent>
            </Card>
            <Card className="text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl">
              <CardHeader><Car className="w-12 h-12 text-primary mx-auto mb-4" /><CardTitle>Clean</CardTitle></CardHeader>
              <CardContent><p className="text-muted-foreground">Our cars are spotless and comfy.</p></CardContent>
            </Card>
            <Card className="text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl">
              <CardHeader><Shield className="w-12 h-12 text-primary mx-auto mb-4" /><CardTitle>Safe</CardTitle></CardHeader>
              <CardContent><p className="text-muted-foreground">We drive responsibly and safely.</p></CardContent>
            </Card>
            <Card className="text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl">
              <CardHeader><DollarSign className="w-12 h-12 text-primary mx-auto mb-4" /><CardTitle>Affordable</CardTitle></CardHeader>
              <CardContent><p className="text-muted-foreground">Quality rides at fair prices.</p></CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ---------------- FAQs (Static) ---------------- */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-balance">Got Queries?</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <Card className="rounded-2xl">
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <CardTitle>How do I book?</CardTitle>
                  <ChevronDown className="w-5 h-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Simply click the "Book Now" button, fill in your details, and we'll confirm your ride within minutes.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <CardTitle>Can I cancel?</CardTitle>
                  <ChevronDown className="w-5 h-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, you can cancel up to 2 hours before your scheduled ride for a full refund.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <CardTitle>What about luggage?</CardTitle>
                  <ChevronDown className="w-5 h-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All our vehicles have ample luggage space. For extra luggage, please mention it while booking.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <CardTitle>Are drivers polite?</CardTitle>
                  <ChevronDown className="w-5 h-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our drivers are trained professionals who treat every guest with respect and courtesy.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Button className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover-glow">
              Read More
            </Button>
          </div>
        </div>
      </section>


      {/* ---------------- Reviews (Dynamic) ---------------- */}
<section
  className="py-20 relative bg-cover bg-center"
  style={{
    backgroundImage:
      "linear-gradient(rgba(30, 10, 10, 0.4), rgba(30, 10, 10, 0.4)), url('/motif1.png')",
  }}
>
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12 text-primary">Happy Riders</h2>
    <div className="grid md:grid-cols-2 gap-6">
      {reviews.map((rev) => (
        <Card
          key={rev.id}
          className="rounded-2xl bg-[#2a1a1a]/90 p-6 border border-gray-700 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          {/* 🔹 Image or Fallback */}
          <div className="flex items-center mb-4 gap-4">
            {rev.image ? (
              <img
                src={`${API_BASE_URL}${rev.image}`}
                alt={rev.name}
                className="w-14 h-14 rounded-full object-cover border border-white/30"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold text-white">
                {rev.name?.charAt(0)}
              </div>
            )}

            <div>
              {/* ⭐ Stars */}
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-white fill-current" />
                ))}
              </div>
              <div className="font-semibold mt-1 text-white">{rev.name}</div>
            </div>
          </div>

          {/* 🔹 Review Text */}
          <p className="text-white italic leading-relaxed">"{rev.text}"</p>
        </Card>
      ))}
    </div>
  </div>
</section>





    
     {/* ---------------- Contact Section (POST) ---------------- */}

<section id="contact" className="py-20 bg-card">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-4">Ready to Roll?</h2>
      <p className="text-xl text-muted-foreground">Let's Chat</p>
    </div>

    <div className="grid lg:grid-cols-2 gap-12">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
          <CardDescription>
            Send us a message and we'll get back to you soon.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = {
                name: e.target.name.value,
                email: e.target.email.value,
                phone: e.target.phone.value,
                company: e.target.company.value,
                message: e.target.message.value,
              };

              try {
                const res = await fetch(`${API_BASE_URL}/api/contact`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(formData),
                });

                if (res.ok) {
                  alert("✅ Message Sent Successfully!");
                  e.target.reset(); // clear form
                } else {
                  alert("❌ Failed to send message. Try again.");
                }
              } catch (error) {
                alert("⚠️ Server not reachable. Try later.");
              }
            }}
            className="space-y-4"
          >
            {/* Name + Email */}
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                name="name"
                placeholder="Your Name"
                required
                className="border border-pink-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
              <Input
                name="email"
                type="email"
                placeholder="Your Email"
                required
                className="border border-pink-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            {/* Phone (Optional) */}
            <Input
              name="phone"
              type="tel"
              placeholder="Phone (optional)"
              className="border border-pink-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />

            {/* Company (Optional) */}
            <Input
              name="company"
              placeholder="Company (optional)"
              className="border border-pink-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />

            {/* Message */}
            <Textarea
              name="message"
              placeholder="Tell us how we can help you..."
              rows={4}
              required
              className="border border-pink-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />

            {/* Submit */}
            <Button className="w-full bg-primary text-white hover:bg-primary/90 hover:shadow-[0_0_40px_rgba(236,72,153,0.9)]">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Right Side Contact Info */}
      <div className="space-y-8">
        <Card className="rounded-2xl">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Mail className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground">RajasthanFleet@gmail.com</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Phone className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-muted-foreground">+91 9119373381</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <MapPinIcon className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-muted-foreground">Jhotwara, Jaipur</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</section>

      {/* ---------------- Footer ---------------- */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">
              RAJASTHAN-<span className="text-primary">FLEET</span>
            </div>
            <p className="text-muted-foreground mb-8">
              Your trusted travel companion in the land of kings
            </p>
            <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
              <a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="/term" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="##contact" className="hover:text-primary transition-colors">Support</a>
            </div>
            <div className="mt-8 pt-8 border-t border-border text-sm text-muted-foreground">
              © 2025 RajasthanFleet. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
