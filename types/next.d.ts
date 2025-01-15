import { NextRequest } from 'next/server'

declare module 'next' {
  type RouteParams<T> = { params: T }
}

// Override the RouteContext type
declare type RouteContext = {
  params: { [key: string]: string | string[] }
} 