import Link from "next/link";
import type { ComponentProps } from "react";

type StaticLinkProps = ComponentProps<typeof Link>;

/**
 * Drop-in replacement for next/link with prefetch disabled by default.
 * Use this in static-export (output: 'export') projects to avoid
 * 404s on RSC .txt prefetch requests in production.
 */
export default function StaticLink({ prefetch = false, ...props }: StaticLinkProps) {
  return <Link prefetch={prefetch} {...props} />;
}
