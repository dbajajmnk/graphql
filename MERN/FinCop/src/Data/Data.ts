import { Cart } from "../types/activatedOffersPage/activatedOffersPage";

export const carts = new Map<string, Cart>();

carts.set("c1", {
  id: "c1",
  items: [{ productId: "p1", quantity: 2 }],
  price: "10",
  Quantity: 1,
  publicationDate: "02/18/2026",
  author: "Hrithik",
  edition: "E11",
  publisher: "Null 1",
});