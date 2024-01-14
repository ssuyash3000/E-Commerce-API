export default class CartModel {
  constructor(userId) {}
  static add(productId, userId, quantity) {
    if (cart[userId]) {
      let index = cart[userId].findIndex((item) => item.productId == productId);
      if (index >= 0) {
        let newQuantity = cart[userId][index].quantity + quantity;
        cart[userId][index] = { productId, quantity: newQuantity };
      } else {
        cart[userId].push({ productId, quantity });
      }
    } else {
      cart[userId] = [{ productId, quantity }];
    }
  }
  static delete(userId, productId) {
    if (!cart[userId]) return "product not found in the cart";
    let oldLength = cart[userId].length;
    cart[userId] = cart[userId].filter((prod) => {
      return prod.productId !== productId;
    });
    if (oldLength === cart[userId].length)
      return "product not found in the cart";
  }
  static get(userId) {
    return cart[userId];
  }
}
let cart = {};
