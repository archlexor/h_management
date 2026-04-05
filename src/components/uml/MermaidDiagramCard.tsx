import { useEffect, useState } from "react";
import { AlertTriangle, RefreshCw, ZoomIn, ZoomOut, RotateCcw, Expand } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface MermaidDiagramCardProps {
  title: string;
  description: string;
  definition: string;
}

export default function MermaidDiagramCard({ title, description, definition }: MermaidDiagramCardProps) {
  const [svg, setSvg] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const encodedSvg = encodeURIComponent(svg);
  const svgImageUrl = `data:image/svg+xml;charset=utf-8,${encodedSvg}`;

  const zoomIn = () => setZoomLevel((z) => Math.min(z + 0.2, 3));
  const zoomOut = () => setZoomLevel((z) => Math.max(z - 0.2, 0.6));
  const resetZoom = () => setZoomLevel(1);

  useEffect(() => {
    let isActive = true;

    const renderDiagram = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const mermaidModule = await import("mermaid");
        const mermaid = mermaidModule.default;

        mermaid.initialize({
          startOnLoad: false,
          theme: "neutral",
          securityLevel: "loose",
          flowchart: {
            useMaxWidth: false,
            htmlLabels: true,
            nodeSpacing: 36,
            rankSpacing: 54,
            diagramPadding: 18,
          },
          sequence: {
            useMaxWidth: false,
            diagramMarginX: 36,
            diagramMarginY: 18,
            actorMargin: 48,
            messageMargin: 22,
          },
          class: {
            useMaxWidth: false,
          },
          themeVariables: {
            fontSize: "18px",
          },
        });

        const id = `uml-diagram-${Math.random().toString(36).slice(2, 10)}`;
        const { svg: renderedSvg } = await mermaid.render(id, definition);

        if (isActive) {
          setSvg(renderedSvg);
        }
      } catch (e) {
        if (isActive) {
          const message = e instanceof Error ? e.message : "Failed to render Mermaid diagram.";
          setError(message);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    renderDiagram();

    return () => {
      isActive = false;
    };
  }, [definition, refreshKey]);

  return (
    <Card className="border-border/70 bg-card/90 backdrop-blur-sm shadow-soft">
      <CardHeader className="space-y-2">
        <CardTitle className="font-display text-2xl">{title}</CardTitle>
        <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-72 w-full rounded-xl" />
          </div>
        ) : null}

        {!isLoading && error ? (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
              <div className="space-y-3">
                <p className="text-sm font-medium text-destructive">Unable to render this diagram.</p>
                <p className="text-xs text-muted-foreground break-all">{error}</p>
                <Button variant="outline" size="sm" onClick={() => setRefreshKey((k) => k + 1)}>
                  <RefreshCw className="h-4 w-4" />
                  Retry Render
                </Button>
              </div>
            </div>
          </div>
        ) : null}

        {!isLoading && !error ? (
          <div className="overflow-auto rounded-xl border border-border/60 bg-background/70 p-3 sm:p-4">
            <button
              type="button"
              onClick={() => {
                setZoomLevel(1);
                setIsViewerOpen(true);
              }}
              className="w-full text-left cursor-zoom-in"
              aria-label={`Open ${title} in zoom viewer`}
            >
              <div
                className="min-w-0 [&>svg]:mx-auto [&>svg]:h-auto [&>svg]:max-w-none"
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            </button>

            <div className="mt-3 flex justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setZoomLevel(1);
                  setIsViewerOpen(true);
                }}
              >
                <Expand className="h-4 w-4" />
                Open HD View
              </Button>
            </div>
          </div>
        ) : null}
      </CardContent>

      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="max-w-[96vw] h-[94vh] p-0">
          <DialogHeader className="border-b border-border px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <DialogTitle className="font-display text-xl">{title} - HD Viewer</DialogTitle>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" size="sm" onClick={zoomOut}>
                  <ZoomOut className="h-4 w-4" />
                  Zoom Out
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={zoomIn}>
                  <ZoomIn className="h-4 w-4" />
                  Zoom In
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={resetZoom}>
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="h-[calc(94vh-74px)] overflow-auto bg-muted/20 p-4 sm:p-6">
            <img
              src={svgImageUrl}
              alt={`${title} diagram`}
              className="block mx-auto h-auto max-w-none"
              style={{ width: `${zoomLevel * 100}%` }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
