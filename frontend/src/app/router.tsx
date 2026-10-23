import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { RequireAuth } from "../auth/RequireAuth";
import { NotFoundPage } from "../components/layout/NotFoundPage";
import { PlaceholderPage } from "../components/layout/PlaceholderPage";
import { SectionPage } from "../components/layout/SectionPage";
import { navSections } from "../config/navigation";
import { HomePage } from "../features/home/HomePage";
import { PolicyDocumentPage } from "../features/info/PolicyDocumentPage";
import { AppLayout } from "./AppLayout";
import { pages } from "./pages";

// One route per internal nav item, generated from config/navigation.ts.
const sectionRoutes: RouteObject[] = navSections.flatMap((section) => [
  { path: section.basePath, element: <SectionPage section={section} /> },
  ...section.items
    .filter((item) => !item.external)
    .map((item) => {
      const Page = pages[item.path];
      const content = Page ? <Page /> : <PlaceholderPage section={section} item={item} />;
      return {
        path: item.path,
        element: item.access === "public" ? content : <RequireAuth access={item.access}>{content}</RequireAuth>,
      };
    }),
]);

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      ...sectionRoutes,
      // Unlisted pages (reached from other pages rather than the nav)
      { path: "/info/policies/:slug", element: <PolicyDocumentPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
