import { convexTest } from "convex-test";
import { expect, test } from "vitest";
import { api } from "./_generated/api";
import schema from "./schema";

test("Creating tasks", async () => {
  const t = convexTest(schema);
  const id = await t.mutation(api.tasks.create, { title: "Buy groceries", isCompleted: false } );
  await t.mutation(api.tasks.update, { id, title: "Buy groceries", isCompleted: true } );
  await t.mutation(api.tasks.deleteTask, { id } );
  const tasks = await t.query(api.tasks.get);
  console.log(tasks);
  // expect(tasks).toMatchObject([
  //   { title: "Buy groceries", isCompleted: false }
  // ]);
});