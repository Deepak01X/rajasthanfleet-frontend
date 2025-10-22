import BookingForm from "@/components/BookingForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BookingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#1e1313] text-white">
      {/* 🔹 Header */}
      <Header />

      {/* 🔹 Main Content */}
      <main className="flex-1 flex justify-center items-start p-32">
        <div className="w-full max-w-4xl">
          <BookingForm />
        </div>
      </main>

      {/* 🔹 Footer */}
      <Footer />
    </div>
  );
}
