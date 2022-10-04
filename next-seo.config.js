export const appStaticContent = {
  currentAppLink: "https://dcompass.xyz",
  name: "Quest",
  description: "LEARN WEB3 BY COMPLETING QUEST.",
};

/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: appStaticContent.name,
  titleTemplate: `%s | ${appStaticContent.name}`,
  defaultTitle: appStaticContent.name,
  description: appStaticContent.description,
  canonical: appStaticContent.currentAppLink,
  openGraph: {
    url: appStaticContent.currentAppLink,
    title: appStaticContent.name,
    description: appStaticContent.description,
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/90008925?s=200&v=4",
      },
    ],
    site_name: appStaticContent.name,
  },
  twitter: {
    handle: "@buidlguidl",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
