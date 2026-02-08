import { getFileUploadUrl } from '@/server';
import { auth } from '@clerk/nextjs/server';
import { FileUploadRequestSchema } from '@rp/core';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const parsed = FileUploadRequestSchema.safeParse(body);

  if (!parsed.success)
    return NextResponse.json(
      { error: 'Invalid request', details: parsed.error.issues },
      { status: 400 },
    );

  const fileUpload = await getFileUploadUrl(parsed.data);

  return NextResponse.json(fileUpload);
}
