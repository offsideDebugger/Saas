import Link from "next/link"
import Image from "next/image"
import logo from "../../../assets/logo2.png"
export default function AboutContent() {
  return (
    <>
    <div>
      <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src={logo} className="rounded-full" alt="BucksBunny Logo" width={60} height={60}/>
            
        </Link>
    </div>
    <div>
     
      {/* Hero Section */}
      <div className="px-6 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About BucksBunny</h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          We&#39;re on a mission to simplify financial management for freelancers, small businesses, and entrepreneurs
          everywhere.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        {/* Story Section */}
        <div className="mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              BucksBunny was born from a simple frustration: managing invoices and tracking income shouldn&#39;t be
              complicated. As freelancers ourselves, we experienced firsthand the chaos of scattered spreadsheets,
              missed payments, and tax-time nightmares.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              We decided to hop into action and create a solution that&#39;s as smart as it is simple. Today, thousands of
              users trust BucksBunny to keep their finances organized and their businesses running smoothly.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <h3 className="text-white text-xl font-semibold mb-3">Simplicity</h3>
              <p className="text-slate-300">We believe powerful tools should be easy to use, not overwhelming.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <h3 className="text-white text-xl font-semibold mb-3">Community</h3>
              <p className="text-slate-300">
                We&#39;re building more than software—we&#39;re building a community of successful entrepreneurs.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
              </div>
              <h3 className="text-white text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-slate-300">
                We&#39;re committed to delivering the highest quality experience in everything we do.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full relative">
                  <div className="absolute inset-1 bg-teal-600 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-white text-xl font-semibold mb-3">Passion</h3>
              <p className="text-slate-300">We&#39;re passionate about helping small businesses thrive and succeed.</p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-slate-800/50 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8">
            To empower entrepreneurs and small businesses with intuitive financial tools that save time, reduce stress,
            and help them focus on what they do best—growing their business.
          </p>
          <Link href="/auth/signin"><button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Start Your Journey
          </button></Link>
        </div>
      </div>
    </div>
    </>
  )
}
