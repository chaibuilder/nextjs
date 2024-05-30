import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { chaiBuilder } from "@/app/chaiBuilder";
import { headers } from "next/headers";

function setAccessToken() {
  const allHeaders = headers();
  const accessToken = allHeaders.get("x-chai-access-token");
  chaiBuilder.setAccessToken(accessToken);
}

export async function GET(_request: NextRequest, { params }: { params: any }) {
  setAccessToken();
  const path = params.path.join("/");
  const { searchParams } = _request.nextUrl;
  switch (path) {
    case "project":
      const project = await chaiBuilder.getProject();
      return NextResponse.json(project);
    case "pages":
      const pages = await chaiBuilder.getPages();
      return NextResponse.json(pages);
    case "page":
      const uuid = searchParams.get("uuid") as string;
      const page = await chaiBuilder.getPage(uuid);
      return NextResponse.json(page);
    case "verify":
      const response = await chaiBuilder.verify();
      return NextResponse.json(response);
    case "assets":
      const limit = searchParams.get("limit") as string;
      const offset = searchParams.get("offset") as string;
      const assets = await chaiBuilder.getAssets(limit, offset);
      return NextResponse.json(assets);
    default:
      return NextResponse.json({});
  }
}

export async function POST(_request: NextRequest, { params }: { params: any }) {
  setAccessToken();
  const path = params.path.join("/");
  switch (path) {
    case "publish":
      const publishData = await _request.json();
      revalidateTag(publishData.isHomepage ? "_homepage" : publishData.slug);
      return NextResponse.json({ result: "success" });
    case "pages":
      const pageData = await _request.json();
      const page = await chaiBuilder.addPage(pageData);
      return NextResponse.json(page);
    case "login":
      const loginFormData = await _request.json(); // { password }
      const loginData = await chaiBuilder.login(loginFormData);
      return NextResponse.json(loginData);
    case "logout":
      const logoutResponse = await chaiBuilder.logout();
      return NextResponse.json(logoutResponse);
    case "upload":
      const uploadData = await _request.formData();
      const uploadedAsset = await chaiBuilder.uploadAsset(uploadData);
      return NextResponse.json(uploadedAsset);
    case "take-control":
      const { uuid } = await _request.json();
      const response = await chaiBuilder.unlockPage(uuid);
      return NextResponse.json(response);
    default:
      return NextResponse.json({});
  }
}

//
export async function PUT(_request: NextRequest, { params }: { params: any }) {
  setAccessToken();
  const path = params.path.join("/");
  switch (path) {
    case "page":
      const pageData = await _request.json();
      const response = await chaiBuilder.updatePage(pageData);
      return NextResponse.json(response);
    case "project":
      const projectData = await _request.json();
      const project = await chaiBuilder.updateProject(projectData);
      return NextResponse.json(project);
    default:
      return NextResponse.json({});
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: any },
) {
  setAccessToken();
  const path = params.path.join("/");
  switch (path) {
    case "page":
      const pageData = await _request.json();
      const uuid = pageData.uuid as string;
      const page = await chaiBuilder.deletePage(uuid);
      return NextResponse.json(page);
    default:
      return NextResponse.json({});
  }
}
