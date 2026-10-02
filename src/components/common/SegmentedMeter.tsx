import React from 'react';

interface SegmentedMeterProps {
  total?: number;
  value: number; // number of filled segments (e.g. 8 out of 10)
  color?: 'blue' | 'mint' | 'amber' | 'purple' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SegmentedMeter: React.FC<SegmentedMeterProps> = ({
  total = 10,
  value,
  color = 'blue',
  size = 'md',
  className = '',
}) => {
  const segments = Array.from({ length: total }, (_, i) => i);

  const getColorClasses = (isFilled: boolean) => {
    if (!isFilled) {
      return 'bg-[#252831] opacity-70';
    }
    switch (color) {
      case 'mint':
        return 'bg-[#66D4AA]';
      case 'amber':
        return 'bg-[#F4C36A]';
      case 'purple':
        return 'bg-[#BEB0F4]';
      case 'gray':
        return 'bg-[#727681]';
      case 'blue':
      default:
        return 'bg-[#ACD9F3]';
    }
  };

  const getHeightClass = () => {
    switch (size) {
      case 'sm':
        return 'h-1.5 w-2.5 rounded-[2px]';
      case 'lg':
        return 'h-2.5 w-6 rounded-[3px]';
      case 'md':
      default:
        return 'h-2 w-4 rounded-[2px]';
    }
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {segments.map((index) => {
        const isFilled = index < value;
        return (
          <div
            key={index}
            className={`${getHeightClass()} ${getColorClasses(isFilled)} transition-colors duration-200`}
          />
        );
      })}
    </div>
  );
};
