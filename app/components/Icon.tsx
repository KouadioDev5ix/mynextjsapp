import { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  size?: number;
};

export default function Icon({ icon: IconComponent, size = 24 }: Props) {
  return <IconComponent size={size} />;
}