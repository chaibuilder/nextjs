import React from "react";
import Link from "next/link";
import { registerChaiBlock } from "@chaibuilder/runtime";

export function Footer({ blockProps }: any) {
  const footerNavs = [
    {
      href: "#",
      name: "Terms",
    },
    {
      href: "#",
      name: "License",
    },
    {
      href: "#",
      name: "Privacy",
    },
    {
      href: "#",
      name: "About us",
    },
  ];
  return (
    <footer {...blockProps} className="pt-10">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="space-y-6 sm:max-w-md sm:mx-auto sm:text-center">
          <Link
            href="/public"
            className="flex w-40 mx-auto items-center space-x-2"
          >
            <img
              src="/chaibuilder-logo.png"
              width={30}
              height={30}
              alt="Chai Builder Logo"
              className={"rounded-md"}
            />
            <span className="block w-40 text-lg font-bold">Chai Builder</span>
          </Link>
          <p>
            To edit the footer, go to &nbsp; <br />
            <code className="text-gray-500 underline">
              chai-blocks/custom/Footer.tsx
            </code>
          </p>
          <div className="items-center gap-x-3 space-y-3 sm:flex sm:justify-center sm:space-y-0">
            <Link
              href="https://chaibuilder.com/docs"
              className="flex items-center justify-center gap-x-2 py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg md:inline-flex"
            >
              Documentation
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="mt-10 py-10 border-t items-center justify-between sm:flex">
          <p>© 2021-23 Chai Builder. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-4 mt-6 sm:text-sm sm:mt-0">
            {React.Children.toArray(
              footerNavs.map((item, idx) => (
                <li className="text-gray-800 hover:text-gray-500 duration-150">
                  <a key={idx} href={item.href}>
                    {item.name}
                  </a>
                </li>
              )),
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
}

registerChaiBlock(Footer, {
  type: "Footer",
  label: "Footer Simple",
  group: "Footer",
  preview: "",
  props: {},
});
