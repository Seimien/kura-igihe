import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { useT } from "@/lib/i18n";

export function DetailShell({ back, backLabel, children }: { back: "/inspired" | "/opportunities" | "/events"; backLabel: string; children: ReactNode }) {
  const t = useT();
  return (
    <div className="pt-16">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <Link to={back} className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> {t(backLabel)}
        </Link>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

export function NotFoundItem({ back }: { back: "/inspired" | "/opportunities" | "/events" }) {
  return (
    <DetailShell back={back} backLabel="Back">
      <NotAvailable />
    </DetailShell>
  );
}

function NotAvailable() {
  const t = useT();
  return <h1 className="text-2xl font-bold">{t("This item is no longer available.")}</h1>;
}
