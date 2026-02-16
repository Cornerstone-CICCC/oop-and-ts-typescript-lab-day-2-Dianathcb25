// 🛍️ E-Commerce Cart System
// 🛒 Create a shopping cart system that manages products and their quantities.
//
// 1. Implement a class `ShoppingCart<T>` to handle products in a cart.
// 2. Implement a method `addToCart` that adds a product to the cart and updates the quantity if it already exists.
// 3. Implement a method `removeFromCart` that removes a product from the cart completely.
// 4. Implement a method `updateQuantity` that updates the quantity of a product in the cart.
// 5. Implement a method `getProductsOfCategory` that accepts a string and returns an array of items from the cart that match that category.
// 6. Implement a method `getTotalPrice` that returns the total cost of all items in the cart.

enum Category {
  Fruit = 'Fruit',
  Vegetable = 'Vegetable',
  Electronics = 'Electronics',
  Pastry = 'Pastry',
  Cereal = 'Cereal',
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: Category;
}

class ShoppingCart<T extends CartItem> {
  cart: T[] = [];

  findItem(id: number): T | undefined {
    return this.cart.find((item) => item.id === id);
  }

  addToCart(product: T): string {
    if (product.quantity <= 0) return 'Quantity must be grater than 0.';
    if (product.price < 0) return 'Price cannot be negative.';

    const existingProduct = this.findItem(product.id);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
      return `${existingProduct.name} quantity updated to ${existingProduct.quantity}.`;
    }
    this.cart.push(product);
    return `${product.name} added to cart.`;
  }

  updateQuantity(id: number, qty: number): string {
    const item = this.findItem(id);
    if (!item) return 'Product not found.';
    if (qty <= 0) return 'Quantity must be grater than 0.';

    item.quantity = qty;
    return `Updated quantity of ${item.name} to "${qty}.`;
  }

  getTotalPrice(): number {
    return this.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }

  getProductsOfCategory(category: Category): T[] {
    return this.cart.filter((item) => item.category === category);
  }

  removeFromCart(id: number): string {
    const index = this.cart.findIndex((item) => item.id === id);
    if (index === -1) return 'Product not found.';

    const removed = this.cart.splice(index, 1)[0];
    return `${removed.name} removed from cart.`;
  }
}

// Test cases
const cart = new ShoppingCart();

console.log(
  cart.addToCart({
    id: 1,
    name: 'Headphones',
    price: 50,
    quantity: 1,
    category: Category.Electronics,
  }),
); // "Headphones added to cart."
console.log(
  cart.addToCart({
    id: 2,
    name: 'Keyboard',
    price: 100,
    quantity: 1,
    category: Category.Electronics,
  }),
); // "Keyboard added to cart."
console.log(cart.updateQuantity(1, 3)); // "Updated quantity of Headphones to 3."
console.log(cart.getProductsOfCategory('Electronics')); // Should return all electronics
console.log(cart.getTotalPrice()); // Should return the total cost of items
console.log(cart.removeFromCart(2)); // "Keyboard removed from cart."

console.log(
  cart.addToCart({
    id: 3,
    name: 'Froot Loops',
    price: 15,
    quantity: 2,
    category: Category.Cereal,
  }),
);
console.log(
  cart.addToCart({
    id: 4,
    name: 'Lucky Charms',
    price: 20,
    quantity: 1,
    category: Category.Cereal,
  }),
);
console.log(cart.getProductsOfCategory('Cereal'));
console.log(cart.updateQuantity(3, 5));
console.log(cart.updateQuantity(4, 10));
console.log(cart.getProductsOfCategory('Cereal'));
