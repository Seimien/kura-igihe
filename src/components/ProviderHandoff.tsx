import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { opportunityStatus, providerUrl, type Opportunity } from "@/lib/data";
import { useT } from "@/lib/i18n";

export function ProviderHandoff({ opportunity: o }: { opportunity: Opportunity }) {
  const [open, setOpen] = useState(false);
  const t = useT();
  const url = providerUrl(o.applicationUrl);
  const closed = opportunityStatus(o.deadline) === "Closed";
  return <>
    <Button disabled={closed} onClick={() => setOpen(true)}><ExternalLink />{t("Go to provider")}</Button>
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="bottom" className="mx-auto max-h-[85svh] max-w-xl overflow-y-auto">
        <SheetHeader><SheetTitle>{t("You are leaving KURA")}</SheetTitle><SheetDescription>{t("Provider")}: {o.organisation}</SheetDescription></SheetHeader>
        <p className="mt-5 text-sm text-muted-foreground">{t("KURA does not receive your application. Confirm the deadline and eligibility on the provider’s website.")}</p>
        <h3 className="mt-5 font-semibold">{t("What to prepare")}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{t("Check the provider’s requirements before preparing your documents. Never pay an unverified application fee.")}</p>
        {!url && <p role="status" className="mt-4 border-l-2 border-primary pl-3 text-sm">{t("The application link has not been supplied. This sample listing cannot accept applications.")}</p>}
        <div className="mt-6 flex flex-wrap gap-3">
          {url ? <Button asChild><a href={url} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} aria-label={`${t("Continue to provider")} · ${o.organisation} · ${t("Opens in a new tab")}`}><ExternalLink />{t("Continue to provider")}</a></Button> : <Button disabled>{t("Continue to provider")}</Button>}
          <Button variant="outline" onClick={() => setOpen(false)}>{t("Stay on KURA")}</Button>
        </div>
      </SheetContent>
    </Sheet>
  </>;
}