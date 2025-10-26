import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Contact() {
  function handleSubmit(e) {
    e.preventDefault();
    toast.success("Thanks! We’ll get back to you shortly.");
    e.currentTarget.reset();
  }

  return (
    <div className="w-full min-h-screen bg-primary px-4 py-12">
      {/* Hero */}
      <div className="max-w-7xl mx-auto">
        <div className="vintage-card p-8 md:p-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold font-classic text-accent mb-4 border-b-4 border-accent pb-4">
            Contact Us
          </h1>
          <p className="text-xl text-textColor font-serif-vintage leading-relaxed mt-4">
            We sell and rent classic, old-fashioned audio equipment with modern reliability. 
            Reach out for bookings, sales inquiries, or expert guidance.
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Contact Info Cards */}
        <div className="space-y-6 order-2 lg:order-1">
          {/* Phone */}
          <div className="vintage-card p-6 flex items-start gap-4">
            <div className="text-accent text-3xl"><FaPhoneAlt /></div>
            <div>
              <h3 className="font-classic text-2xl text-accent">Call Us</h3>
              <p className="text-textColor font-serif-vintage">Sales & Rentals</p>
              <a href="tel:+94771234567" className="text-highlight font-vintage text-lg">+94 77 123 4567</a>
              <span className="mx-2 text-textColor/70">|</span>
              <a href="tel:+94711234567" className="text-highlight font-vintage text-lg">+94 71 123 4567</a>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="vintage-card p-6 flex items-start gap-4">
            <div className="text-accent text-3xl"><FaWhatsapp /></div>
            <div>
              <h3 className="font-classic text-2xl text-accent">WhatsApp</h3>
              <p className="text-textColor font-serif-vintage">Quick replies for availability & quotes</p>
              <a href="https://wa.me/94771234567" target="_blank" rel="noreferrer" className="vintage-button inline-block mt-2 px-6 py-2">Chat on WhatsApp</a>
            </div>
          </div>

          {/* Email */}
          <div className="vintage-card p-6 flex items-start gap-4">
            <div className="text-accent text-3xl"><FaEnvelope /></div>
            <div>
              <h3 className="font-classic text-2xl text-accent">Email</h3>
              <p className="text-textColor font-serif-vintage">General inquiries & bookings</p>
              <a href="mailto:support@vintageaudio.lk" className="text-highlight font-vintage text-lg">support@vintageaudio.lk</a>
            </div>
          </div>

          {/* Address */}
          <div className="vintage-card p-6 flex items-start gap-4">
            <div className="text-accent text-3xl"><FaMapMarkerAlt /></div>
            <div>
              <h3 className="font-classic text-2xl text-accent">Showroom & Pickup</h3>
              <p className="text-textColor font-serif-vintage">No. 42, Ward Place, Colombo 07, Sri Lanka</p>
              <p className="text-textColor font-serif-vintage">Island-wide delivery and on-site setup available</p>
            </div>
          </div>

          {/* Hours */}
          <div className="vintage-card p-6 flex items-start gap-4">
            <div className="text-accent text-3xl"><FaClock /></div>
            <div>
              <h3 className="font-classic text-2xl text-accent">Business Hours</h3>
              <p className="text-textColor font-serif-vintage">Mon – Sat: 9:00 AM – 6:00 PM</p>
              <p className="text-textColor font-serif-vintage">Sunday: By appointment</p>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="order-1 lg:order-2">
          <form onSubmit={handleSubmit} className="vintage-card p-6 md:p-8">
            <h2 className="text-3xl font-classic text-accent font-bold mb-4">Send us a message</h2>
            <p className="text-textColor font-serif-vintage mb-6">Tell us what you’re looking for — rentals, purchases, or service. We’ll reply within 24 hours.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="vintage-input" type="text" name="name" placeholder="Full Name" required />
              <input className="vintage-input" type="email" name="email" placeholder="Email" required />
              <input className="vintage-input md:col-span-2" type="tel" name="phone" placeholder="Phone (optional)" />
              <textarea className="vintage-input md:col-span-2 min-h-[140px]" name="message" placeholder="Your message (equipment, dates, event type)" required />
            </div>
            <div className="mt-6 flex items-center gap-4">
              <button type="submit" className="vintage-button px-8 py-3 text-lg">Send Message</button>
              <span className="text-textColor/80 font-serif-vintage">Or reach us on WhatsApp for a faster response</span>
            </div>
          </form>
        </div>
      </div>

      {/* Map */}
      <div className="max-w-7xl mx-auto mt-10">
        <div className="vintage-card overflow-hidden">
          <iframe
            title="Vintage Audio Sri Lanka - Map"
            className="w-full h-[320px] md:h-[420px] border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63316.13241887163!2d79.83800590517842!3d6.927078607419487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25958a8f3b3ef%3A0x3c5d5c9f74b1a5b6!2sColombo%2007%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1698230400000!5m2!1sen!2slk"
          />
        </div>
      </div>
    </div>
  );
}
