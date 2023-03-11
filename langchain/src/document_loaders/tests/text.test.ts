import { test, expect } from "@jest/globals";
import { TextLoader } from "../text.js";

test("Test Text loader from file", async () => {
  const loader = new TextLoader(
    "../examples/src/document_loaders/example_data/example.txt"
  );
  const docs = await loader.load();

  expect(docs.length).toBe(1);
  expect(docs[0].pageContent).toMatchInlineSnapshot(`
    "Foo
    Bar
    Baz

    "
  `);
  expect(docs[0].metadata).toMatchInlineSnapshot(`
    {
      "source": "../examples/src/document_loaders/example_data/example.txt",
    }
  `);
});

test("Test Text loader from blob", async () => {
  const loader = new TextLoader(
    new Blob(["Hello, world!"], { type: "text/plain" })
  );
  const docs = await loader.load();

  expect(docs.length).toBe(1);
  expect(docs[0].pageContent).toBe("Hello, world!");
  expect(docs[0].metadata).toMatchInlineSnapshot(`
    {
      "blobType": "text/plain",
      "source": "blob",
    }
  `);
});
