import { fleetData } from "@/lib/fleetData";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Fleet() {
  return (
    <section id="fleet" className="py-20 bg-[#1a0f0f]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-pink-500">
          Our Fleet of Freedom
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {fleetData.map((car, i) => (
            <div key={i} className="relative flex flex-col items-center">
              {/* ✅ Floating Circular Badge (perfect alignment, clean look) */}
              {car.badge && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-pink-500 text-white text-xs font-bold shadow-lg border-4 border-[#2a1717]">
                    {car.badge}
                  </div>
                </div>
              )}

              {/* ✅ Card — overflow visible to show badge cleanly */}
              <Card className="relative overflow-visible hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl border border-pink-400/70 bg-[#2a1717] pt-10">
                {/* Car Image */}
                <div className="w-full h-52 overflow-hidden rounded-t-2xl flex justify-center items-center">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="h-full object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Card Content */}
                <div className="relative z-10 p-4">
                  <CardTitle className="text-lg mb-2 text-white text-center">
                    {car.name}
                  </CardTitle>

                  <CardContent className="p-0 space-y-1 text-sm text-center">
                    {/* Capacity */}
                    <p>
                      <span className="text-white font-medium">Capacity:</span>{" "}
                      <span className="text-pink-400">{car.capacity}</span>
                    </p>

                    {/* Best For */}
                    <p>
                      <span className="text-white font-medium">Best For:</span>{" "}
                      <span className="text-pink-400">{car.bestFor}</span>
                    </p>

                    {/* Features */}
                    <div>
                      <span className="text-white font-medium">Features:</span>
                      <div className="flex flex-wrap justify-center gap-1 mt-1">
                        {car.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="bg-pink-100/10 text-pink-400 border border-pink-400/40 px-2 py-0.5 text-xs rounded-md"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hire Button */}
                    <Button className="w-full bg-pink-500 text-white hover:bg-pink-600 mt-4 py-2 text-sm">
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
  );
}
