import { NextRequest } from 'next/server'

declare module 'next/dist/server/app-render/entry-base' {
  export type RouteModule = {
    GET?: (request: NextRequest, context: { params: { [key: string]: string } }) => Promise<Response> | Response
    POST?: (request: NextRequest, context: { params: { [key: string]: string } }) => Promise<Response> | Response
    PUT?: (request: NextRequest, context: { params: { [key: string]: string } }) => Promise<Response> | Response
    PATCH?: (request: NextRequest, context: { params: { [key: string]: string } }) => Promise<Response> | Response
    DELETE?: (request: NextRequest, context: { params: { [key: string]: string } }) => Promise<Response> | Response
  }
} 