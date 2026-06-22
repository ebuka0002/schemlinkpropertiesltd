import { Link } from 'react-router-dom';

const Logo = ({ size = 'md', light = false }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-20',
    lg: 'h-15',
  };

  return (
    <Link to="/" className="flex items-center gap-3 group">
      <img
        src="/logo.png"
        alt="Schemelink Properties Ltd"
        className={`${sizeClasses[size]} w-auto object-contain`}
      />
      <div className="flex flex-col">
        <span className={`font-heading font-bold text-lg leading-tight ${light ? 'text-white' : 'text-dark'}`}>
          Schemelink
        </span>
        <span className={`text-[10px] uppercase tracking-widest leading-tight ${light ? 'text-white/80' : 'text-gray-500'}`}>
          Properties Ltd
        </span>
      </div>
    </Link>
  );
};

export default Logo;