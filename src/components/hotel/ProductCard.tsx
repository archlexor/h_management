import { Heart, MapPin, Star, Wifi, Car, Coffee } from "lucide-react";
import { formatCurrency } from "@/utils";

type AmenityKey = "wifi" | "parking" | "breakfast";

const amenityIcons: Record<AmenityKey, typeof Wifi> = {
  wifi: Wifi,
  parking: Car,
  breakfast: Coffee,
};

export interface ProductCardProps {
  amenities: AmenityKey[];
  img: string;
  isFavorite: boolean;
  loc: string;
  name: string;
  onToggleFavorite: () => void;
  price: number;
  rating: number;
  reviews: number;
}

export default function ProductCard({
  amenities,
  img,
  isFavorite,
  loc,
  name,
  onToggleFavorite,
  price,
  rating,
  reviews,
}: ProductCardProps) {
  return (
    <article className="group bg-card rounded-2xl overflow-hidden border border-border shadow-warm hover:shadow-elevated transition-shadow duration-300">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={img} alt={name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <button
          onClick={onToggleFavorite}
          className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
        >
          <Heart className={`w-5 h-5 transition-colors ${isFavorite ? "fill-primary text-primary" : "text-foreground"}`} />
        </button>
        <div className="absolute top-4 left-4 flex items-center gap-1 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full">
          <Star className="w-4 h-4 fill-gold text-gold" />
          <span className="text-sm font-semibold text-foreground">{rating}</span>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-card-foreground">{name}</h3>
        <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
          <MapPin className="w-3.5 h-3.5" />
          {loc}
        </p>

        <div className="flex items-center gap-2 mt-3">
          {amenities.map((amenity) => {
            const Icon = amenityIcons[amenity];

            return (
              <div key={amenity} className="p-1.5 rounded-md bg-secondary" title={amenity}>
                <Icon className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div>
            <span className="text-xl font-bold text-foreground">{formatCurrency(price)}</span>
            <span className="text-sm text-muted-foreground"> / night</span>
          </div>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            Book Now
          </button>
        </div>
      </div>
    </article>
  );
}