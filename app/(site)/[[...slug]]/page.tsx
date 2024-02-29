import "@/data-providers";
import "@/custom-blocks";
import "@/app/globals.css";
import { get, join } from "lodash";
import { notFound } from "next/navigation";
import { chaiBuilder } from "@/app/chaiBuilder";
import { prepareExternalData } from "@chaibuilder/sdk/server";
import { getStylesForPageData } from "@chaibuilder/sdk/lib";
import { RenderChaiPage } from "@chaibuilder/sdk/render";
import { StylesAndFonts } from "./StylesAndFonts";

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
      "#000000",
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

export default async function Home({ params }: ChaiParams) {
  const { data } = await chaiBuilder.getPageData(pageSlug(params));
  if (!data) return notFound();

  const { data: externalData } = await prepareExternalData(
    data.page.providers as any,
    pageSlug(params),
  );
  const styles = await getStylesForPageData(data);

  return (
    <RenderChaiPage
      externalData={externalData}
      pageData={data}
      before={<StylesAndFonts project={data.project} styles={styles} />}
    />
  );
}
