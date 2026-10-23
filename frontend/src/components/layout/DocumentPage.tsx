import { marked } from "marked";
import { useMemo } from "react";
import { PageShell } from "./PageShell";
import "./DocumentPage.css";

interface Crumb {
  label: string;
  to?: string;
}

/**
 * Plain-text document page (policies, terms, notices). Renders Markdown
 * from our own repo content, never from user input, since the HTML is
 * inserted unsanitized.
 */
export function DocumentPage({
  crumbs,
  title,
  lastUpdated,
  markdown,
}: {
  crumbs: Crumb[];
  title: string;
  lastUpdated?: string;
  markdown: string;
}) {
  const html = useMemo(() => marked.parse(markdown, { async: false }), [markdown]);

  return (
    <PageShell crumbs={crumbs} title={title}>
      {lastUpdated && <p className="document__updated">Last updated: {lastUpdated}</p>}
      <article className="document glass">
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </PageShell>
  );
}
