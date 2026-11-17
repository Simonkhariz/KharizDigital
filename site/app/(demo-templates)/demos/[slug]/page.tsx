import { notFound } from "next/navigation";
import { templateComponents } from "@/demos/templates/components";

export default async function TemplatePage({ params }: PageProps<"/demos/[slug]">) {
  const { slug } = await params;
  const Template = templateComponents[slug];
  if (!Template) notFound();

  return <Template />;
}
