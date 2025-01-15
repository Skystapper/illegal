export function createRouteHandler<T>(
  handler: (req: Request, context: { params: T }) => Promise<Response>
) {
  return async (req: Request, context: { params: Promise<T> | T }) => {
    const params = context.params instanceof Promise ? await context.params : context.params;
    return handler(req, { params });
  };
}

// Usage in your route files:
export const GET = createRouteHandler<{ id: string }>(
  async (req, { params }) => {
    // Your handler code here
    return new Response('OK');
  }
); 