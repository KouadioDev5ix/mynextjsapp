import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { cn } from "@/utils";

// ─── Interface ───────────────────────────────────────────────────────────────

export interface IPrestataire {
  nom: string;
  prenoms: string;
  genre?: "Homme" | "Femme" | "Non précisé";
  dateNaissance?: string;
  nationalite?: string;

  email: string;
  phoneNumber: string;
  phoneSecondaire?: string;

  adresse: {
    pays: string;
    ville: string;
    commune?: string;
    adresseComplete: string;
    codePostal?: string;
  };

  situation: {
    estMarie: boolean;
    nombreEnfants: number;
  };

  infoPro?: {
    metier?: string;
    statut?: "Freelance" | "Auto-entrepreneur" | "SARL" | "Salarié";
    numeroRCCM?: string;
  };
}

// ─── Options ─────────────────────────────────────────────────────────────────

const genreOptions = [
  { id: "Homme", label: "Homme" },
  { id: "Femme", label: "Femme" },
  { id: "Non précisé", label: "Non précisé" },
];

const nationaliteOptions = [
  { id: "Ivoirienne", label: "Ivoirienne" },
  { id: "Française", label: "Française" },
  { id: "Sénégalaise", label: "Sénégalaise" },
  { id: "Burkinabée", label: "Burkinabée" },
  { id: "Malienne", label: "Malienne" },
  { id: "Autre", label: "Autre" },
];

const paysOptions = [
  { id: "Côte d'Ivoire", label: "Côte d'Ivoire" },
  { id: "France", label: "France" },
  { id: "Sénégal", label: "Sénégal" },
  { id: "Burkina Faso", label: "Burkina Faso" },
  { id: "Mali", label: "Mali" },
  { id: "Autre", label: "Autre" },
];

const indicatifOptions = [
  { id: "+225", label: "🇨🇮 +225" },
  { id: "+33", label: "🇫🇷 +33" },
  { id: "+221", label: "🇸🇳 +221" },
  { id: "+226", label: "🇧🇫 +226" },
  { id: "+1", label: "🇺🇸 +1" },
  { id: "+44", label: "🇬🇧 +44" },
];

const statutOptions = [
  { id: "Freelance", label: "Freelance" },
  { id: "Auto-entrepreneur", label: "Auto-entrepreneur" },
  { id: "SARL", label: "SARL" },
  { id: "Salarié", label: "Salarié" },
];

// ─── CustumInputs ─────────────────────────────────────────────────────────────

type CustumInputsProps = {
  inputType?: string;
  label?: string;
  placeHolder?: string;
  htmlFor?: string;
  labelClassName?: string;
  inputClassName?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

function CustumInputs({
  inputType = "text",
  label,
  placeHolder,
  htmlFor,
  labelClassName,
  inputClassName,
  ...rest
}: CustumInputsProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={htmlFor}
          className={cn("font-medium text-stone-700 text-sm", labelClassName)}
        >
          {label}
        </label>
      )}
      <input
        type={inputType}
        placeholder={placeHolder}
        id={htmlFor}
        className={cn(
          "border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-50 outline-none rounded-lg px-3 py-2 text-sm text-stone-800 w-full transition-all",
          inputClassName,
        )}
        {...rest}
      />
    </div>
  );
}

// ─── CustumSelect ─────────────────────────────────────────────────────────────

type CustumSelectProps<T> = {
  htmlFor?: string;
  id?: string;
  label?: string;
  options: T[];
  valueKey: keyof T;
  labelKey: keyof T;
  placeHoder: string;
  getKey?: (item: T) => number | string;
  selectClassName?: string;
  labelClassName?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function CustumSelect<T>({
  labelClassName,
  selectClassName,
  getKey,
  htmlFor,
  id,
  label,
  labelKey,
  options,
  placeHoder,
  valueKey,
  value,
  onChange,
}: CustumSelectProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={htmlFor}
          className={cn("font-medium text-stone-700 text-sm", labelClassName)}
        >
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={cn(
          "border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-50 outline-none rounded-lg px-3 py-2 text-sm text-stone-800 w-full bg-white transition-all",
          selectClassName,
        )}
      >
        <option value="" disabled>
          {placeHoder || "Sélectionner une valeur"}
        </option>
        {options.map((option, index) => (
          <option
            value={String(option[valueKey])}
            key={getKey ? getKey(option) : index}
          >
            {String(option[labelKey])}
          </option>
        ))}
      </select>
    </div>
  );
}

// ─── NumberInput ──────────────────────────────────────────────────────────────

function NumberInput({
  value,
  onChange,
  min = 0,
  max = 20,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-8 h-8 rounded-full border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-stone-600 text-lg font-medium transition-colors"
      >
        −
      </button>
      <span className="text-base font-medium text-stone-800 min-w-[20px] text-center">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-8 h-8 rounded-full border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-stone-600 text-lg font-medium transition-colors"
      >
        +
      </button>
    </div>
  );
}

// ─── Toggle ───────────────────────────────────────────────────────────────────

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors",
        checked ? "bg-blue-500" : "bg-gray-200",
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 rounded-full bg-white transition-transform",
          checked ? "translate-x-5" : "translate-x-1",
        )}
      />
    </button>
  );
}

// ─── SectionTitle ─────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-widest mb-4">
      {children}
    </p>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({ nom, prenoms }: { nom: string; prenoms: string }) {
  const initials =
    ((prenoms?.[0] ?? "") + (nom?.[0] ?? "")).toUpperCase() || "??";
  return (
    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-semibold text-base flex-shrink-0 border border-blue-100">
      {initials}
    </div>
  );
}

// ─── PrestataireForm ──────────────────────────────────────────────────────────

export default function PrestataireForm() {
  const { control, handleSubmit, watch } = useForm<IPrestataire>({
    defaultValues: {
      nom: "",
      prenoms: "",
      situation: { estMarie: false, nombreEnfants: 0 },
      adresse: { pays: "Côte d'Ivoire", ville: "", adresseComplete: "" },
    },
  });

  const [indicatif, setIndicatif] = useState("+225");
  const [indicatifSec, setIndicatifSec] = useState("+225");

  const nom = watch("nom");
  const prenoms = watch("prenoms");
  const email = watch("email");

  

  const onSubmit = (data: IPrestataire) => {
    console.log("Données soumises :", data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <section className="max-w-3xl mx-auto px-5 border bg-white border-gray-200 shadow-sm rounded-xl pb-10">
      <form onSubmit={handleSubmit(onSubmit)} className="p-2 w-full space-y-4">
        {/* ── En-tête profil ── */}
        <div className="flex items-center gap-4 py-5 border-b border-gray-100">
          <Avatar nom={nom} prenoms={prenoms} />
          <div>
            <p className="font-semibold text-stone-800 text-base leading-tight">
              {prenoms || nom
                ? `${prenoms} ${nom}`.trim()
                : "Nouveau prestataire"}
            </p>
            <p className="text-sm text-stone-400 mt-0.5">
              {email || "email@exemple.com"}
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-0.5 mt-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Actif
            </span>
          </div>
        </div>

        {/* ── Identité ── */}
        <div className="border border-gray-100 rounded-xl p-5">
          <SectionTitle>Identité</SectionTitle>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-full">
                <Controller
                  name="nom"
                  control={control}
                  rules={{ required: "Le nom est requis" }}
                  render={({ field }) => (
                    <CustumInputs
                      inputType="text"
                      label="Nom *"
                      placeHolder="ex. KOUASSI"
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
                  rules={{ required: "Le prénom est requis" }}
                  render={({ field }) => (
                    <CustumInputs
                      inputType="text"
                      label="Prénoms *"
                      placeHolder="ex. Ama Christelle"
                      htmlFor="prenoms"
                      {...field}
                    />
                  )}
                />
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-full">
                <Controller
                  name="genre"
                  control={control}
                  render={({ field }) => (
                    <CustumSelect
                      options={genreOptions}
                      label="Genre"
                      labelKey="label"
                      valueKey="id"
                      placeHoder="Sélectionner un genre"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                />
              </div>
              <div className="w-full">
                <Controller
                  name="nationalite"
                  control={control}
                  render={({ field }) => (
                    <CustumSelect
                      options={nationaliteOptions}
                      label="Nationalité"
                      labelKey="label"
                      valueKey="id"
                      placeHoder="Sélectionner une nationalité"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                />
              </div>
            </div>

            <Controller
              name="dateNaissance"
              control={control}
              render={({ field }) => (
                <CustumInputs
                  inputType="date"
                  label="Date de naissance"
                  htmlFor="dateNaissance"
                  {...field}
                />
              )}
            />
          </div>
        </div>

        {/* ── Coordonnées ── */}
        <div className="border border-gray-100 rounded-xl p-5">
          <SectionTitle>Coordonnées</SectionTitle>
          <div className="space-y-4">
            <Controller
              name="email"
              control={control}
              rules={{ required: "L'email est requis" }}
              render={({ field }) => (
                <CustumInputs
                  inputType="email"
                  label="Email *"
                  placeHolder="ex. ama.kouassi@email.com"
                  htmlFor="email"
                  {...field}
                />
              )}
            />

            {/* Téléphone principal */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-stone-700 text-sm">
                Téléphone *
              </label>
              <div className="flex gap-2">
                <select
                  value={indicatif}
                  onChange={(e) => setIndicatif(e.target.value)}
                  className="border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-50 outline-none rounded-lg px-2 py-2 text-sm text-stone-800 bg-white w-28 flex-shrink-0"
                >
                  {indicatifOptions.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="tel"
                      placeholder="07 00 00 00 00"
                      className="border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-50 outline-none rounded-lg px-3 py-2 text-sm text-stone-800 flex-1 transition-all"
                      {...field}
                    />
                  )}
                />
              </div>
            </div>

            {/* Téléphone secondaire */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-stone-700 text-sm">
                Téléphone secondaire{" "}
                <span className="text-stone-400 font-normal">(optionnel)</span>
              </label>
              <div className="flex gap-2">
                <select
                  value={indicatifSec}
                  onChange={(e) => setIndicatifSec(e.target.value)}
                  className="border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-50 outline-none rounded-lg px-2 py-2 text-sm text-stone-800 bg-white w-28 flex-shrink-0"
                >
                  {indicatifOptions.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <Controller
                  name="phoneSecondaire"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="tel"
                      placeholder="Optionnel"
                      className="border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-50 outline-none rounded-lg px-3 py-2 text-sm text-stone-800 flex-1 transition-all"
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Adresse ── */}
        <div className="border border-gray-100 rounded-xl p-5">
          <SectionTitle>Adresse</SectionTitle>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-full">
                <Controller
                  name="adresse.pays"
                  control={control}
                  render={({ field }) => (
                    <CustumSelect
                      options={paysOptions}
                      label="Pays"
                      labelKey="label"
                      valueKey="id"
                      placeHoder="Sélectionner un pays"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                />
              </div>
              <div className="w-full">
                <Controller
                  name="adresse.ville"
                  control={control}
                  rules={{ required: "La ville est requise" }}
                  render={({ field }) => (
                    <CustumInputs
                      label="Ville *"
                      placeHolder="ex. Abidjan"
                      htmlFor="ville"
                      {...field}
                    />
                  )}
                />
              </div>
            </div>

            <Controller
              name="adresse.adresseComplete"
              control={control}
              render={({ field }) => (
                <CustumInputs
                  label="Adresse complète *"
                  placeHolder="ex. Cocody, Rue des Jardins, Imm. Le Palmier"
                  htmlFor="adresseComplete"
                  {...field}
                />
              )}
            />

            <div className="flex items-start gap-4">
              <div className="w-full">
                <Controller
                  name="adresse.commune"
                  control={control}
                  render={({ field }) => (
                    <CustumInputs
                      label="Quartier / Commune"
                      placeHolder="ex. Cocody"
                      htmlFor="commune"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="w-full">
                <Controller
                  name="adresse.codePostal"
                  control={control}
                  render={({ field }) => (
                    <CustumInputs
                      label="Code postal"
                      placeHolder="ex. BP 0000"
                      htmlFor="codePostal"
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Situation familiale ── */}
        <div className="border border-gray-100 rounded-xl p-5">
          <SectionTitle>Situation familiale</SectionTitle>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-stone-700 font-medium">
                Marié(e)
              </span>
              <Controller
                name="situation.estMarie"
                control={control}
                render={({ field }) => (
                  <Toggle
                    checked={field.value}
                    onChange={(v) => field.onChange(v)}
                  />
                )}
              />
            </div>
            <div className="border-t border-gray-100 pt-4">
              <p className="text-sm text-stone-700 font-medium mb-3">
                Nombre denfants à charge
              </p>
              <Controller
                name="situation.nombreEnfants"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    value={field.value}
                    onChange={(v) => field.onChange(v)}
                  />
                )}
              />
            </div>
          </div>
        </div>

        {/* ── Informations professionnelles ── */}
        <div className="border border-gray-100 rounded-xl p-5">
          <SectionTitle>Informations professionnelles</SectionTitle>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-full">
                <Controller
                  name="infoPro.metier"
                  control={control}
                  render={({ field }) => (
                    <CustumInputs
                      label="Métier / Spécialité"
                      placeHolder="ex. Développeur web"
                      htmlFor="metier"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="w-full">
                <Controller
                  name="infoPro.statut"
                  control={control}
                  render={({ field }) => (
                    <CustumSelect
                      options={statutOptions}
                      label="Statut"
                      labelKey="label"
                      valueKey="id"
                      placeHoder="Sélectionner un statut"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                />
              </div>
            </div>
            <Controller
              name="infoPro.numeroRCCM"
              control={control}
              render={({ field }) => (
                <CustumInputs
                  label="Numéro RCCM / SIRET"
                  placeHolder="Identifiant d'entreprise (optionnel)"
                  htmlFor="rccm"
                  {...field}
                />
              )}
            />
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            className="flex-1 py-2.5 rounded-lg border border-gray-200 text-stone-600 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Enregistrer le prestataire
          </button>
        </div>
      </form>
    </section>
  );
}
