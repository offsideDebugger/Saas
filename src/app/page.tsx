import Navbar from "@/components/landing/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#020617] relative">
      {/* Emerald Radial Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle 500px at 50% 300px, rgba(16,185,129,0.35), transparent)`,
        }}
      />
      
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="flex flex-col pt-15 items-center justify-center min-h-screen relative z-10 px-6">
        <main className="relative z-10 text-center max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Bucks Bunny — Hop Into Smarter
          </h1>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
            Invoicing & Income
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 leading-relaxed">
            Create invoices, track income, and split earnings effortlessly.
          </p>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            Get clear, actionable monthly reports — all in one smart hub.
          </p>
          
          <div className="flex justify-center">
            <Link href="/auth/signup">
              <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors w-full sm:w-auto">
                Start Free Trial
              </button>
            </Link>
          </div>
        </main>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything You Need to Manage Your Business
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              BucksBunny provides all the tools freelancers and small businesses need to stay organized and profitable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
              <div className="w-16 h-16 bg-green-500 rounded-full mb-6 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white rounded"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart Invoicing</h3>
              <p className="text-gray-300 leading-relaxed">
                Create professional invoices in seconds. Customize templates, add your branding, and send them directly to clients.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
              <div className="w-16 h-16 bg-green-500 rounded-full mb-6 flex items-center justify-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-8 bg-white rounded"></div>
                  <div className="w-2 h-6 bg-white rounded"></div>
                  <div className="w-2 h-4 bg-white rounded"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Income Tracking</h3>
              <p className="text-gray-300 leading-relaxed">
                Monitor your earnings in real-time. Track payments, pending invoices, and get insights into your cash flow.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
              <div className="w-16 h-16 bg-green-500 rounded-full mb-6 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white rounded-full relative">
                  <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full"></div>
                  <div className="absolute bottom-1 right-1 w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Earnings Split</h3>
              <p className="text-gray-300 leading-relaxed">
                Automatically split earnings between business and personal accounts. Perfect for freelancers managing multiple income streams.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
              <div className="w-16 h-16 bg-green-500 rounded-full mb-6 flex items-center justify-center">
                <div className="w-8 h-6 bg-white rounded border-b-2 border-green-500"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Monthly Reports</h3>
              <p className="text-gray-300 leading-relaxed">
                Get comprehensive monthly reports with actionable insights. Perfect for tax preparation and business planning.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
              <div className="w-16 h-16 bg-green-500 rounded-full mb-6 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white rounded-lg relative">
                  <div className="absolute inset-2 bg-white rounded"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Client Management</h3>
              <p className="text-gray-300 leading-relaxed">
                Keep track of all your clients, their contact information, project history, and payment status in one place.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
              <div className="w-16 h-16 bg-green-500 rounded-full mb-6 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white rounded-full relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Tax Preparation</h3>
              <p className="text-gray-300 leading-relaxed">
                Simplify tax season with organized financial data, expense tracking, and detailed reports ready for your accountant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-slate-800/30 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How BucksBunny Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get started in minutes with our simple three-step process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">1</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Sign Up & Setup</h3>
              <p className="text-gray-300 leading-relaxed">
                Create your account and set up your business profile in under 5 minutes. Add your logo and branding.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">2</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Create & Send</h3>
              <p className="text-gray-300 leading-relaxed">
                Build professional invoices with our intuitive editor. Send them directly to clients and track their status.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">3</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Track & Grow</h3>
              <p className="text-gray-300 leading-relaxed">
                Monitor payments, analyze your income trends, and make data-driven decisions to grow your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trusted by Thousands of Entrepreneurs
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 text-yellow-400 mr-1">★</div>
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                &ldquo;BucksBunny transformed how I manage my freelance business. The income splitting feature alone saves me hours of accounting work every month.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">SJ</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Sarah Johnson</p>
                  <p className="text-gray-400">Graphic Designer</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 text-yellow-400 mr-1">★</div>
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                &ldquo;The monthly reports are a game-changer. I finally understand my business finances and can make informed decisions about growth.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">MC</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Mike Chen</p>
                  <p className="text-gray-400">Web Developer</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 text-yellow-400 mr-1">★</div>
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                &ldquo;Simple, powerful, and exactly what my consulting business needed. The professional invoices help me look more established to clients.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">ER</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Emily Rodriguez</p>
                  <p className="text-gray-400">Business Consultant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-3xl p-12 border border-green-500/30">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Hop Into Better Business Management?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join thousands of entrepreneurs who trust BucksBunny to keep their finances organized and their businesses thriving.
            </p>
            <div className="flex justify-center">
              <Link href="/auth/signup">
                <button className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-lg font-bold text-lg transition-colors w-full sm:w-auto">
                  Start Your Free Trial
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-12 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-8">
            <h3 className="text-white font-bold text-2xl mb-4">BucksBunny</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Simplifying financial management for entrepreneurs and small businesses everywhere.
            </p>
          </div>
          
          <div className="border-t border-slate-700 pt-8">
            <p className="text-gray-400">
              © 2025 BucksBunny. All rights reserved. Made with 💚 for entrepreneurs.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
