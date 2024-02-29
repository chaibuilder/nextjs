import { registerChaiBlock } from "@chaibuilder/runtime";
import { HeaderClient } from "@/custom-blocks/client/Header";
import { Styles } from "@chaibuilder/runtime/controls";

/**
 * Header block uses useEffect and hence is a client component.
 * Chai Blocks by default are server components.
 * To support client components blocks, we need to separate the client and server components.
 * And register only server components with Chai Blocks.
 * @param props
 * @constructor
 */
export function Header(props: any) {
  return <HeaderClient {...props} />;
}

registerChaiBlock(Header, {
  type: "Header",
  label: "Header Simple",
  group: "Header",
  preview: "",
  props: {
    signInBtnStyles: Styles({
      default:
        "flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex",
    }),
  },
});
