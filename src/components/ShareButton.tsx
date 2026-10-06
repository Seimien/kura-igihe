import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function ShareButton({ title, path, className, label = true }: { title: string; path: string; className?: string; label?: boolean }) {
  const share = async () => {
    const url = window.location.origin + path;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
    } catch {
      return;
    }
    await navigator.clipboard?.writeText(url);
    toast.success("Link copied");
  };
  return (
    <button
      type="button"
      onClick={share}
      aria-label={`Share ${title}`}
      className={cn("inline-flex items-center gap-1.5 rounded-sm border border-input px-3 py-1.5 text-sm font-semibold text-foreground transition-colors hover:border-foreground", className)}
    >
      <Share2 className="h-4 w-4" />
      {label && "Share"}
    </button>
  );
}
