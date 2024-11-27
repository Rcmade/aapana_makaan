"use client";

import { useState } from "react";
import {
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  MessageCircle,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface ShareButtonProps {
  url: string;
  title: string;
}

export function ShareButton({ url, title }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const shareData = {
    title,
    text: "Check out this link!",
    url,
  };

  const socialShareLinks = [
    {
      label: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title,
      )}&url=${encodeURIComponent(url)}`,
    },
    {
      label: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url,
      )}`,
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        url,
      )}&title=${encodeURIComponent(title)}`,
    },
    {
      label: "WhatsApp",
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
  ];

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      setIsOpen(true);
    }
  };

  const openLink = (url: string) => {
    window.open(url, "_blank");
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Link Copied! The URL has been copied to your clipboard.");
    });
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" onClick={handleNativeShare}>
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Share</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {socialShareLinks.map(({ label, icon: Icon, url }) => (
          <DropdownMenuItem key={label} onClick={() => openLink(url)}>
            <Icon className="mr-2 h-4 w-4" />
            <span>{label}</span>
          </DropdownMenuItem>
        ))}
        {/* Copy to Clipboard Button */}
        <DropdownMenuItem onClick={handleCopyToClipboard}>
          <Copy className="mr-2 h-4 w-4" />
          <span>Copy Link</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
