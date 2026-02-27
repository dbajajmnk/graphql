import { graphql } from "graphql/graphql";
import { schema } from "./schemas/Query/activatedOffersPage/activationOffersPage.resolver";

async function run() {
  const result = await graphql({
    schema,
    source: `
      query {
        cart(cartId: "c1") {
          id
          price
          author
        }
      }
    `,
  });

  console.log(JSON.stringify(result, null, 2));
}

run();