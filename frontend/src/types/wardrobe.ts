export type WardrobeItem = {
  id: string;
  name: string;
  category: string;
  brand?: string;
  color?: string;
  imageUrl: string;
  wearCount?: number;
  price?: number;
  status?: 'clean' | 'dirty' | 'laundry';
  laundryStatus?: 'clean' | 'dirty' | 'laundry';
  season?: string;
  fit?: string;
  tags?: string[];
  occasion?: string;
};

export const INITIAL_ITEMS: WardrobeItem[] = [
  {
    id: '1',
    name: 'Oversized Heavyweight Boxy Tee',
    category: 'Tops',
    brand: 'Acne Studios',
    color: 'Matte Black',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    wearCount: 18,
    price: 120,
    status: 'clean',
    laundryStatus: 'clean',
    season: 'Summer',
    fit: 'Oversized',
    tags: ['Streetwear', 'Casual', 'Essential']
  },
  {
    id: '2',
    name: 'Vintage Straight Leg Raw Denim',
    category: 'Bottoms',
    brand: 'Levi\'s 501',
    color: 'Washed Blue',
    imageUrl: 'https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80',
    wearCount: 28,
    price: 95,
    status: 'clean',
    laundryStatus: 'clean',
    season: 'All-Season',
    fit: 'Straight',
    tags: ['Denim', 'Vintage', 'Daily']
  },
  {
    id: '3',
    name: 'Minimalist Off-White Leather Lows',
    category: 'Footwear',
    brand: 'Common Projects',
    color: 'Pure White',
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    wearCount: 42,
    price: 340,
    status: 'clean',
    laundryStatus: 'clean',
    season: 'All-Season',
    fit: 'Regular',
    tags: ['Minimalist', 'Footwear', 'Clean']
  }
];
