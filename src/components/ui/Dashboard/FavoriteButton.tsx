// components/common/FavoriteButton.tsx
import React from 'react';
import { Star } from 'lucide-react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onClick,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      className={`text-white/80 hover:text-white ${className}`}
      aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      {isFavorite ? <Star size={18} fill="white" /> : <Star size={18} />}
    </button>
  );
};

export default FavoriteButton;