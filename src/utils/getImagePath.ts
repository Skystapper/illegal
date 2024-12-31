export function getImagePath(path: string): string {
  // Remove leading slash if it exists
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return process.env.NODE_ENV === 'production' 
    ? `/illegal/${cleanPath}`
    : `/${cleanPath}`
} 