import React from 'react'
import { Star } from 'lucide-react'
const Stars = ({rating}) => {
    const getFillPercentage = (starIndex, rating) => {
      const value = rating - (starIndex - 1);
    
      if (value >= 1) return 100;
      if (value <= 0) return 0;
    
      return value * 100;
    };
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = getFillPercentage(star, rating);

        return (
          <div key={star} className="relative w-5 h-5">
            {/* Empty star */}
            <Star className="absolute text-gray-300 w-5 h-5" />

            {/* Filled portion */}
            <div
              className="absolute overflow-hidden"
              style={{ width: `${fill}%` }}
            >
              <Star
                className="fill-[var(--accent)] text-[var(--accent)] w-5 h-5"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Stars