import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://87xie.me",
  author: "87xie",
  desc: "Personal writing built with astro paper",
  title: "87xie.me",
  ogImage: "patrick-star-in-love.jpg",
  lightAndDarkMode: true,
  postPerPage: 5,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "zh-Hant", // html lang code. Set this empty and default will be "en"
  langTag: ["zh-Hant"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

// export const LOGO_IMAGE = {
//   enable: false,
//   svg: true,
//   width: 216,
//   height: 46,
// };

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/87xie",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Mail",
    href: "oscar87xie@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: false,
  },
];
