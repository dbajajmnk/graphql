type CartItem = { productId: string; quantity: number };

 type Cart = {
  id: string;
  items: CartItem[];
  price: string;
  Quantity: number;
  publicationDate: string;
  author: string;
  edition: string;
  publisher: string;
};


const typeDefs = `
  type CartItem {
    productId: ID!
    quantity: Int!
  }

  type Cart {
    id: ID!
    items: [CartItem!]!
    price: String!
    Quantity: Int!
    publicationDate: String
    author: String
    edition: String
    publisher: String
  }

  type Query {
    cart(cartId: ID!): Cart!
  }
`;

export {CartItem,Cart,typeDefs}