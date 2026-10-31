import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import GithubSlugger from 'github-slugger';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode, { type Options } from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const prettyCodeOptions: Options = {
  theme: { light: 'github-light', dark: 'github-dark' },
  keepBackground: false,
  defaultLang: 'plaintext',
};

export const Post = defineDocumentType(() => ({
  name: 'Post',
  contentType: 'mdx',
  filePathPattern: `**/*.mdx`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    description: { type: 'string', required: true },
    image: { type: 'string', required: true },
    author: { type: 'string', required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (post) => post._raw.flattenedPath,
    },
    url: {
      type: 'string',
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
    readingTime: {
      type: 'json',
      resolve: (doc) => readingTime(doc.body.raw),
    },
    headings: {
      type: 'json',
      resolve: (doc) => {
        const slugger = new GithubSlugger();
        // Same slug algorithm as rehype-slug, so anchors match.
        return [...doc.body.raw.matchAll(/^(#{2,3})\s+(.+?)\s*#*$/gm)].map(
          (m) => ({
            level: m[1].length,
            text: m[2].replace(/[*_`]/g, ''),
            slug: slugger.slug(m[2].replace(/[*_`]/g, '')),
          }),
        );
      },
    },
  },
}));

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, prettyCodeOptions],
      [
        rehypeAutolinkHeadings,
        { behavior: 'wrap', properties: { className: ['anchor'] } },
      ],
    ],
  },
});
