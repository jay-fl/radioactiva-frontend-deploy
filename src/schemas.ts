import { z } from "zod";

export const SongSchema = z.object({
    id: z.number(),
    artist: z.string(),
    track: z.string(),
    video: z.string(),
    image: z.string(),
})

export const SongFormSchema = z.object({
  artist: z.string().min(1, { message: "El nombre del artista es obligatorio" }),
  track: z.string().min(1, { message: "El nombre de la canción es obligatorio" }),
  video: z.string().min(1, {message: 'El video de la canción es obligatorio'}),
  image: z.string({message: 'La imagen es obligatoria'})
})

export const SongsResponseSchema = z.object({
    songs: z.array(SongSchema),
    total: z.number()
  })

  export type Song = z.infer<typeof SongSchema>

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['admin', 'user']) 
})

export const userResponseSchema = z.array(userSchema)

export const ProgramSchema = z.object({
    id: z.number(),
    name: z.string().min(1, { message: "El nombre del programa es obligatorio" }),
    startTime: z.string({ message: "La hora de inicio es obligatoria" }),
    endTime: z.string({ message: "La hora de fin es obligatoria" }),
    announcer: z.string({ message: "El nombre del locutor es obligatorio" }),
    alternativeST: z.string().nullable(),
    alternativeET: z.string().nullable(),
    image: z.string({ message: "La imagen es obligatoria" }),
    user: userSchema,
})


export const programsResponseSchema = z.array(ProgramSchema)
export type Program = z.infer<typeof ProgramSchema>

export const ProgramFormSchema = z.object({
    name: z.string().min(1, { message: "El nombre del programa es obligatorio" }),
    startTime: z.string().min(1, { message: "La hora de inicio es obligatoria" }),
    endTime: z.string().min(1, { message: "La hora de fin es obligatoria" }),
    announcer: z.string().min(1, { message: "El nombre del locutor es obligatorio" }),
    alternativeST: z.string().nullable(),
    alternativeET: z.string().nullable(),
    image: z.string({ message: "La imagen es obligatoria" }),
    userId: z.coerce.number({message: 'El usuario es obligatorio'}),
})
export const LoginSchema = z.object({
    email: z.string()
            .min(1, {message: "El email es obligatorio"})
            .email({message: "El email debe ser válido"}),
    password: z.string()
                .min(8, "El password no puede ir vacio ")
})

export const LoginSuccessSchema = z.object({
  token: z.string(),
  email: z.string().email()
})
export const ErrorResponseSchema = z.object({
  message: z.string(),
  error: z.string(),
  statusCode: z.number()
})

export const nestHttpErrorSchema = z.object({
  statusCode: z.number(),
  message: z.array(z.string()),
  error: z.string()
})

export const SuccessSchema = z.object({
  message: z.string()
})

export const ProfileSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
})
export type User = z.infer<typeof ProfileSchema>

export const NewsFormSchema = z.object({
  headline: z.string().min(1, { message: "El título es obligatorio" }),
  story: z.string().min(1, { message: "La historia es obligatoria" }),
  programId: z.coerce.number({message: 'El programa no es valido'}),
  image: z.string({message: 'La imagen es obligatoria'})
})

export const NewsSchema = z.object({
  id: z.number(),
  headline: z.string(),
  story: z.string(),
  image: z.string(),
  date: z.string(),
  userEmail: z.string().email(),
  program: ProgramSchema,
})
export type News = z.infer<typeof NewsSchema>

export const NewsResponseSchema = z.object({
   news: z.array(NewsSchema),
   total: z.number()
})