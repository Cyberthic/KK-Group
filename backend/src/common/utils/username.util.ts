export function extractUsernamePrefix(email: string): string {
  const [prefix] = email.split('@');
  let cleaned = (prefix || 'user')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .replace(/^_+|_+$/g, '');

  if (cleaned.length < 3) {
    cleaned = (cleaned + '_usr').slice(0, 20);
  }
  return cleaned;
}

export async function resolveUniqueUsername(
  email: string,
  isUsernameTaken: (candidate: string) => Promise<boolean>,
): Promise<string> {
  const base = extractUsernamePrefix(email);
  if (!(await isUsernameTaken(base))) {
    return base;
  }

  let suffix = 1;
  while (await isUsernameTaken(`${base}_${suffix}`)) {
    suffix++;
  }
  return `${base}_${suffix}`;
}
