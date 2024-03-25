import { LOCALE } from "@config";
import { slugifyStr } from "@utils/slugify";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-md",
  };

  return (
    <li className="mt-4">
      <a href={href} className="block pb-3 text-lg hover:text-skin-accent">
        <time className="text-sm" dateTime={pubDatetime.toISOString()}>
          {pubDatetime.toLocaleDateString(LOCALE.langTag, {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}
        </time>
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
      </a>
    </li>
  );
}
