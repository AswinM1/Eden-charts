import { source } from "@/lib/source";
import { notFound } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";
import {
  DocsPage,
  DocsBody,
} from "fumadocs-ui/layouts/docs/page";
import AreaChartDemo from "@/app/demo/Area-demo";
import AreaGradientDemo from "@/app/demo/Area-Gradient";
import { CodePreview } from "@/app/demo/CodePreview";

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;

  const page = source.getPage(slug);

  if (!page) {
    notFound();
  }

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc}>
      <DocsBody>
        <MDX components={{defaultMdxComponents,AreaChartDemo,AreaGradientDemo,CodePreview}} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}