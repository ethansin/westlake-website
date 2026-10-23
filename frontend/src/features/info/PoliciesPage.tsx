import { LinkList } from "../../components/layout/LinkList";
import { PageShell } from "../../components/layout/PageShell";
import { policies, policyPath } from "../../config/policies";

export function PoliciesPage() {
  return (
    <PageShell
      crumbs={[{ label: "Information", to: "/info" }, { label: "Policies & Disclosures" }]}
      title="Policies & Disclosures"
      lead="Our privacy policies, terms, and other legal notices."
    >
      <LinkList
        label="Policies"
        items={policies.map((p) => ({
          label: p.title,
          description: p.description,
          to: p.content ? policyPath(p.slug) : undefined,
        }))}
      />
    </PageShell>
  );
}
