import { NextRequest } from 'next/server';

type Context<T> = {
  params: T;
};

export function createRouteHandler<T>(
  handler: (req: NextRequest, ctx: Context<T>) => Promise<Response>
) {
  return async (req: NextRequest, { params }: { params: T | Promise<T> }) => {
    const resolvedParams = params instanceof Promise ? await params : params;
    return handler(req, { params: resolvedParams });
  };
} 