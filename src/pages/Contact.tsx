import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/apiService";

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setStatus("sending");
    try {
      // SECURE: Contact form now goes through backend API
      await api.sendContact({ email, name, message });
      setStatus("sent");
      
      // Reset form on success
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to send message");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Z-Pattern Layout - Form Page Hierarchy */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto">
          
          {/* Z-Pattern: Top - Header with maximum emphasis */}
          <header className="mb-12 sm:mb-16 text-center lg:text-left">
            {/* Size & Scale - Primary heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-alt-gothic text-rich-black mb-4 sm:mb-6 leading-tight">
              Contact
            </h1>
            
            {/* Visual Cue - Accent line */}
            <div className="flex items-center gap-4 mb-6 sm:mb-8">
              <div className="h-1 w-20 bg-fire-red"></div>
              <span className="text-fire-red text-sm sm:text-base font-bold tracking-wider uppercase">Get in Touch</span>
              <div className="h-1 flex-grow bg-gradient-to-r from-fire-red/60 to-transparent"></div>
            </div>
            
            {/* Whitespace - Clear description */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-6">
              Send a message and we'll get back to you. This uses our email service
              powered by Resend.
            </p>

            {/* Link to Booking Form */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 sm:p-6 max-w-2xl mx-auto lg:mx-0">
              <p className="text-sm sm:text-base text-blue-900 mb-3">
                <strong>Need to book an event?</strong> Looking for DJ services, live performances, or event hosting?
              </p>
              <Link
                to="/events"
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold rounded-lg transition-all hover:scale-105 shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Go to Booking Form</span>
              </Link>
            </div>
          </header>

          {status === "sent" ? (
            /* Success State - High Contrast */
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-300 rounded-2xl p-8 sm:p-10 lg:p-12 text-center shadow-xl">
              {/* Visual Indicator */}
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-emerald-400 rounded-full mb-6 shadow-lg">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-alt-gothic text-emerald-900 mb-3">
                Message Sent!
              </h2>
              <p className="text-base sm:text-lg text-emerald-800">
                Please check your inbox for confirmation.
              </p>
            </div>
          ) : (
            /* Form - Clear visual hierarchy and grouping */
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Proximity - Label + Input grouped */}
              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3 uppercase tracking-wide">
                  Name *
                </label>
                <input
                  className="w-full border-2 border-gray-300 rounded-lg px-4 sm:px-5 py-3 sm:py-4 text-gray-900 text-sm sm:text-base placeholder-gray-500 focus:border-fire-red focus:ring-2 focus:ring-fire-red/20 transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3 uppercase tracking-wide">
                  Email *
                </label>
                <input
                  type="email"
                  className="w-full border-2 border-gray-300 rounded-lg px-4 sm:px-5 py-3 sm:py-4 text-gray-900 text-sm sm:text-base placeholder-gray-500 focus:border-fire-red focus:ring-2 focus:ring-fire-red/20 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3 uppercase tracking-wide">
                  Message *
                </label>
                <textarea
                  rows={6}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 sm:px-5 py-3 sm:py-4 text-gray-900 text-sm sm:text-base placeholder-gray-500 focus:border-fire-red focus:ring-2 focus:ring-fire-red/20 transition-all resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what's on your mind..."
                  required
                />
              </div>
              
              {/* Error state with color indicator */}
              {error && (
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start gap-3" role="alert">
                  <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm sm:text-base text-red-700 font-medium">{error}</p>
                </div>
              )}
              
              {/* CTA - High contrast, prominent size, whitespace around */}
              <button
                type="submit"
                className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-fire-red hover:bg-red-600 text-white font-bold text-base sm:text-lg rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Sending…
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          )}
          
          {/* Additional contact info - White space separation */}
          <div className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t-2 border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {/* Contact method cards - Consistent pattern */}
              <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-fire-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-fire-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                <p className="text-sm text-gray-600">contact@wayback.com</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-fire-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-fire-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                <p className="text-sm text-gray-600">(555) 123-4567</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-fire-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-fire-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Location</h3>
                <p className="text-sm text-gray-600">New York City</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
