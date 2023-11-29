import { getStylesForPageData, RenderChaiPage } from "@chaibuilder/sdk/render";
import { get, join } from "lodash";
import { StylesAndFonts } from "./StylesAndFonts";
import { notFound } from "next/navigation";
import { chaiBuilder } from "@/app/chaiBuilder";
import "@/chai-blocks";
import "@/app/globals.css";

interface ChaiParams {
  params: { slug: string[] };
}

const pageSlug = (params: ChaiParams["params"]) => join(params?.slug, "/");

export const generateViewport = async ({ params }: ChaiParams) => {
  const { data: pageData } = await chaiBuilder.getPageData(pageSlug(params));
  return {
    themeColor: get(
      pageData,
      "project.brandingOptions.primaryColor",
      "#000000"
    ) as string,
  };
};

export async function generateMetadata({ params }: ChaiParams) {
  const { data: pageData } = await chaiBuilder.getPageData(pageSlug(params));
  return {
    title: get(pageData, "page.seoData.title", ""),
    description: get(pageData, "page.seoData.description", ""),
    openGraph: {
      title: get(pageData, "page.seoData.title", ""),
      description: get(pageData, "page.seoData.description", ""),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: get(pageData, "page.seoData.title", ""),
      description: get(pageData, "page.seoData.description", ""),
      images: [get(pageData, "page.seoData.image", "")],
    },
    metadataBase: new URL("https://chaibuilder.com"),
  };
}

export default async function Home({ params }: { params: { slug: string[] } }) {
  const { data } = await chaiBuilder.getPageData(pageSlug(params));
  if (!data) return notFound();

  const styles = await getStylesForPageData(data);
  return (
    <RenderChaiPage
      pageData={data}
      before={<StylesAndFonts project={data.project} styles={styles} />}
    />
  );
}
