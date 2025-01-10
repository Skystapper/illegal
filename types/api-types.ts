// Basic route parameter type
export type RouteHandlerParams<T> = {
  params: T;
}

// Common parameter patterns
export type IdParam = {
  id: string;
}

export type SlugParam = {
  slug: string;
}

// Response types
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
}

// Common request body types
export type PaginationQuery = {
  page?: number;
  limit?: number;
}

// Route context with searchParams
export type RouteContext<T> = {
  params: T;
  searchParams?: { [key: string]: string | string[] };
} 