import { prestataireSchema } from "@/schemas";
import z from "zod";

export type IPrestataireFormData = z.infer<typeof prestataireSchema>;
