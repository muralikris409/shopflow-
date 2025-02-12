"use client"

const cartKey = 'shopflow';

export function loadCart() {
  const storedCart = localStorage.getItem(cartKey);
  return storedCart ? JSON.parse(storedCart) : [];
}

export function saveCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}
export function getTotalAmount(){
      const cart=loadCart();
      
      return cart.reduce((a,c)=>a+c.offerPrice*c.quantity,0);
}
export function findProductIndex(cart, productId) {
  return cart.findIndex(item => item.id === productId);
}

export function addProduct(product) {
  const cart = loadCart();
  const productIndex = findProductIndex(cart, product.id);
  
  if (productIndex === -1) {
    cart.push({ ...product, quantity: 1 });
  } else {
    cart[productIndex].quantity += 1;
  }
  
  saveCart(cart);
}

    export function removeProduct(productId) {
    let cart = loadCart();

    cart = cart.filter(item => item.id !== productId);

    saveCart(cart);
    }

export function increaseQuantity(productId) {
  const cart = loadCart();
  const productIndex = findProductIndex(cart, productId);
  
  if (productIndex !== -1) {
    cart[productIndex].quantity += 1;
    saveCart(cart);
  }
  console.log(loadCart())
}

export function decreaseQuantity(productId) {
  const cart = loadCart();
  const productIndex = findProductIndex(cart, productId);
  
  if (productIndex !== -1) {
    if (cart[productIndex].quantity > 1) {
      cart[productIndex].quantity -= 1;
    } else {
      removeProduct(productId);
    }
    saveCart(cart);
  }
}

export function getCart() {
  return loadCart();
}

export function clearCart() {
  localStorage.removeItem(cartKey);
}

