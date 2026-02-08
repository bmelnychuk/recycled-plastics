import z from 'zod';

export const UserSchema = z.object({
  id: z.uuid(),
  email: z.email().toLowerCase(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
});

export type User = z.infer<typeof UserSchema>;
