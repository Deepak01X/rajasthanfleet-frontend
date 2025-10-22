const services = [
  {
    category: "Sedan",
    subcategories: [
      {
        name: "Swift Dzire",
        image: "/swift.png",
        services: [
          { type: "✈️ Airport Transfer", price: " City ↔ Airport (Pick & Drop) – ₹1200" },
          { type: "🚖 Local Travel", price: " 4 hrs / 40 km – ₹1100 (₹12/km extra)" },
          { type: "🚖 Local Travel", price: " 8 hrs / 80 km – ₹1800 (₹12/km extra)" },
          { type: "🛣️ Outstation", price: " One Way Trip – ₹14/km (Min 250 km/day, Driver Allowance ₹300/day)" },
          { type: "🛣️ Outstation", price: " Round Trip – ₹12/km (Min 250 km/day, Driver Allowance ₹300/day)" },
        ],
      },
      {
        name: "Etios",
        image: "/etios.png",
        services: [
          { type: "✈️ Airport Transfer", price: " City ↔ Airport (Pick & Drop) – ₹1200" },
          { type: "🚖 Local Travel", price: " 4 hrs / 40 km – ₹1100 (₹12/km extra)" },
          { type: "🚖 Local Travel", price: " 8 hrs / 80 km – ₹1800 (₹12/km extra)" },
          { type: "🛣️ Outstation", price: " One Way Trip – ₹14/km (Min 250 km/day, Driver Allowance ₹300/day)" },
          { type: "🛣️ Outstation", price: " Round Trip – ₹12/km (Min 250 km/day, Driver Allowance ₹300/day)" },
        ],
      },
    ],
  },
  {
    category: "SUV",
    subcategories: [
      {
        name: "Innova",
        image: "/innova.png",
        services: [
          { type: "✈️ Airport Transfer", price: " City ↔ Airport (Pick & Drop) – ₹1200" },
          { type: "🚖 Local Travel", price: " 4 hrs / 40 km – ₹1100 (₹12/km extra)" },
          { type: "🚖 Local Travel", price: " 8 hrs / 80 km – ₹1800 (₹12/km extra)" },
          { type: "🛣️ Outstation", price: " One Way Trip – ₹14/km (Min 250 km/day, Driver Allowance ₹300/day)" },
          { type: "🛣️ Outstation", price: " Round Trip – ₹12/km (Min 250 km/day, Driver Allowance ₹300/day)" },
        ],
      },
      {
        name: "Ertiga",
        image: "/ertiga.png",
        services: [
          { type: "✈️ Airport Transfer", price: " City ↔ Airport (Pick & Drop) – ₹1200" },
          { type: "🚖 Local Travel", price: " 4 hrs / 40 km – ₹1100 (₹12/km extra)" },
          { type: "🚖 Local Travel", price: " 8 hrs / 80 km – ₹1800 (₹12/km extra)" },
          { type: "🛣️ Outstation", price: " One Way Trip – ₹14/km (Min 250 km/day, Driver Allowance ₹300/day)" },
          { type: "🛣️ Outstation", price: " Round Trip – ₹12/km (Min 250 km/day, Driver Allowance ₹300/day)" },
        ],
      },
      {
        name: "Kia Carens",
        image: "/carens.png",
        services: [
          { type: "✈️ Airport Transfer", price: " City ↔ Airport (Pick & Drop) – ₹1200" },
          { type: "🚖 Local Travel", price: " 4 hrs / 40 km – ₹1100 (₹12/km extra)" },
          { type: "🚖 Local Travel", price: " 8 hrs / 80 km – ₹1800 (₹12/km extra)" },
          { type: "🛣️ Outstation", price: " One Way Trip – ₹14/km (Min 250 km/day, Driver Allowance ₹300/day)" },
          { type: "🛣️ Outstation", price: " Round Trip – ₹12/km (Min 250 km/day, Driver Allowance ₹300/day)" },
        ],
      },
    ],
  },
  {
    category: "Tempo Traveller",
    subcategories: [
      {
        name: "12 Seater",
        image: "/Tempo 12-17.png",
        services: [
          { type: "✈️ Airport Transfer", price: " City ↔ Airport (Pick & Drop) – ₹1200" },
          { type: "🚖 Local Travel", price: " 4 hrs / 40 km – ₹1100 (₹12/km extra)" },
          { type: "🚖 Local Travel", price: " 8 hrs / 80 km – ₹1800 (₹12/km extra)" },
          { type: "🛣️ Outstation", price: " One Way Trip – ₹14/km (Min 250 km/day, Driver Allowance ₹300/day)" },
          { type: "🛣️ Outstation", price: " Round Trip – ₹12/km (Min 250 km/day, Driver Allowance ₹300/day)" },
        ],
      },
      {
        name: "17 Seater",
        image: "/Tempo 12-17.png",
        services: [
          { type: "✈️ Airport Transfer", price: " City ↔ Airport (Pick & Drop) – ₹1200" },
          { type: "🚖 Local Travel", price: " 4 hrs / 40 km – ₹1100 (₹12/km extra)" },
          { type: "🚖 Local Travel", price: " 8 hrs / 80 km – ₹1800 (₹12/km extra)" },
          { type: "🛣️ Outstation", price: " One Way Trip – ₹14/km (Min 250 km/day, Driver Allowance ₹300/day)" },
          { type: "🛣️ Outstation", price: " Round Trip – ₹12/km (Min 250 km/day, Driver Allowance ₹300/day)" },
        ],
      },
      {
        name: "Luxury Traveller",
        image: "/tempolux.png",
        services: [
          { type: "✈️ Airport Transfer", price: " City ↔ Airport (Pick & Drop) – ₹1200" },
          { type: "🚖 Local Travel", price: " 4 hrs / 40 km – ₹1100 (₹12/km extra)" },
          { type: "🚖 Local Travel", price: " 8 hrs / 80 km – ₹1800 (₹12/km extra)" },
          { type: "🛣️ Outstation", price: " One Way Trip – ₹14/km (Min 250 km/day, Driver Allowance ₹300/day)" },
          { type: "🛣️ Outstation", price: " Round Trip – ₹12/km (Min 250 km/day, Driver Allowance ₹300/day)" },
        ],
      },
    ],
  },
];

export default services;
