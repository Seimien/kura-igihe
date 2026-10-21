import { BadgeCheck, CircleCheck, Clock, CircleX, CircleHelp } from "lucide-react";
import { hasVerification, needsCheck, opportunityStatus, type Opportunity } from "@/lib/data";
import { useT, fmtDateL } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export function OpportunityStatus({ opportunity }: { opportunity: Opportunity }) {
  const t = useT();
  const status = opportunityStatus(opportunity.deadline);
  const Icon = status === "Closed" ? CircleX : status === "Closing soon" ? Clock : status === "Open" ? CircleCheck : CircleHelp;
  return <span suppressHydrationWarning className={cn("inline-flex items-center gap-1.5 px-2 py-1 text-xs font-semibold", status === "Closing soon" ? "bg-highlight text-highlight-foreground" : "bg-muted text-muted-foreground")}><Icon className="h-3.5 w-3.5" />{t(status)}</span>;
}

export function OpportunitySummary({ opportunity: o }: { opportunity: Opportunity }) {
  const t = useT();
  const { lang } = useApp();
  return <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
    <p>{t("Eligibility")}: {t(o.eligibility)}</p>
    <p suppressHydrationWarning>{t("Deadline")}: {o.deadline ? fmtDateL(o.deadline, lang) : t("No deadline stated")}</p>
    <p>{t("Source")}: {o.organisation}{hasVerification(o) && <BadgeCheck aria-label={t("Verified")} className="ml-1 inline h-3.5 w-3.5 text-primary" />}</p>
    <p suppressHydrationWarning>{t("Last checked")}: {o.lastChecked ? fmtDateL(o.lastChecked, lang) : t("Not yet checked")}{o.lastChecked && needsCheck(o.lastChecked) ? ` · ${t("Needs check")}` : ""}</p>
    <p>{t("Available in English and Kinyarwanda")}</p>
  </div>;
}