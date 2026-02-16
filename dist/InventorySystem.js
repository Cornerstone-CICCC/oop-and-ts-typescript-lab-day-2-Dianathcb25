"use strict";
// 📦 Inventory Management System
// 🛒 Create a system to manage a store’s inventory.
//
// 1. Implement a class `InventoryManager<T>` that manages stock for different product types.
// 2. Implement a method `addProduct` that adds a new product to the inventory. It should return a confirmation string.
// 3. Implement a method `updateProduct` that updates an existing product’s details. It should return a confirmation string. Use the Partial type for the update parameter since not all details will be updated.
// 4. Implement a method `removeProduct` that removes a product from the inventory and returns a confirmation string.
// 5. Implement a method `getProduct` that retrieves a product by its ID.
// 6. Implement a method `getAllProducts` that returns the list of all products.
class InventoryManager {
    constructor() {
        this.products = [];
    }
    findProduct(id) {
        return this.products.findIndex((product) => product.id === id);
    }
    addProduct(product) {
        this.products.push(product);
        return `Product ${product.name} added successfully!`;
    }
    updateProduct(id, update) {
        const index = this.findProduct(id);
        if (index === -1)
            return 'Product not found.';
        this.products[index] = Object.assign(Object.assign({}, this.products[index]), update);
        return `Product ${id} updated successfully!`;
    }
    getProduct(id) {
        const index = this.findProduct(id);
        if (index === -1)
            return 'Product not found.';
        return this.products[index];
    }
    getAllProducts() {
        return [...this.products];
    }
    removeProduct(id) {
        const index = this.findProduct(id);
        if (index === -1)
            return 'Product not found.';
        this.products.splice(index, 1);
        return `Product ${id} removed successfully!`;
    }
}
// Test cases
const inventory = new InventoryManager();
console.log(inventory.addProduct({ id: 1, name: 'Laptop', price: 1000, stock: 5 })); // "Product Laptop added successfully!"
console.log(inventory.addProduct({ id: 2, name: 'Mouse', price: 20, stock: 50 })); // "Product Mouse added successfully!"
console.log(inventory.updateProduct(1, { price: 900 })); // "Product 1 updated successfully!"
console.log(inventory.getProduct(1)); // { id: 1, name: "Laptop", price: 900, stock: 5 }
console.log(inventory.getAllProducts()); // List of all products
console.log(inventory.removeProduct(1)); // "Product 1 removed successfully!"
console.log(inventory.getProduct(1)); // "Product not found"
console.log(inventory.addProduct({
    id: 3,
    name: 'Motorola Rarz 60 Ultra',
    price: 1400,
    stock: 7,
}));
console.log(inventory.addProduct({ id: 4, name: 'Monitor', price: 1000, stock: 10 }));
console.log(inventory.getProduct(3));
console.log(inventory.updateProduct(3, { price: 950 }));
console.log(inventory.getAllProducts());
console.log(inventory.removeProduct(2));
console.log(inventory.getProduct(2));
console.log(inventory.getAllProducts());
