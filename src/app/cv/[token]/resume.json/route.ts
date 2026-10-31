import { toJsonResume } from '@/components/Resume/export';

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
  return Response.json(toJsonResume(), {
    headers: {
      'X-Robots-Tag': 'noindex, nofollow',
      'Content-Disposition': 'inline; filename="resume.json"',
    },
  });
}
