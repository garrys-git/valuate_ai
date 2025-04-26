import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-300 flex flex-col items-center justify-start p-8">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden">
        
        {/* Hero Section with Text Over Image */}
        <div className="relative w-full h-76 rounded-3xl overflow-hidden shadow-2xl mb-3">
            {/* Background Image */}
            <img
                src="/images/dcf-main-light.jpg"
                alt="About Valuate.AI"
                className="w-full h-full object-cover"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent flex flex-col items-center justify-center text-center p-8">
            <h1 className="text-4xl font-extrabold text-white mb-16">About Us</h1>
            <p className="text-lg text-gray-200">
                Empowering investors with cutting-edge AI tools for smarter financial decisions. <br />
                As we say, <span className="italic font-semibold text-slate-400">Simplify your Finances, Amplify your Future.</span>
            </p>
            </div>
        </div>  
        <div className="p-10">
          <div className="space-y-6 text-gray-700 text-md leading-relaxed">
            <p>
              At <a href="/"><span className="font-semibold text-blue-600">valuate.ai</span></a>, we combine advanced
              artificial intelligence with sleek design to bring you accurate, real-time asset valuations and
              portfolio insights. Whether you're just starting out or optimizing a growing portfolio,
              our platform is built to support your financial journey.
            </p>

            <p>
              We believe investing should be accessible, intelligent, and personalized. With a focus on simplicity,
              security, and performance, valuate.ai equips you with the tools you need to stay ahead in a rapidly
              changing market.
            </p>

            <ul className="list-disc list-inside space-y-2">
              <li>🚀 AI-powered asset DCF valuations</li>
              <li>📊 Real-time portfolio risk analysis</li>
              <li>🔒 Advanced Trading Indicators</li>
              <li>🎯 Designed for both new and seasoned investors</li>
            </ul>

            {/* Background Section */}
            <div className="relative mt-16">
            <div className="absolute inset-0">
                <img 
                src="/images/about-hero.jpg" // <-- Your background image here
                alt="Background"
                className="w-full h-full object-cover opacity-50 rounded-xl"
                />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center py-12 px-4">
                <p className="text-2xl font-bold text-slate-500 text-center mb-10">
                Your portfolio. Your future. <span className="text-2xl font-bold text-slate-700">Valuated</span>
                </p>

                <a
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition duration-300"
                >
                Start Your Journey ➔
                </a>
            </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}