import { useParams } from "react-router-dom";
import { DocumentPage } from "../../components/layout/DocumentPage";
import { NotFoundPage } from "../../components/layout/NotFoundPage";
import { policies } from "../../config/policies";

/** /info/policies/:slug, one page per published policy. */
export function PolicyDocumentPage() {
  const { slug } = useParams();
  const policy = policies.find((p) => p.slug === slug);

  if (!policy?.content) return <NotFoundPage />;

  return (
    <DocumentPage
      crumbs={[
        { label: "Information", to: "/info" },
        { label: "Policies & Disclosures", to: "/info/policies" },
        { label: policy.title },
      ]}
      title={policy.title}
      lastUpdated={policy.lastUpdated}
      markdown={policy.content}
    />
  );
}
