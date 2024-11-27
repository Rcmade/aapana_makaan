import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function GoogleMapSkeleton() {
  return (
    <Card className="relative h-[400px] w-full overflow-hidden bg-background">
      {/* Main map area */}
      <Skeleton className="h-full w-full bg-muted" />

      {/* Zoom controls */}
      <div className="absolute right-4 top-4 flex flex-col space-y-2">
        <Skeleton className="h-8 w-8 rounded-sm bg-muted-foreground/20" />
        <Skeleton className="h-8 w-8 rounded-sm bg-muted-foreground/20" />
      </div>

      {/* Street View Pegman */}
      <Skeleton className="absolute right-4 top-20 h-8 w-8 rounded-sm bg-muted-foreground/20" />

      {/* Map type selector */}
      <Skeleton className="absolute left-4 top-4 h-8 w-24 rounded-sm bg-muted-foreground/20" />

      {/* Scale bar */}
      <Skeleton className="absolute bottom-6 left-4 h-2 w-16 bg-muted-foreground/20" />

      {/* Google logo */}
      <Skeleton className="absolute bottom-4 right-4 h-6 w-16 bg-muted-foreground/20" />

      {/* Loading indicator */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-lg bg-background/80 p-4 shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 animate-bounce rounded-full bg-primary" />
            <div
              className="h-4 w-4 animate-bounce rounded-full bg-primary"
              style={{ animationDelay: "0.1s" }}
            />
            <div
              className="h-4 w-4 animate-bounce rounded-full bg-primary"
              style={{ animationDelay: "0.2s" }}
            />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
    </Card>
  );
}
