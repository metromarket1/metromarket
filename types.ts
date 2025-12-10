export interface MenuItem {
  name: string;
  price: number;
  description?: string; // Some items like drinks might not have a recipe/desc
  category: string;
}

export interface CartItem extends MenuItem {
  qty: number;
  notes: string;
}

export interface Cart {
  [key: string]: CartItem;
}

export interface UserDetails {
  name: string;
  phone: string;
  company: string;
  deliveryTime: string;
}

export type Category = 'sandwiches' | 'salads' | 'starters' | 'drinks';

export interface OrderData extends UserDetails {
  id?: string;
  orders: {
    order: string;
    qty: number;
    notes: string;
  }[];
  total: number;
  createdAt: string;
}

export interface MenuAvailability {
  [itemName: string]: boolean;
}