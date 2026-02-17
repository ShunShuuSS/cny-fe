"use client";

import { useState } from "react";

interface CategoryRatingProps {
  value?: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  icon: string; // Emoji or icon to use
  category: "career" | "wealth" | "health" | "romance";
}

export default function CategoryRating({
  value,
  onChange,
  readonly = false,
  icon,
  category,
}: CategoryRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const positions = [1, 2, 3, 4, 5];

  const getColorClass = () => {
    switch (category) {
      case "career":
        return "text-orange-500";
      case "wealth":
        return "text-yellow-500";
      case "health":
        return "text-red-500";
      case "romance":
        return "text-pink-500";
      default:
        return "text-gray-500";
    }
  };

  const getIconDisplay = (position: number, currentValue?: number) => {
    if (!currentValue) return <span className="opacity-30">{icon}</span>;

    // Full icon if position is less than or equal to the value
    if (position <= currentValue) {
      return <span className={getColorClass()}>{icon}</span>;
    }
    // Half-filled icon for half rating
    if (
      position > Math.floor(currentValue) &&
      position <= Math.ceil(currentValue) &&
      currentValue % 1 !== 0
    ) {
      return (
        <span className="relative inline-block">
          <span className="opacity-30">{icon}</span>
          <span
            className={`absolute inset-0 overflow-hidden ${getColorClass()}`}
            style={{ width: "50%" }}
          >
            {icon}
          </span>
        </span>
      );
    }
    return <span className="opacity-30">{icon}</span>;
  };

  const handleClick = (position: number, isLeftHalf: boolean) => {
    if (readonly) return;
    const rating = isLeftHalf ? position - 0.5 : position;
    onChange?.(rating);
  };

  const handleMouseMove = (
    position: number,
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (readonly) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeftHalf = x < rect.width / 2;
    setHoverValue(isLeftHalf ? position - 0.5 : position);
  };

  const displayValue = hoverValue ?? value ?? 0;

  return (
    <div className="flex gap-1" onMouseLeave={() => setHoverValue(null)}>
      {positions.map((position) => (
        <div
          key={position}
          onMouseMove={(e) => handleMouseMove(position, e)}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const isLeftHalf = x < rect.width / 2;
            handleClick(position, isLeftHalf);
          }}
          className={`relative text-2xl transition-transform ${
            readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
          }`}
        >
          <span className="select-none">
            {getIconDisplay(position, displayValue)}
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
