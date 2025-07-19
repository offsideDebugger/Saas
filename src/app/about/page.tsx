import AboutContent from "@/components/landing/aboutsection";


export default function About() {
  return (
    <div className="min-h-screen w-full bg-[#020617] relative">
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: `radial-gradient(circle 500px at 50% 300px, rgba(16,185,129,0.35), transparent)`,
                }}
              />
                
             
              <div className="flex flex-col items-center pt-20 justify-center min-h-screen relative z-10">
                <AboutContent />
              </div>
            
    </div>
  );
}
