import Image from "next/image";

export default function CharacterOverlay() {
  return (
    <div className="hidden md:block absolute inset-0 pointer-events-none">
      {/* VFX Overlay for Desktop - Enhanced visual effects */}
      <div className="absolute right-0 top-32 w-1/2 h-3/4">
        {/* Enhanced VFX Elements */}
        <div className="absolute inset-0 pointer-events-none z-50">
          {/* Floating stars with rotation */}
          <div className="absolute top-10 right-20 w-3 h-3 bg-yellow-300 rounded-full animate-floating-star opacity-80"></div>
          <div className="absolute top-20 right-40 w-2 h-2 bg-pink-300 rounded-full animate-floating-star delay-500 opacity-70"></div>
          <div className="absolute bottom-20 right-30 w-2.5 h-2.5 bg-blue-300 rounded-full animate-floating-star delay-1000 opacity-90"></div>
          <div className="absolute top-40 right-10 w-1.5 h-1.5 bg-purple-300 rounded-full animate-floating-star delay-1500 opacity-60"></div>
          <div className="absolute bottom-40 right-50 w-3 h-3 bg-orange-300 rounded-full animate-floating-star delay-2000 opacity-80"></div>
          
          {/* Motion lines with dynamic animation */}
          <div className="absolute top-0 right-1/3 w-1 h-12 bg-gradient-to-b from-transparent via-yellow-400 to-transparent animate-motion-line opacity-60"></div>
          <div className="absolute bottom-0 right-1/4 w-1 h-8 bg-gradient-to-b from-transparent via-pink-400 to-transparent animate-motion-line delay-700 opacity-50"></div>
          <div className="absolute top-1/2 right-1/6 w-1 h-6 bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-motion-line delay-1200 opacity-70"></div>
          
          {/* Sparkle effects with scale and rotation */}
          <div className="absolute top-15 right-25 w-4 h-4 bg-white rounded-full animate-sparkle opacity-90 transform rotate-45"></div>
          <div className="absolute bottom-15 right-35 w-3 h-3 bg-white rounded-full animate-sparkle delay-300 opacity-80 transform -rotate-45"></div>
          <div className="absolute top-30 right-15 w-3.5 h-3.5 bg-white rounded-full animate-sparkle delay-800 opacity-70 transform rotate-90"></div>
          
          {/* Additional sparkles */}
          <div className="absolute top-5 right-45 w-2 h-2 bg-cyan-300 rounded-full animate-sparkle delay-400 opacity-90"></div>
          <div className="absolute bottom-10 right-5 w-2.5 h-2.5 bg-emerald-300 rounded-full animate-sparkle delay-600 opacity-80"></div>
          <div className="absolute top-50 right-25 w-1.5 h-1.5 bg-violet-300 rounded-full animate-sparkle delay-900 opacity-70"></div>
          
          {/* Energy particles */}
          <div className="absolute top-12 right-32 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse-glow delay-200 opacity-90"></div>
          <div className="absolute bottom-25 right-18 w-1 h-1 bg-pink-400 rounded-full animate-pulse-glow delay-400 opacity-80"></div>
          <div className="absolute top-35 right-42 w-1 h-1 bg-blue-400 rounded-full animate-pulse-glow delay-600 opacity-70"></div>
        </div>
        
        {/* Desktop Character Layout - positioned higher to avoid text overlap */}
        <div className="flex items-start justify-center">
          {/* Character 1 - Main character (largest) */}
          <div className="relative w-64 h-80 mb-4 mr-4 animate-character-float">
            <Image
              src="/tokoh1.png"
              alt="Character 1"
              fill
              className="object-contain object-bottom"
              priority
            />
            {/* Floating decorative elements */}
            <div className="absolute -top-6 -right-6 w-10 h-10 bg-yellow-300 rounded-full opacity-60 animate-pulse-glow" style={{animationDelay: '0.3s', animationDuration: '2.5s'}}></div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-orange-300 rounded-full opacity-60 animate-pulse-glow" style={{animationDelay: '1.7s', animationDuration: '3.2s'}}></div>
          </div>
          
          {/* Character 2 - Secondary character */}
          <div className="relative w-56 h-72 mb-8 ml-2 animate-character-float" style={{animationDelay: '0.8s', animationDuration: '2.8s'}}>
            <Image
              src="/tokoh2.png"
              alt="Character 2"
              fill
              className="object-contain object-bottom"
              priority
            />
            {/* Floating decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-300 rounded-full opacity-60 animate-pulse-glow" style={{animationDelay: '0.5s', animationDuration: '2.1s'}}></div>
            <div className="absolute -bottom-6 -left-6 w-10 h-10 bg-pink-300 rounded-full opacity-60 animate-pulse-glow" style={{animationDelay: '2.3s', animationDuration: '2.9s'}}></div>
          </div>
          
          {/* Character 3 - Tertiary character */}
          <div className="relative w-48 h-64 mb-12 ml-6 animate-character-float" style={{animationDelay: '1.2s', animationDuration: '3.1s'}}>
            <Image
              src="/tokoh3.png"
              alt="Character 3"
              fill
              className="object-contain object-bottom"
              priority
            />
            {/* Floating decorative elements */}
            <div className="absolute -top-8 -right-8 w-12 h-12 bg-blue-300 rounded-full opacity-60 animate-pulse-glow" style={{animationDelay: '0.9s', animationDuration: '2.4s'}}></div>
            <div className="absolute -bottom-8 -left-8 w-10 h-10 bg-green-300 rounded-full opacity-60 animate-pulse-glow" style={{animationDelay: '1.8s', animationDuration: '3.5s'}}></div>
          </div>
        </div>
      </div>
      
      {/* Additional floating elements around characters - random positions and delays */}
      <div className="absolute right-32 top-1/4 w-6 h-6 bg-yellow-300 rounded-full opacity-40 animate-pulse-glow" style={{animationDelay: '0.4s', animationDuration: '2.7s'}}></div>
      <div className="absolute right-48 top-1/3 w-4 h-4 bg-orange-300 rounded-full opacity-40 animate-pulse-glow" style={{animationDelay: '1.1s', animationDuration: '2.3s'}}></div>
      <div className="absolute right-24 bottom-1/3 w-8 h-8 bg-purple-300 rounded-full opacity-40 animate-pulse-glow" style={{animationDelay: '0.7s', animationDuration: '3.0s'}}></div>
      <div className="absolute right-56 bottom-1/4 w-5 h-5 bg-pink-300 rounded-full opacity-40 animate-pulse-glow" style={{animationDelay: '1.6s', animationDuration: '2.6s'}}></div>
      <div className="absolute right-40 top-1/2 w-7 h-7 bg-blue-300 rounded-full opacity-40 animate-pulse-glow" style={{animationDelay: '0.2s', animationDuration: '2.9s'}}></div>
      <div className="absolute right-16 top-2/3 w-5 h-5 bg-green-300 rounded-full opacity-40 animate-pulse-glow" style={{animationDelay: '1.4s', animationDuration: '2.8s'}}></div>
    </div>
  );
} 