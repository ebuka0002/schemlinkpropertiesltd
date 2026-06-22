import { motion } from 'framer-motion';

/**
 * Loading spinner component for async operations
 */
const LoadingSpinner = ({ size = 'md', fullScreen = false }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  const spinner = (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`${sizeClasses[size]} border-primary border-t-transparent rounded-full`}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/90 z-[200] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          {spinner}
          <p className="text-dark font-medium font-heading">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      {spinner}
    </div>
  );
};

export default LoadingSpinner;
