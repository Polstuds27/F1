type TextLinkProps = {
  href: string
  children: string
  className?: string
}

/** The site's single CTA style: a label followed by a rule that extends on hover. */
export function TextLink({ href, children, className = '' }: TextLinkProps) {
  return (
    <a href={href} className={`group inline-flex items-center gap-5 py-3 ${className}`}>
      <span className="label">{children}</span>
      <span aria-hidden className="relative block h-px w-12 overflow-hidden bg-current/30 transition-[width] duration-700 ease-cinema group-hover:w-20">
        <span className="absolute inset-0 -translate-x-full bg-racing transition-transform duration-700 ease-cinema group-hover:translate-x-0" />
      </span>
    </a>
  )
}
