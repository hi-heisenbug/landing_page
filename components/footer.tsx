import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "./ui/button";
import XLogoIcon from "./icons/x";
import LinkedInLogoIcon from "./icons/linkedin";
import InstagramLogoIcon from "./icons/instagram";
import YouTubeLogoIcon from "./icons/youtube";
import { socialLinks } from "@/lib/constants";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex gap-4 items-center absolute bottom-[calc(var(--inset)+0.8rem)] md:bottom-[calc(var(--inset)+1.5rem)] left-1/2 -translate-x-1/2">
      <Link target="_blank" className={buttonVariants({ size: "icon-xl" })} href={socialLinks.linkedin}>
        <LinkedInLogoIcon className="size-5" />
      </Link>
      <Link target="_blank" className={buttonVariants({ size: "icon-xl" })} href={socialLinks.x}>
        <XLogoIcon className="size-5" />
      </Link>
      <Link target="_blank" className={buttonVariants({ size: "icon-xl" })} href={socialLinks.github}>
        <GitHubLogoIcon className="size-5" />
      </Link>
      <Link target="_blank" className={buttonVariants({ size: "icon-xl" })} href={socialLinks.instagram}>
        <InstagramLogoIcon className="size-5" />
      </Link>
      <Link target="_blank" className={buttonVariants({ size: "icon-xl" })} href={socialLinks.youtube}>
        <YouTubeLogoIcon className="size-5" />
      </Link>
    </div>
  );
};

