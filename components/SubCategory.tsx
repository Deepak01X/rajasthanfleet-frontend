"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SubCategory({
  sub,
  category,
}: {
  sub: {
    name: string;
    image: string;
    services: { type: string; price: any; km?: number | string }[];
  };
  category: string;
}) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden border flex flex-col">
      {/* Car Image */}
      <div className="relative flex justify-center items-center bg-gray-50">
        <Image
          src={sub.image}
          alt={sub.name}
          width={400}
          height={250}
          className="object-contain"
        />
        <div className="absolute bottom-2 right-2 bg-yellow-500 text-white px-4 py-1 rounded-lg font-bold shadow-md">
          {sub.name}
        </div>
      </div>

      {/* Service List */}
      <div className="p-4 flex-1 text-black">
        <ul className="space-y-3">
          {sub.services.map((service, i) => {
            // ✅ Safely detect the correct field
            const type =
              service.type ||
              service.serviceType ||
              service.service_type ||
              service.servicetype ||
              "";

            // ✅ Smart labeling based on content
            let label = type;
            if (!label || label.trim() === "") {
              if (service.price.toLowerCase().includes("airport")) {
                label = "✈️ Airport Transfer";
              } else if (service.price.toLowerCase().includes("hrs")) {
                label = "🚖 Local Travel";
              } else if (service.price.toLowerCase().includes("trip")) {
                label = "🛣️ Outstation";
              } else {
                label = "🚗 Service";
              }
            }

            return (
              <li
                key={i}
                className="p-3 border rounded-lg hover:bg-gray-50 transition"
              >
                <p className="font-semibold">
                  {label} –{" "}
                  <span className="text-pink-600 font-bold">
                    {service.price}
                  </span>
                </p>
                {service.km && (
                  <p className="text-sm text-gray-600">{service.km} km</p>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* ✅ Book Now Button */}
      <div className="p-4">
        <button
          onClick={() =>
            router.push(
              `/booking?category=${encodeURIComponent(
                category
              )}&carName=${encodeURIComponent(sub.name)}`
            )
          }
          className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
