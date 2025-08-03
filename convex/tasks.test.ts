import { convexTest } from "convex-test";
import { expect, test } from "vitest";
import { api } from "./_generated/api";
import schema from "./schema";

test("Creating tasks", async () => {
  const t = convexTest(schema);

  // Create a task
  const id = await t.mutation(api.tasks.create, {
    title: "Buy groceries",
    isCompleted: false,
  });

  // Update the task
  await t.mutation(api.tasks.update, {
    id,
    title: "Buy groceries",
    isCompleted: true,
  });

  // Get tasks (should contain the updated task)
  let tasks = await t.query(api.tasks.get, {});
  expect(tasks).toMatchObject([
    { title: "Buy groceries", isCompleted: true },
  ]);

  // Delete the task
  await t.mutation(api.tasks.deleteTask, { id });

  // Check tasks again (should be empty now)
  tasks = await t.query(api.tasks.get, {});
  expect(tasks).toEqual([]);
});
