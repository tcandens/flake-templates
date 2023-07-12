import z from 'zod'

const schema = z.object({
  PORT: z.coerce.number().default(8080),
  HOST: z.coerce.string().default('0.0.0.0'),
  MONGO_URL: z.coerce.string().default('mongodb://localhost:27017/grindcorps'),
  SESSION_SECRET: z.coerce.string().default('secret_is_something_super_secret'),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PUBLIC_SOCKET_PATH: z.coerce.string(),
})

export type Env = z.infer<typeof schema>

export const env = schema.parse(process.env)




