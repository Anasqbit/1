import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-canvas">
      <div className="max-w-md w-full p-8 bg-panel border border-panel-border rounded-[var(--panel-radius)] shadow-[var(--app-shadow)] text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-danger/10 rounded-full text-danger">
            <AlertCircle className="w-12 h-12" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-ink mb-2">404 Page Not Found</h1>
        <p className="text-ink-muted mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="inline-flex px-6 py-3 bg-brand text-brand-foreground font-medium rounded-lg hover:opacity-90 transition-opacity">
          Return Home
        </Link>
      </div>
    </div>
  );
}
