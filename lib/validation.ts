import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(500),
  category: z.string().min(3).max(20),
  link: z.string().url(),
  // link: z
  //   .string()
  //   .url()
  //   .refine(async (url) => {
  //     try {
  //       const imageExtensionsRegex =
  //         /\.(jpg|jpeg|png|gif|bmp|webp|svg|tiff|ico)$/i;
  //       if (imageExtensionsRegex.test(url)) return true;
  //       const res = await fetch(url, { method: "HEAD" });
  //       const contentType = res.headers.get("content-type");
  //       return contentType?.startsWith("image/");
  //     } catch (error) {
  //       return false;
  //     }
  //   }),
  pitch: z.string().min(10),
});
