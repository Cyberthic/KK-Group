export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string | null,
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    let errorMsg = 'An unexpected error occurred';
    if (Array.isArray(body?.message)) {
      errorMsg = body.message.join(', ');
    } else if (body?.message) {
      errorMsg = body.message;
    } else if (body?.error) {
      errorMsg = body.error;
    }

    const err = new Error(errorMsg) as Error & {
      statusCode?: number;
      data?: any;
    };
    err.statusCode = res.status;
    err.data = body;
    throw err;
  }

  if (body && typeof body === 'object' && 'data' in body) {
    return body.data as T;
  }

  return body as T;
}
