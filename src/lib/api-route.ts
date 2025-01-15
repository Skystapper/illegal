import { NextRequest, NextResponse } from 'next/server';

type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};

export function createApiRoute<T = any>() {
  return {
    GET: async (
      handler: (req: NextRequest, params: any) => Promise<T>
    ) => {
      return async (req: NextRequest, ctx: { params: any }) => {
        try {
          const data = await handler(req, ctx.params);
          return NextResponse.json<ApiResponse<T>>({ success: true, data });
        } catch (error: any) {
          return NextResponse.json<ApiResponse>({ 
            success: false, 
            error: error.message 
          }, { status: 400 });
        }
      };
    },
    POST: async (
      handler: (req: NextRequest, params: any) => Promise<T>
    ) => {
      return async (req: NextRequest, ctx: { params: any }) => {
        try {
          const data = await handler(req, ctx.params);
          return NextResponse.json<ApiResponse<T>>({ success: true, data });
        } catch (error: any) {
          return NextResponse.json<ApiResponse>({ 
            success: false, 
            error: error.message 
          }, { status: 400 });
        }
      };
    },
    PATCH: async (
      handler: (req: NextRequest, params: any) => Promise<T>
    ) => {
      return async (req: NextRequest, ctx: { params: any }) => {
        try {
          const data = await handler(req, ctx.params);
          return NextResponse.json<ApiResponse<T>>({ success: true, data });
        } catch (error: any) {
          return NextResponse.json<ApiResponse>({ 
            success: false, 
            error: error.message 
          }, { status: 400 });
        }
      };
    },
    DELETE: async (
      handler: (req: NextRequest, params: any) => Promise<T>
    ) => {
      return async (req: NextRequest, ctx: { params: any }) => {
        try {
          const data = await handler(req, ctx.params);
          return NextResponse.json<ApiResponse<T>>({ success: true, data });
        } catch (error: any) {
          return NextResponse.json<ApiResponse>({ 
            success: false, 
            error: error.message 
          }, { status: 400 });
        }
      };
    }
  };
} 