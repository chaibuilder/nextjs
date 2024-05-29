"use client";
import "./chaibuilder.css";
import "@chaibuilder/sdk/styles";
import "@/data-providers";
import "@/custom-blocks";
import dynamic from "next/dynamic";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { loadWebBlocks } from "@chaibuilder/sdk/web-blocks";

loadWebBlocks();

const ChaiBuilderStudio = dynamic(
  () => import("@chaibuilder/sdk/studio").then((mod) => mod.ChaiBuilderStudio),
  { ssr: false },
);

const Logo: React.FC<any> = () => {
  return (
    <Link href="/" className="flex w-40 mx-auto items-center space-x-2 mb-2">
      <Image
        src="/chaibuilder-logo.png"
        width={30}
        height={30}
        alt="Chai Builder Logo"
        className={"rounded-md"}
      />
      <span className="block w-fit text-lg font-bold">Chai Builder</span>
    </Link>
  );
};

export default function Home() {
  return <ChaiBuilderStudio logo={Logo} />;
}
