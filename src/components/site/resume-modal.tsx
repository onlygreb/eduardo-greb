import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { ChevronDown, Download, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RESUME } from "@/data/resume";
import { ResumePdfViewer } from "@/components/site/resume-pdf-viewer";
import { cn } from "@/lib/utils";

type ResumeModalContextValue = {
  openResume: () => void;
};

const ResumeModalContext = createContext<ResumeModalContextValue | null>(null);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo<ResumeModalContextValue>(
    () => ({ openResume: () => setOpen(true) }),
    [],
  );

  return (
    <ResumeModalContext.Provider value={value}>
      {children}
      <ResumeDialog open={open} onOpenChange={setOpen} />
    </ResumeModalContext.Provider>
  );
}

export function useResumeModal() {
  const ctx = useContext(ResumeModalContext);
  if (!ctx) {
    throw new Error("useResumeModal must be used within ResumeProvider");
  }
  return ctx;
}

export function ResumeButton({
  className,
  children = "Résumé",
}: {
  className?: string;
  children?: ReactNode;
}) {
  const { openResume } = useResumeModal();

  return (
    <button type="button" onClick={openResume} className={className}>
      {children}
    </button>
  );
}

function ResumeDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        overlayClassName="bg-background/80 backdrop-blur-sm"
        className={cn(
          "flex h-[min(92vh,940px)] w-[min(56rem,calc(100vw-1.5rem))] max-w-none translate-x-[-50%] translate-y-[-50%] flex-col gap-0 overflow-hidden border-border bg-background p-0 shadow-[var(--shadow-lift)] sm:rounded-lg",
        )}
      >
        <DialogHeader className="flex flex-row items-center justify-between gap-4 space-y-0 border-b border-border px-5 py-4 pr-12 sm:px-6">
          <div className="min-w-0 text-left">
            <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-subtle uppercase">
              Curriculum vitae
            </p>
            <DialogTitle className="mt-1 text-base font-medium tracking-tight text-foreground sm:text-lg">
              Eduardo Greb — Résumé
            </DialogTitle>
            <DialogDescription className="mt-1 text-sm text-muted-foreground">
              Preview below, or download as PDF or Word.
            </DialogDescription>
          </div>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="mr-6 inline-flex shrink-0 items-center gap-2 border border-border-strong px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Download className="size-3.5" />
                Download
                <ChevronDown className="size-3.5 text-subtle" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="z-[90] min-w-48 border-border bg-popover">
              <DropdownMenuItem asChild className="cursor-pointer">
                <a href={RESUME.pdfUrl} download={RESUME.pdfFileName}>
                  <FileText className="size-4 text-subtle" />
                  PDF
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <a href={RESUME.docxUrl} download={RESUME.docxFileName}>
                  <FileText className="size-4 text-subtle" />
                  Word (.docx)
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </DialogHeader>

        <div className="relative min-h-0 flex-1 bg-surface">
          {open ? <ResumePdfViewer src={RESUME.pdfUrl} /> : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
