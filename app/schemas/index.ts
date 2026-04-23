import { z } from "zod";

export const prestataireSchema = z.object({
  //***Identité */
  nom: z.string().min(2, "Le nom est requis"),
  prenoms: z.string().min(2, "Les prénoms sont requis"),
  genre: z.enum(["Homme", "Femme", "Non précisé"]),
  dateNaissance: z.string().optional(),
  nationalite: z.string().optional(),

  //***Coordonnées */
  email: z.string().email("Email invalide"),
  phoneNumber: z
    .string()
    .min(8, "Numéro invalide")
    .regex(/^\+?[0-9\s]+$/, "Numéro invalide"),
  phoneSecondaire: z.string().optional(),

  ///**Adresse */
  adresse: z.object({
    pays: z.string().min(2, "Pays requis"),
    ville: z.string().min(2, "Ville requise"),
    commune: z.string().optional(),
    adresseComplete: z.string().min(5, "Adresse requise"),
    codePostal: z.string().optional(),
  }),

  //**Situation familiale */
  situation: z.object({
    estMarie: z.boolean(),
    nombreEnfants: z
      .number({ "error": "Doit être un nombre" })
      .min(0, "Minimum 0"),
  }),

  //**Infos pro */
  infoPro: z
    .object({
      metier: z.string().optional(),
      statut: z
        .enum(["Freelance", "Auto-entrepreneur", "SARL", "Salarié"])
        .optional(),
      numeroRCCM: z.string().optional(),
    })
    .optional(),
});
