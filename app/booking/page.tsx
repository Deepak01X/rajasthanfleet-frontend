import BookingForm from "@/components/BookingForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BookingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#1e1313] text-white">
      {/* 🔹 Header */}
      <Header />

      {/* 🔹 Main Content */}
    <main className="flex-1 flex justify-center items-start px-2 py-6 sm:px-8 md:px-16 lg:px-32 mt-16 md:mt-24">
  <div className="w-full max-w-4xl">
    <BookingForm />
  </div>
</main>



      {/* 🔹 Footer */}
      <Footer />
    </div>
  );
}
