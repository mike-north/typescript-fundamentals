interface CartItem {
  name: string,
  price: number,
  qty: number,
}

interface CartAPI {
  length: number,
  total: number,
  addItem: (obj: CartItem) => void,
  add: (name: string, price: number, qty?: number) => void,
}

export const cashier = (): CartAPI => {
  const items: CartItem[] = [];
  return {
    get length(): number {
      if (items.length > 0) {
        let total = 0;
        for (let i = 0; i < items.length; i++) {
          const element: CartItem = items[i];
          total += element.qty;
        }
        return total;
      }
      return 0;
    },
    get total(): number {
      if (items.length > 0) {
        let total = 0;
        for (let i = 0; i < items.length; i++) {
          const element: CartItem = items[i];
          total += (element.price * element.qty);
        }
        return total;
      }
      return 0;
    },
    addItem(obj) {
      items.push(obj);
    },
    add(name, price, qty = 1) {
      const it: CartItem = {
        name,
        price,
        qty,
      };
      items.push(it);
    },
  };
}
