import { parseMarkdown } from "https://deno.land/x/markdown_wasm/mod.ts";
import { htmlHead, htmlTail } from "./html.ts";

export const readFile = async (filePath: string) => {
  try {
    const file = await Deno.open(filePath, { read: true });
    const { isFile, isDirectory } = await file.stat();

    if (!isFile && !isDirectory) throw new Error("Not a file or directory!");

    if (isFile) {
      const text = await Deno.readTextFile(filePath);
      const fileHTML = `${htmlHead}${parseMarkdown(text)}${htmlTail}`;
      console.log(fileHTML);

      return fileHTML;
    }

    file.close();
  } catch (error) {
    console.error(`%c${error.message}`, "color: red");
  }
};
