"use client";

import CustumInputs from "@/components/CustumInputs";
import CustumSelect from "@/components/CustumSelect";
import { IPrestataireFormData } from "@/interfaces/prestataires";
import { prestataireSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

export default function AddContactForms() {
  const genreOptions = [
    { id: "Homme", label: "Homme" },
    { id: "Femme", label: "Femme" },
    { id: "Non précisé", label: "Non précisé" },
  ];
  const {
    register,
    control,
    formState: { errors },
  } = useForm<IPrestataireFormData>({
    resolver: zodResolver(prestataireSchema),
  });

  return (
    <section className="pt-28">
      <div className="flex-col flex items-center justify-center pb-5">
        <h1 className="text-2xl font-extrabold text-stone-800 ">
          Ajouter un prestataire
        </h1>
      </div>

      <section className="max-w-3xl mx-auto px-5 border bg-white border-gray-200 shadow-xs rounded-xl h-[800px] pb-10">
        <form action="" className="p-2 w-full">
          {/* Identite */}
          <div className="flex items-center gap-4">
            <div className="w-full">
              <Controller
                name="nom"
                control={control}
                render={({ field }) => (
                  <CustumInputs
                    inputType="text"
                    label="Nom"
                    placeHolder="Exemple: Kouadio"
                    id="nom"
                    labelClassName="text-stone-700 font-medium text-sm"
                    htmlFor="nom"
                    {...field}
                  />
                )}
              />
            </div>

            <div className="w-full">
              <Controller
                name="prenoms"
                control={control}
                render={({ field }) => (
                  <CustumInputs
                    inputType="text"
                    label="Prenoms"
                    placeHolder="Exemple: Kouadio Alfred"
                    id="prenoms"
                    labelClassName="text-stone-700 font-medium text-sm"
                    htmlFor="prenoms"
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          <Controller
            name="genre"
            control={control}
            render={({ field }) => (
              <CustumSelect
                options={genreOptions}
                label="Genre"
                labelKey="label"
                valueKey="id"
                // hidden={}
                placeHoder="Veuillez selectionner votre genre"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <div className="">
            <div>{/* <p>C'esst la page d'ajout de contact</p> */}</div>
          </div>
        </form>
      </section>
    </section>
  );
}
