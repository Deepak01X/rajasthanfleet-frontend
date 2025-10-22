"use client";
import { useRouter } from "next/navigation";

export default function PriceTable({
  car,
  sub,
  services,
}: {
  car: string;
  sub: string;
  services: { type: string; price: any }[];
}) {
  const router = useRouter();

  const handleBooking = (service: any) => {
    router.push(
      `/booking?car=${encodeURIComponent(car)}&model=${encodeURIComponent(
        sub
      )}&service=${encodeURIComponent(service.type)}&price=${encodeURIComponent(
        service.price
      )}`
    );
  };

  return (
    <table className="w-full border rounded-md overflow-hidden">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 text-left">Service Type</th>
          <th className="p-2 text-left">Price</th>
          <th className="p-2"></th>
        </tr>
      </thead>
      <tbody>
        {services.map((service, i) => (
          <tr key={i} className="border-t">
            <td className="p-2">{service.type}</td>
            <td className="p-2">₹{service.price}</td>
            <td className="p-2 text-right">
              <button
                onClick={() => handleBooking(service)}
                className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600"
              >
                Book Now
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
