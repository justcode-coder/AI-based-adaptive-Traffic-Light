import { useEffect, useState } from "react";

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen = ({ onComplete }: WelcomeScreenProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in
    const fadeInTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Fade out and complete
    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3800);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div
        className={`transition-all duration-1000 transform ${
          isVisible
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95"
        }`}
      >
        <div className="glass-panel p-12 md:p-20 relative overflow-hidden">
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-neon-cyan/20 to-neon-purple/20 animate-pulse" />
          
          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-5xl md:text-8xl font-bold text-center neon-text mb-4 breathing">
              WELCOME
            </h1>
            <h2 className="text-4xl md:text-7xl font-bold text-center neon-text pulse-glow">
              JUDGES
            </h2>
            
            {/* Decorative elements */}
            <div className="flex justify-center gap-4 mt-8">
              <div className="h-1 w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="h-1 w-20 bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
              <div className="h-1 w-20 bg-gradient-to-r from-transparent via-neon-purple to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
