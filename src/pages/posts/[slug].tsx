import { format, parseISO } from 'date-fns';
import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import Seo from '@/components/Seo';
import Transition from '@/components/Transition/Transition';

import { PostType } from '../../types';
import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils';

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  Head,
  Image,
  Link,
};

type PostPageProps = {
  source: MDXRemoteSerializeResult;
  frontMatter: PostType;
  slug: string;
};

const PostPage = ({
  source,
  frontMatter,
  slug,
}: PostPageProps): JSX.Element => {
  return (
    </* customMeta={customMeta} */>
      <Seo
        image={`https://s.vercel.app/api?url=${slug}&width=1280&height=720`}
      />
      <Transition>
        <div className='min-h-main dark:divide-slate-700'>
          <div className='pb-8 pt-6 space-y-2 md:space-y-5'>
            <h1 className='font-extrabold leading-9 text-3xl text-slate-900 tracking-tight sm:leading-10 sm:text-4xl md:leading-14 md:text-6xl dark:text-slate-100'>
              {frontMatter.title}
            </h1>{' '}
            <p className='mb-10 text-slate-500 text-sm dark:text-slate-400'>
              {frontMatter.author as string}
            </p>
            <p className='mb-10 text-slate-500 text-sm dark:text-slate-400'>
              {format(parseISO(frontMatter.date as string), 'MMMM dd, yyyy')}
            </p>{' '}
          </div>
          <article>
            <div className='prose dark:prose-dark'>
              <MDXRemote {...source} components={components} />
            </div>
          </article>
        </div>
      </Transition>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params?.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        rehypePrism,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor'],
            },
          },
        ],
      ],
      format: 'mdx',
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      slug: 'https://sezeresim.vercel.app/posts/' + params?.slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default PostPage;
