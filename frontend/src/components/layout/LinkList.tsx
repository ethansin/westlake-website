import { Link } from "react-router-dom";
import "./LinkList.css";

export interface LinkListItem {
  label: string;
  description?: string;
  /** In-app path. Omit to list the item as "Coming soon" without a link. */
  to?: string;
}

/** A glass panel of full-width link rows, for lists of documents to scan. */
export function LinkList({ items, label }: { items: LinkListItem[]; label?: string }) {
  return (
    <ul className="link-list glass" aria-label={label}>
      {items.map((item) => {
        const body = (
          <>
            <span className="link-list__text">
              <span className="link-list__label">{item.label}</span>
              {item.description && <span className="link-list__desc">{item.description}</span>}
            </span>
            {item.to ? (
              <svg className="link-list__chevron" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <span className="badge">Coming soon</span>
            )}
          </>
        );

        return (
          <li key={item.label}>
            {item.to ? (
              <Link to={item.to} className="link-list__row">
                {body}
              </Link>
            ) : (
              <div className="link-list__row is-disabled">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
