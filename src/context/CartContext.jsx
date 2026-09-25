import { createContext, useContext, useState, useCallback, useEffect } from 'react';
const CartContext = createContext(undefined);
const STORAGE_KEY = 'fandomverse_cart';
export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored)
                setItems(JSON.parse(stored));
        }
        catch {
            // ignore
        }
    }, []);
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        }
        catch {
            // ignore
        }
    }, [items]);
    const addItem = useCallback((merch) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === merch.id);
            if (existing) {
                return prev.map((i) => i.id === merch.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [
                ...prev,
                {
                    id: merch.id,
                    name: merch.name,
                    price: merch.price,
                    image: merch.image,
                    category: merch.category,
                    quantity: 1,
                },
            ];
        });
        setIsOpen(true);
    }, []);
    const removeItem = useCallback((id) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    }, []);
    const updateQuantity = useCallback((id, delta) => {
        setItems((prev) => prev
            .map((i) => i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i)
            .filter((i) => i.quantity > 0));
    }, []);
    const clearCart = useCallback(() => setItems([]), []);
    const openCart = useCallback(() => setIsOpen(true), []);
    const closeCart = useCallback(() => setIsOpen(false), []);
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    return (<CartContext.Provider value={{
            items,
            isOpen,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            openCart,
            closeCart,
            totalItems,
            totalPrice,
        }}>
      {children}
    </CartContext.Provider>);
}
export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx)
        throw new Error('useCart must be used within CartProvider');
    return ctx;
}
