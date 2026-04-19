// Lightweight mock auth for the prototype. Ready to swap with Lovable Cloud.
export type Role = "musician" | "organizer";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  location: string;
  genres?: string;
  priceRange?: string;
  bio?: string;
  media?: string;
};

const KEY = "gigsync_user";

export const getUser = (): User | null => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
};

export const setUser = (u: User) => localStorage.setItem(KEY, JSON.stringify(u));
export const clearUser = () => localStorage.removeItem(KEY);
