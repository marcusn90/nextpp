import React from "nextpp/deps/react.ts";
import { to_static } from "nextpp/renderer/react.jsx";
import PageTemplate from "nextpp/page_template.jsx";
import { ServerStyleSheet } from "nextpp/deps/styled_components.ts";

export function build_page(RootComponent) {
  const sheet = new ServerStyleSheet();
  const page = <PageTemplate><RootComponent /></PageTemplate>;
  const html = to_static(sheet.collectStyles(page));
  const style = sheet.getStyleTags();
  sheet.seal();
  return html.replace("</head>", `${style}</head>`);
}
