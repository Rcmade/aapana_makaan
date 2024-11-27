import Link from "next/link";
import { Mail, Phone, Instagram, Facebook, Twitter } from "lucide-react";
import AnimatedLink from "./AnimatedLink";
import Container from "../layouts/Container";
import LogoButton from "../buttons/LogoButton";
import LoginButton from "../buttons/LoginButton";

export default function Footer() {
  return (
    <footer className="border-t bg-secondary py-4 md:bg-transparent">
      <Container asChild>
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-4">
          <div className="space-y-4">
            <LogoButton />
            <div className="flex items-center space-x-2">
              <Mail className="size-4" />
              <span>{process.env.NEXT_PUBLIC_SUPPORT_EMAIL}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="size-4" />
              <span>{process.env.NEXT_PUBLIC_SUPPORT_NUMBER}</span>
            </div>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Quick links</h3>
            <ul className="space-y-1">
              <li>
                <AnimatedLink href="/daily-rental">Daily rental</AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="/long-term-rental">
                  Long-term rental
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="/buy-property">Buy property</AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="/sell-property">Sell property</AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="/popular-offers">
                  Popular offers
                </AnimatedLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Profile</h3>
            <ul className="space-y-1">
              <li>
                <AnimatedLink href="/account">My account</AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="/listings">My listings</AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="/add-listing">Add listings</AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="/help">Help center</AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="/privacy">Privacy policy</AnimatedLink>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold md:px-2">Get exclusive advice</h3>
            <LoginButton />
            <div className="flex space-x-4 md:px-2">
              <Link href="https://instagram.com" aria-label="Instagram">
                <Instagram className="size-4" />
              </Link>
              <Link href="https://facebook.com" aria-label="Facebook">
                <Facebook className="size-4" />
              </Link>
              <Link href="https://twitter.com" aria-label="Twitter">
                <Twitter className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
