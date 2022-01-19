import * as React from 'react'

import clsxm from '@/lib/clsxm'

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink'

const UnderlineLink = React.forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={clsxm(
          'animated-underline custom-link font-semibold inline-flex items-center',
          'focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-primary-500 focus-visible:rounded',
          'border-b border-dark border-dotted hover:border-black/0',
          className
        )}
      >
        {children}
      </UnstyledLink>
    )
  }
)

export default UnderlineLink
