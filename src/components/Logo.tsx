import { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'default' | 'white' | 'gradient';
  compact?: boolean;
}

export default function Logo({ className = '', size = 'md', variant = 'default', compact = false }: LogoProps) {
  const [imageError, setImageError] = useState(false);
  
  const sizeClasses = {
    xs: 'w-16 h-8',
    sm: 'w-24 h-12',
    md: 'w-32 h-16',
    lg: 'w-40 h-20',
    xl: 'w-60 h-30',
    '2xl': 'w-80 h-40'
  };

  const imageSources = {
    default: '/mu-komik_gradieent.png',
    white: '/mu-komik_gradieent.png',
    gradient: '/mu-komik_gradieent.png'
  };

  const filterClasses = {
    default: '',
    white: 'filter brightness-0 invert',
    gradient: ''
  };

  const handleImageError = () => {
    console.error('Failed to load logo image:', imageSources[variant]);
    setImageError(true);
  };

  if (imageError) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className={`${sizeClasses[size]} bg-gray-200 flex items-center justify-center rounded-lg`}>
          <span className="text-gray-500 text-xs font-bold">MU KOMIK</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src={imageSources[variant]}
        alt="MU KOMIK Logo"
        className={`${sizeClasses[size]} object-contain ${filterClasses[variant]}`}
        onError={handleImageError}
        onLoad={() => console.log('Logo loaded successfully:', imageSources[variant])}
      />
    </div>
  );
} 