import { useEffect, useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import "./resume-pdf-viewer.css";

type Status = "loading" | "ready" | "error";

export function ResumePdfViewer({ src }: { src: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [pageCount, setPageCount] = useState(0);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let destroyTask: (() => void) | undefined;
    const cancelLayers: Array<() => void> = [];

    const scrollToPage = (pageNumber: number) => {
      host.querySelector(`[data-page-number="${pageNumber}"]`)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    const render = async () => {
      setStatus("loading");
      host.replaceChildren();

      try {
        const pdfjs = await import("pdfjs-dist");
        const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
        pdfjs.GlobalWorkerOptions.workerSrc = worker.default;

        const loadingTask = pdfjs.getDocument({ url: src });
        destroyTask = () => {
          void loadingTask.destroy();
        };

        const pdf = await loadingTask.promise;
        if (cancelled) return;
        setPageCount(pdf.numPages);

        const linkService = createLinkService({
          goToDestination: async (dest) => {
            const explicit = typeof dest === "string" ? await pdf.getDestination(dest) : dest;
            if (!Array.isArray(explicit) || explicit[0] == null) return;
            const pageIndex = await pdf.getPageIndex(explicit[0] as never);
            scrollToPage(pageIndex + 1);
          },
        });

        const available = Math.max(host.clientWidth, 280);

        for (let n = 1; n <= pdf.numPages; n += 1) {
          const page = await pdf.getPage(n);
          if (cancelled) return;

          const base = page.getViewport({ scale: 1 });
          const fit = available / base.width;
          const viewport = page.getViewport({ scale: fit * zoom });
          const outputScale = Math.min(window.devicePixelRatio || 1, 2);
          const cssViewport = viewport.clone({ dontFlip: true });

          const pageWrap = document.createElement("div");
          pageWrap.className = "resume-pdf-page";
          pageWrap.dataset.pageNumber = String(n);
          pageWrap.style.setProperty("--scale-factor", String(viewport.scale));
          pageWrap.style.setProperty("--total-scale-factor", String(viewport.scale));
          pageWrap.style.aspectRatio = `${viewport.width} / ${viewport.height}`;

          const canvas = document.createElement("canvas");
          canvas.width = Math.floor(viewport.width * outputScale);
          canvas.height = Math.floor(viewport.height * outputScale);

          const textLayerDiv = document.createElement("div");
          textLayerDiv.className = "textLayer";

          const annotationLayerDiv = document.createElement("div");
          annotationLayerDiv.className = "annotationLayer";

          pageWrap.append(canvas, textLayerDiv, annotationLayerDiv);
          host.appendChild(pageWrap);

          await page.render({
            canvas,
            viewport,
            transform: outputScale === 1 ? undefined : [outputScale, 0, 0, outputScale, 0, 0],
          }).promise;
          if (cancelled) return;

          const textLayer = new pdfjs.TextLayer({
            textContentSource: page.streamTextContent({
              includeMarkedContent: true,
              disableNormalization: true,
            }),
            container: textLayerDiv,
            viewport,
          });
          cancelLayers.push(() => textLayer.cancel());
          await textLayer.render();
          if (cancelled) return;

          const annotations = await page.getAnnotations({ intent: "display" });
          const annotationLayer = new pdfjs.AnnotationLayer({
            div: annotationLayerDiv,
            page,
            viewport: cssViewport,
            annotationCanvasMap: undefined,
            annotationEditorUIManager: null,
            accessibilityManager: null,
            structTreeLayer: null,
            commentManager: null,
            linkService,
            annotationStorage: pdf.annotationStorage,
          });
          await annotationLayer.render({
            annotations,
            viewport: cssViewport,
            div: annotationLayerDiv,
            page,
            linkService,
            renderForms: false,
          });
        }

        if (!cancelled) setStatus("ready");
      } catch (error) {
        console.error(error);
        if (!cancelled) setStatus("error");
      }
    };

    void render();

    return () => {
      cancelled = true;
      destroyTask?.();
      cancelLayers.forEach((cancel) => cancel());
      host.replaceChildren();
    };
  }, [src, zoom]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2">
        <p className="font-mono text-xs text-subtle">
          {pageCount ? `${pageCount} page${pageCount === 1 ? "" : "s"}` : "Loading preview"}
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.7, Number((z - 0.1).toFixed(1))))}
            className="inline-flex size-7 items-center justify-center text-subtle transition-colors hover:text-foreground"
            aria-label="Zoom out"
          >
            <Minus className="size-3.5" />
          </button>
          <span className="min-w-10 text-center font-mono text-xs text-muted-foreground">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(1.8, Number((z + 0.1).toFixed(1))))}
            className="inline-flex size-7 items-center justify-center text-subtle transition-colors hover:text-foreground"
            aria-label="Zoom in"
          >
            <Plus className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-4">
        {status === "loading" ? (
          <p className="pointer-events-none absolute inset-x-0 top-10 text-center font-mono text-xs text-subtle">
            Loading preview…
          </p>
        ) : null}
        {status === "error" ? (
          <p className="px-6 py-16 text-center text-sm text-muted-foreground">
            The preview couldn’t be loaded. Download the PDF or Word file instead.
          </p>
        ) : null}
        <div
          ref={hostRef}
          className={cn("flex flex-col gap-4", status !== "ready" && "opacity-0")}
        />
      </div>
    </div>
  );
}

function createLinkService({
  goToDestination,
}: {
  goToDestination: (dest: unknown) => Promise<void>;
}) {
  return {
    externalLinkEnabled: true,
    externalLinkTarget: 2,
    externalLinkRel: "noopener noreferrer nofollow",
    addLinkAttributes(link: HTMLAnchorElement, url: string, newWindow = true) {
      link.href = url;
      link.target = newWindow ? "_blank" : "";
      link.rel = "noopener noreferrer nofollow";
    },
    getDestinationHash() {
      return "#";
    },
    getAnchorUrl(anchor: string) {
      return anchor;
    },
    setHash() {},
    goToDestination,
    goToPage() {},
    goToXY() {},
    executeNamedAction() {},
    executeSetOCGState() {
      return Promise.resolve();
    },
    get pagesCount() {
      return 0;
    },
    get page() {
      return 1;
    },
    set page(_value: number) {},
    get rotation() {
      return 0;
    },
    set rotation(_value: number) {},
    get isInPresentationMode() {
      return false;
    },
    setDocument() {},
    setViewer() {},
    setHistory() {},
  };
}
