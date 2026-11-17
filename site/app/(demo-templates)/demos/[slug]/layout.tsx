import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DemoBar from "@/demos/components/DemoBar";
import DemoLinkFallback from "@/demos/components/providers/DemoLinkFallback";
import { fontVariables } from "@/demos/lib/fonts";
import { getTemplate, templates } from "@/demos/templates/registry";
import "@/demos/styles/templates.css";

export function generateStaticParams() {
  return templates.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: LayoutProps<"/demos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplate(slug);
  return {
    title: template ? `${template.name} · demo website` : "Demo not found",
    // Demo sites are reached from the portfolio; search engines should index the project pages instead.
    robots: { index: false, follow: false },
  };
}

/**
 * Root layout of every template page.
 * `data-template` on <html> switches on that template's theme (templates/<slug>/theme.css).
 */
export default async function TemplateLayout({ children, params }: LayoutProps<"/demos/[slug]">) {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) notFound();

  return (
    <html lang="en" data-template={template.slug} className={fontVariables}>
      <head>
        {template.fontStylesheets?.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
      </head>
      <body>
        {children}
        <DemoLinkFallback />
        <DemoBar slug={template.slug} />
      </body>
    </html>
  );
}
