/* eslint-disable react-hooks/static-components --
 * Server component that renders compiled Contentlayer MDX. The component is
 * intentionally created per request: this runs on the server, has no state
 * and the compiled code is static per post.
 */
import { getMDXComponent } from 'next-contentlayer2/hooks';

type Props = { code: string };

const MdxContent = ({ code }: Props) => {
  const Component = getMDXComponent(code);
  return <Component />;
};

export default MdxContent;
