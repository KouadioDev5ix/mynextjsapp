import { cn } from "@/utils";

export default function Wrapper({
  children,
  additionnalClassName,
}: {
  children: React.ReactNode;
  additionnalClassName?: string;
}) {
  return (
    <div className={cn("w-10/12 max-w-7xl mx-auto px-4", additionnalClassName)}>
      {children}
    </div>
  );
}
