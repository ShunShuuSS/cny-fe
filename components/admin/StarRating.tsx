"use client";

import { useState } from "react";

interface StarRatingProps {
  value?: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
}

export default function StarRating({
  value,
  onChange,
  readonly = false,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const stars = [1, 2, 3, 4, 5];

  const getStarDisplay = (starPosition: number, currentValue?: number) => {
    if (!currentValue) return "☆";

    // Full star if position is less than or equal to the value
    if (starPosition <= currentValue) {
      return "★";
    }
    // Half star if this position is between floor and ceil (e.g., 2.5 shows half at position 3)
    if (
      starPosition > Math.floor(currentValue) &&
      starPosition <= Math.ceil(currentValue) &&
      currentValue % 1 !== 0
    ) {
      return "⯨"; // Half star symbol
    }
    return "☆";
  };

  const handleStarClick = (starPosition: number, isLeftHalf: boolean) => {
    if (readonly) return;
    const rating = isLeftHalf ? starPosition - 0.5 : starPosition;
    onChange?.(rating);
  };

  const handleMouseMove = (
    starPosition: number,
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (readonly) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeftHalf = x < rect.width / 2;
    setHoverValue(isLeftHalf ? starPosition - 0.5 : starPosition);
  };

  const displayValue = hoverValue ?? value ?? 0;

  return (
    <div className="flex gap-1" onMouseLeave={() => setHoverValue(null)}>
      {stars.map((star) => (
        <div
          key={star}
          onMouseMove={(e) => handleMouseMove(star, e)}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const isLeftHalf = x < rect.width / 2;
            handleStarClick(star, isLeftHalf);
          }}
          className={`relative text-2xl transition-transform ${
            readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
          }`}
        >
          <span className="select-none">
            {getStarDisplay(star, displayValue)}
          </span>
        </div>
      ))}
      {!readonly && value && (
        <span className="ml-2 text-sm text-gray-600 self-center">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}
