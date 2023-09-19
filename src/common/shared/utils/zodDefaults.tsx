import { z } from "zod";

export function zodDefault<Schema extends z.AnyZodObject>(
  schema: Schema
): z.infer<Schema> {
  return Object.fromEntries(
    Object.entries(schema.shape).map(([key, value]) => {
      if (value instanceof z.ZodDefault)
        return [key, value._def.defaultValue()];
      return [key, undefined];
    })
  );
}
