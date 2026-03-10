/**
 * VPS API Client - Drop-in replacement for Supabase client
 * Mimics the Supabase JS SDK interface but calls VPS REST API
 */

const API_URL = import.meta.env.VITE_API_URL || '';
const TOKEN_KEY = 'vps_auth_token';
const USER_KEY = 'vps_auth_user';

// ============================================================
// Auth State Management
// ============================================================
type AuthChangeCallback = (event: string, session: any) => void;
const authListeners: Set<AuthChangeCallback> = new Set();

function getStoredToken(): string | null {
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
}

function getStoredUser(): any {
  try {
    const u = localStorage.getItem(USER_KEY);
    return u ? JSON.parse(u) : null;
  } catch { return null; }
}

function setAuthData(user: any, session: any) {
  try {
    if (session?.access_token) localStorage.setItem(TOKEN_KEY, session.access_token);
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {}
}

function clearAuthData() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch {}
}

function notifyAuthListeners(event: string, session: any) {
  authListeners.forEach(cb => {
    try { cb(event, session); } catch (e) { console.error('Auth listener error:', e); }
  });
}

function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = getStoredToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

// ============================================================
// Query Builder (mimics Supabase PostgREST query builder)
// ============================================================
type FilterEntry = { key: string; op: string; value: any };

class QueryBuilder {
  private table: string;
  private filters: FilterEntry[] = [];
  private selectColumns: string = '*';
  private orderClause: string | null = null;
  private limitVal: number | null = null;
  private offsetVal: number | null = null;
  private isSingle: boolean = false;
  private isMaybeSingle: boolean = false;
  private isCount: boolean = false;
  private isHead: boolean = false;
  private method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET';
  private body: any = null;
  private returnData: boolean = false;
  private orFilters: string[] = [];
  private gtFilters: FilterEntry[] = [];
  private gteFilters: FilterEntry[] = [];
  private ltFilters: FilterEntry[] = [];
  private lteFilters: FilterEntry[] = [];
  private likeFilters: FilterEntry[] = [];
  private ilikeFilters: FilterEntry[] = [];
  private inFilters: FilterEntry[] = [];
  private isFilters: FilterEntry[] = [];
  private neqFilters: FilterEntry[] = [];
  private containsFilters: FilterEntry[] = [];
  private rangeFrom: number | null = null;
  private rangeTo: number | null = null;

  constructor(table: string, method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET', body?: any) {
    this.table = table;
    this.method = method;
    this.body = body;
  }

  select(columns?: string, options?: { count?: string; head?: boolean }) {
    if (columns) this.selectColumns = columns;
    if (options?.count) this.isCount = true;
    if (options?.head) this.isHead = true;
    if (this.method === 'POST' || this.method === 'PATCH') {
      this.returnData = true;
    }
    return this;
  }

  eq(column: string, value: any) {
    this.filters.push({ key: column, op: 'eq', value });
    return this;
  }

  neq(column: string, value: any) {
    this.neqFilters.push({ key: column, op: 'neq', value });
    return this;
  }

  gt(column: string, value: any) {
    this.gtFilters.push({ key: column, op: 'gt', value });
    return this;
  }

  gte(column: string, value: any) {
    this.gteFilters.push({ key: column, op: 'gte', value });
    return this;
  }

  lt(column: string, value: any) {
    this.ltFilters.push({ key: column, op: 'lt', value });
    return this;
  }

  lte(column: string, value: any) {
    this.lteFilters.push({ key: column, op: 'lte', value });
    return this;
  }

  like(column: string, value: any) {
    this.likeFilters.push({ key: column, op: 'like', value });
    return this;
  }

  ilike(column: string, value: any) {
    this.ilikeFilters.push({ key: column, op: 'ilike', value });
    return this;
  }

  in(column: string, values: any[]) {
    this.inFilters.push({ key: column, op: 'in', value: values });
    return this;
  }

  is(column: string, value: any) {
    this.isFilters.push({ key: column, op: 'is', value: value === null ? 'null' : String(value) });
    return this;
  }

  contains(column: string, value: any) {
    this.containsFilters.push({ key: column, op: 'contains', value });
    return this;
  }

  or(filterString: string) {
    this.orFilters.push(filterString);
    return this;
  }

  not(column: string, op: string, value: any) {
    // Simple NOT support
    if (op === 'eq') {
      this.neqFilters.push({ key: column, op: 'neq', value });
    } else if (op === 'is') {
      this.isFilters.push({ key: column, op: 'is', value: value === null ? 'not.null' : 'null' });
    }
    return this;
  }

  order(column: string, options?: { ascending?: boolean }) {
    const dir = options?.ascending === false ? 'desc' : 'asc';
    this.orderClause = `${column}.${dir}`;
    return this;
  }

  limit(count: number) {
    this.limitVal = count;
    return this;
  }

  range(from: number, to: number) {
    this.rangeFrom = from;
    this.rangeTo = to;
    this.limitVal = to - from + 1;
    this.offsetVal = from;
    return this;
  }

  single() {
    this.isSingle = true;
    this.limitVal = 1;
    return this;
  }

  maybeSingle() {
    this.isMaybeSingle = true;
    this.limitVal = 1;
    return this;
  }

  textSearch(column: string, query: string) {
    this.ilikeFilters.push({ key: column, op: 'ilike', value: `%${query}%` });
    return this;
  }

  private buildQueryParams(): URLSearchParams {
    const params = new URLSearchParams();
    if (this.selectColumns !== '*') params.set('select', this.selectColumns);
    
    this.filters.forEach(f => params.set(`${f.key}.eq`, String(f.value)));
    this.neqFilters.forEach(f => params.set(`${f.key}.neq`, String(f.value)));
    this.gtFilters.forEach(f => params.set(`${f.key}.gt`, String(f.value)));
    this.gteFilters.forEach(f => params.set(`${f.key}.gte`, String(f.value)));
    this.ltFilters.forEach(f => params.set(`${f.key}.lt`, String(f.value)));
    this.lteFilters.forEach(f => params.set(`${f.key}.lte`, String(f.value)));
    this.likeFilters.forEach(f => params.set(`${f.key}.like`, String(f.value)));
    this.ilikeFilters.forEach(f => params.set(`${f.key}.ilike`, String(f.value)));
    this.inFilters.forEach(f => params.set(`${f.key}.in`, `(${f.value.join(',')})`));
    this.isFilters.forEach(f => params.set(`${f.key}.is`, String(f.value)));

    if (this.orderClause) params.set('order', this.orderClause);
    if (this.limitVal !== null) params.set('limit', String(this.limitVal));
    if (this.offsetVal !== null) params.set('offset', String(this.offsetVal));

    return params;
  }

  async then(resolve: (result: { data: any; error: any; count?: number }) => void, reject?: (error: any) => void) {
    try {
      const result = await this.execute();
      resolve(result);
    } catch (error) {
      if (reject) reject(error);
      else resolve({ data: null, error });
    }
  }

  private async execute(): Promise<{ data: any; error: any; count?: number }> {
    try {
      let url: string;
      let fetchOptions: RequestInit = { headers: getHeaders() };

      if (this.method === 'GET') {
        const params = this.buildQueryParams();
        url = `${API_URL}/rest/${this.table}?${params.toString()}`;
        fetchOptions.method = 'GET';
      } else if (this.method === 'POST') {
        const params = this.buildQueryParams();
        url = `${API_URL}/rest/${this.table}?${params.toString()}`;
        fetchOptions.method = 'POST';
        fetchOptions.body = JSON.stringify(this.body);
      } else if (this.method === 'PATCH') {
        const params = this.buildQueryParams();
        url = `${API_URL}/rest/${this.table}?${params.toString()}`;
        fetchOptions.method = 'PATCH';
        fetchOptions.body = JSON.stringify(this.body);
      } else if (this.method === 'DELETE') {
        const params = this.buildQueryParams();
        url = `${API_URL}/rest/${this.table}?${params.toString()}`;
        fetchOptions.method = 'DELETE';
      } else {
        return { data: null, error: new Error('Unknown method') };
      }

      const response = await fetch(url, fetchOptions);
      
      if (!response.ok) {
        const errBody = await response.json().catch(() => ({ message: response.statusText }));
        return { data: null, error: { message: errBody.error || errBody.message || response.statusText, code: String(response.status) } };
      }

      let data = await response.json();

      // Handle single/maybeSingle
      if (this.isSingle) {
        if (Array.isArray(data)) {
          if (data.length === 0) {
            return { data: null, error: { message: 'No rows found', code: 'PGRST116' } };
          }
          data = data[0];
        }
      } else if (this.isMaybeSingle) {
        if (Array.isArray(data)) {
          data = data.length > 0 ? data[0] : null;
        }
      }

      // For insert/update that return single objects, ensure consistent format
      if ((this.method === 'POST' || this.method === 'PATCH') && !this.returnData) {
        // If no .select() was chained, still return the data
      }

      return { data, error: null, count: Array.isArray(data) ? data.length : undefined };
    } catch (error: any) {
      return { data: null, error: { message: error.message || 'Network error' } };
    }
  }
}

// ============================================================
// Table Builder (mimics supabase.from('table'))
// ============================================================
class TableBuilder {
  private table: string;

  constructor(table: string) {
    this.table = table;
  }

  select(columns?: string, options?: { count?: string; head?: boolean }) {
    const qb = new QueryBuilder(this.table, 'GET');
    return qb.select(columns, options);
  }

  insert(data: any | any[]) {
    const rows = Array.isArray(data) ? data : data;
    return new QueryBuilder(this.table, 'POST', rows);
  }

  update(data: any) {
    return new QueryBuilder(this.table, 'PATCH', data);
  }

  delete() {
    return new QueryBuilder(this.table, 'DELETE');
  }

  upsert(data: any | any[]) {
    // For VPS, upsert = try insert, on conflict update
    // We'll handle this as a POST with upsert flag
    const rows = Array.isArray(data) ? data : data;
    return new QueryBuilder(this.table, 'POST', { ...rows, _upsert: true });
  }
}

// ============================================================
// Auth Module
// ============================================================
const auth = {
  async signUp({ email, password, options }: { email: string; password: string; options?: { data?: any; emailRedirectTo?: string } }) {
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          full_name: options?.data?.full_name,
          phone: options?.data?.phone,
        }),
      });

      const result = await res.json();
      if (!res.ok) return { data: { user: null, session: null }, error: { message: result.error } };

      const user = {
        id: result.user.id,
        email: result.user.email,
        user_metadata: options?.data || {},
        app_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      };
      const session = {
        access_token: result.session.access_token,
        token_type: 'bearer',
        user,
      };

      setAuthData(user, session);
      notifyAuthListeners('SIGNED_IN', session);

      return { data: { user, session }, error: null };
    } catch (error: any) {
      return { data: { user: null, session: null }, error: { message: error.message } };
    }
  },

  async signInWithPassword({ email, password }: { email: string; password: string }) {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();
      if (!res.ok) return { data: { user: null, session: null }, error: { message: result.error } };

      const user = {
        id: result.user.id,
        email: result.user.email,
        user_metadata: result.user.user_metadata || {},
        app_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      };
      const session = {
        access_token: result.session.access_token,
        token_type: 'bearer',
        user,
      };

      setAuthData(user, session);
      notifyAuthListeners('SIGNED_IN', session);

      return { data: { user, session }, error: null };
    } catch (error: any) {
      return { data: { user: null, session: null }, error: { message: error.message } };
    }
  },

  async signOut() {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: getHeaders(),
      });
    } catch {}
    clearAuthData();
    notifyAuthListeners('SIGNED_OUT', null);
    return { error: null };
  },

  async getSession() {
    const token = getStoredToken();
    const user = getStoredUser();
    if (!token || !user) {
      return { data: { session: null }, error: null };
    }

    const session = {
      access_token: token,
      token_type: 'bearer',
      user,
    };
    return { data: { session }, error: null };
  },

  async getUser() {
    const token = getStoredToken();
    if (!token) return { data: { user: null }, error: null };

    try {
      const res = await fetch(`${API_URL}/auth/session`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        clearAuthData();
        return { data: { user: null }, error: { message: 'Session expired' } };
      }
      const result = await res.json();
      const user = {
        id: result.user.id,
        email: result.user.email,
        user_metadata: result.user.user_metadata || {},
        app_metadata: {},
        aud: 'authenticated',
      };
      return { data: { user }, error: null };
    } catch (error: any) {
      return { data: { user: null }, error: { message: error.message } };
    }
  },

  async updateUser({ password, data }: { password?: string; data?: any }) {
    try {
      if (password) {
        const res = await fetch(`${API_URL}/auth/reset-password`, {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify({ password }),
        });
        if (!res.ok) {
          const err = await res.json();
          return { data: { user: null }, error: { message: err.error } };
        }
      }
      const user = getStoredUser();
      if (data && user) {
        user.user_metadata = { ...user.user_metadata, ...data };
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      }
      return { data: { user: user || null }, error: null };
    } catch (error: any) {
      return { data: { user: null }, error: { message: error.message } };
    }
  },

  async resetPasswordForEmail(email: string, _options?: { redirectTo?: string }) {
    // VPS doesn't support email-based password reset out of the box
    // Return success to avoid breaking the UI
    console.warn('Password reset via email not supported on VPS. Use admin panel to reset passwords.');
    return { data: {}, error: null };
  },

  onAuthStateChange(callback: AuthChangeCallback) {
    authListeners.add(callback);

    // Fire immediately with current state
    const token = getStoredToken();
    const user = getStoredUser();
    if (token && user) {
      const session = { access_token: token, token_type: 'bearer', user };
      setTimeout(() => callback('INITIAL_SESSION', session), 0);
    } else {
      setTimeout(() => callback('INITIAL_SESSION', null), 0);
    }

    return {
      data: {
        subscription: {
          unsubscribe: () => { authListeners.delete(callback); },
        },
      },
    };
  },
};

// ============================================================
// Storage Module
// ============================================================
function createStorageBucket(bucketName: string) {
  return {
    async upload(path: string, file: File | Blob, _options?: any) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('path', path);

        const headers: Record<string, string> = {};
        const token = getStoredToken();
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(`${API_URL}/storage/${bucketName}/upload`, {
          method: 'POST',
          headers,
          body: formData,
        });

        if (!res.ok) {
          const err = await res.json();
          return { data: null, error: { message: err.error || 'Upload failed' } };
        }

        const result = await res.json();
        return { data: { path: result.path, fullPath: result.url }, error: null };
      } catch (error: any) {
        return { data: null, error: { message: error.message } };
      }
    },

    getPublicUrl(path: string) {
      const url = `${API_URL.replace('/api', '')}/uploads/${bucketName}/${path}`;
      return { data: { publicUrl: url } };
    },

    async createSignedUrl(path: string, _expiresIn: number) {
      // VPS doesn't have signed URLs, use direct URL
      const url = `${API_URL.replace('/api', '')}/uploads/${bucketName}/${path}`;
      return { data: { signedUrl: url }, error: null };
    },

    async remove(paths: string[]) {
      // TODO: Implement file deletion on VPS
      console.warn('File deletion not implemented on VPS storage');
      return { data: paths, error: null };
    },
  };
}

const storage = {
  from(bucketName: string) {
    return createStorageBucket(bucketName);
  },
};

// ============================================================
// Functions Module (replaces Edge Functions)
// ============================================================
const functions = {
  async invoke(functionName: string, options?: { body?: any }) {
    try {
      const res = await fetch(`${API_URL}/functions/${functionName}`, {
        method: 'POST',
        headers: getHeaders(),
        body: options?.body ? JSON.stringify(options.body) : undefined,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }));
        return { data: null, error: { message: err.error || err.message || res.statusText } };
      }

      const data = await res.json().catch(() => null);
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    }
  },
};

// ============================================================
// RPC Module
// ============================================================
async function rpc(functionName: string, params?: any) {
  try {
    const res = await fetch(`${API_URL}/rpc/${functionName}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(params || {}),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      return { data: null, error: { message: err.error || res.statusText } };
    }

    const data = await res.json().catch(() => null);
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: { message: error.message } };
  }
}

// ============================================================
// Channel (stub - no realtime on VPS)
// ============================================================
function channel(_name: string) {
  return {
    on(_type: string, _config: any, _callback: any) { return this; },
    subscribe() { return this; },
    unsubscribe() {},
  };
}

// ============================================================
// Main Export - Supabase-compatible client
// ============================================================
export const supabase = {
  from(table: string) {
    return new TableBuilder(table);
  },
  auth,
  storage,
  functions,
  rpc,
  channel,
  removeChannel(_channel: any) {},
};
