"use client";

import { IPrestataireFormData } from "@/interfaces/prestataires";
import { prestataireSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function AddContactForms() {
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
        <form action="" className="">
          <div></div>

          <div className="">
            <div>{/* <p>C'esst la page d'ajout de contact</p> */}</div>
          </div>
        </form>
      </section>
    </section>
  );
}
