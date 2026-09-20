import Navbar from "@/components/Navbar";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main className="min-h-screen bg-[#040406] text-white">
            <Navbar />

            {/* Τα υπόλοιπα components σου (Hero, Projects, Infrastructure...) */}

            {/* Ενότητα Reviews */}
            <Testimonials />

            <Footer />
        </main>
    );
}
