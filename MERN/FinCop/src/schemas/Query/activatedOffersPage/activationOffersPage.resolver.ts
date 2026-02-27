import { makeExecutableSchema } from "@graphql-tools/schema/makeExecutableSchema";
import { carts } from "../../../Data/Data";
import { typeDefs } from "../../../types/activatedOffersPage/activatedOffersPage";

const resolvers = {
  Query: {
    cart: (_: unknown, args: { cartId: string }) => {
      return carts.get(args.cartId) ?? {
        id: args.cartId,
        items: [],
        price: "0",
        Quantity: 0,
        publicationDate: "",
        author: "",
        edition: "",
        publisher: "",
      };
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export {resolvers,schema}