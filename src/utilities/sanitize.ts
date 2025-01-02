import sanitizehtml from 'sanitize-html'

export function sanitize(html: string): string {
  return sanitizehtml(html, { allowedTags: [] })
    .trim()
    .replaceAll(/[ \t]+/g, ' ')
    .replaceAll(/\r/g, '')
    .replaceAll(/\n+/g, '\n')
    .split('\n')
    .join('\n')
}