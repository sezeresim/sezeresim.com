import { toPlainText } from '@/components/Resume/export';

const token = process.env.CV_TOKEN;

export const dynamic = 'force-static';
export const dynamicParams = false;

export const generateStaticParams = async () => (token ? [{ token }] : []);

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token: requested } = await params;
  if (!token || requested !== token) {
    return new Response('Not found', { status: 404 });
  }
  return new Response(toPlainText() + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
      'Content-Disposition': 'inline; filename="resume.txt"',
    },
  });
}
