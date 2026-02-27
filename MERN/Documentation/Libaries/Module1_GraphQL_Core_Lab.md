# Module 1 Lab — Understanding and Using **graphql** (Core Engine)

This lab teaches the **graphql** library (NOT Apollo, not Express).  
Students will understand what GraphQL actually is under the hood and how your Cart example works at the engine level.

---

# 1️⃣ What is `graphql`?

### What
`graphql` is the **core execution engine** that:
- Validates schema
- Parses queries
- Executes resolvers
- Returns structured JSON results

### Why
Even if you use Apollo Server, it internally uses `graphql`.

Understanding this helps students:
- Debug resolver behavior
- Understand execution flow
- Write custom GraphQL servers if needed

### When to use it directly?
- Custom execution flows
- Testing schema without HTTP
- Running queries in unit tests
- Internal schema validation tools

### How does it work?

Query → Schema → Resolver → Execution Engine → JSON Result

---

# 2️⃣ Install graphql

In your project root:

```bash
npm i graphql
```

---

# 3️⃣ Your Existing Project (Current Flow)

You currently have:

- `typeDefs.ts`
- `resolvers.ts`
- `schema.ts`
- `index.ts` (Apollo + Express)

This lab will show how to:
- Execute your Cart schema WITHOUT Apollo
- Use `graphql()` function directly

---

# 4️⃣ Create a Standalone GraphQL Engine File

Create:

```
src/graphql-engine-test.ts
```

Paste this full code:

```ts
import { graphql } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";

/**
 * STEP 1: Your existing Cart types
 */
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

/**
 * STEP 2: In-memory data (same as your project)
 */
const carts = new Map<string, Cart>();

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

/**
 * STEP 3: Schema Definition (SDL)
 */
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

/**
 * STEP 4: Resolvers
 */
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

/**
 * STEP 5: Create executable schema
 */
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

/**
 * STEP 6: Execute GraphQL query WITHOUT Apollo
 */
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
```

---

# 5️⃣ Run This File

```bash
npx ts-node-dev src/graphql-engine-test.ts
```

You will see:

```json
{
  "data": {
    "cart": {
      "id": "c1",
      "price": "10",
      "author": "Hrithik"
    }
  }
}
```

🚀 This proves Apollo is NOT required to execute GraphQL.

---

# 6️⃣ Understanding Execution Step-by-Step

When `graphql()` runs:

1. Parse query string
2. Validate against schema
3. Call `Query.cart`
4. Resolver returns object
5. GraphQL engine filters only requested fields
6. JSON response generated

---

# 7️⃣ Modify Your Existing Project Using graphql Knowledge

Now go back to your real project.

Understanding gained:
- Resolvers are pure functions
- Schema defines contract
- GraphQL filters requested fields automatically

You DO NOT need to manually filter fields like:

```ts
return { id: cart.id, price: cart.price }
```

GraphQL automatically returns only requested fields.

---

# 8️⃣ Student Practice Tasks

### Task 1
Add new query:

```
allCarts: [Cart!]!
```

Return all carts from Map.

### Task 2
Call:

```graphql
query {
  cart(cartId: "c1") {
    id
  }
}
```

Notice:
Only `id` is returned (GraphQL auto-selection).

### Task 3
Request a field not in schema.

GraphQL should throw validation error.

---

# 9️⃣ Interview Checkpoints

Students must explain:

- GraphQL execution happens inside `graphql()` function
- Apollo wraps this engine
- Schema validates structure
- Resolvers return raw objects
- GraphQL filters response based on query selection

---

# 🔟 Summary

You now understand:

✅ graphql is the core engine  
✅ Apollo is a wrapper  
✅ Schema + resolvers define execution  
✅ GraphQL automatically filters fields  
✅ You can execute queries without HTTP  

---

Next module will cover:

👉 `@graphql-tools/schema` (how schema composition works internally)
