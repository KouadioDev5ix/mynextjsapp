"use client";

import { BaggageClaim, User, Home, UserRoundPlus } from "lucide-react";

import Link from "next/link";
import Icon from "./Icon";

export const NavBar = () => {
  return (
    <div className="w-full mainBg fixed top-0 drop-shadow-sm z-50">
      <div className="w-10/12 max-w-7xl mx-auto bg-mainBg px-4 h-20 text-white flex items-center justify-between">
        <div>
          <Link href={"/"} className="text-2xl font-bold">
            Prestataire
          </Link>
        </div>
        <ul>
          <Link href={"/ajouter-contact"}>
            <li className="font-bold flex  items-center gap-1.5">
              <Icon icon={UserRoundPlus} size={18} />
              Ajouter 
            </li>
          </Link>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};
