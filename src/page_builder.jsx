import { React } from "./../deps.ts";
import { to_static } from "./renderer/react.jsx";
import PageTemplate from "./page_template.jsx";

export function build_page(RootComponent) {
  const page = <PageTemplate>< RootComponent /> </PageTemplate>;
  return to_static(page);
}
