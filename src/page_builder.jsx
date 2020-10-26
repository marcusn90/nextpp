import { React } from "nextpp/deps.ts";
import { to_static } from "nextpp/renderer/react.jsx";
import PageTemplate from "nextpp/page_template.jsx";

export function build_page(RootComponent) {
  const page = <PageTemplate><RootComponent /></PageTemplate>;
  return to_static(page);
}
