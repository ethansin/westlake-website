import { Link } from "react-router-dom";
import { PageShell } from "./PageShell";

export function NotFoundPage() {
  return (
    <PageShell crumbs={[{ label: "Not found" }]} title="Page not found" lead="We couldn't find the page you were looking for.">
      <Link to="/" className="text-link">
        ← Return home
      </Link>
    </PageShell>
  );
}
