"use client";

import ReactDOMServer from "react-dom/server";

export const generateHtmlTemplate = (template: React.ReactNode) => {
  return ReactDOMServer.renderToStaticMarkup(template);
};
