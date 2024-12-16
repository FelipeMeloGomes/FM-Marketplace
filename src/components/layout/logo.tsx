import { Store } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href={"/"}
      className="flex items-center justify-center gap-2 text-xl font-extrabold text-sky-500"
      aria-label="Ir para a página inicial do FM Marketplace"
    >
      <Store className="h-10 w-10 text-sky-600" aria-hidden="true" />
      <span className="hidden sm:inline-block">FM MKT</span>
    </Link>
  );
}
