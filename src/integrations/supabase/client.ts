// Local-first resilient Supabase client wrapper with offline storage fallback

interface UserData {
  id: string;
  email: string;
  password?: string;
  first_name: string;
  last_name: string;
  role: string;
  created_at: string;
  updated_at: string;
  contact?: string;
  parent_contact?: string;
}

interface RequestData {
  id: string;
  student_id: string;
  student_name: string;
  student_room_number?: string;
  hostel_name?: string;
  student_course?: string;
  student_contact?: string;
  parent_contact?: string;
  reason: string;
  leave_start_date: string;
  leave_end_date: string;
  status: string;
  created_at: string;
  updated_at?: string;
}

const STORAGE_USERS = "gatepass_users_db";
const STORAGE_REQUESTS = "gatepass_requests_db";
const STORAGE_SESSION = "gatepass_current_session";

// Initial seed data for seamless testing
const SEED_USERS: UserData[] = [
  {
    id: "usr-admin-01",
    email: "admin@gatepass.com",
    password: "password123",
    first_name: "Admin",
    last_name: "User",
    role: "Admin",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "usr-student-01",
    email: "student@gatepass.com",
    password: "password123",
    first_name: "Joshikaa",
    last_name: "R",
    role: "Student",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    contact: "9876543210",
    parent_contact: "9123456780",
  },
  {
    id: "usr-tutor-01",
    email: "tutor@gatepass.com",
    password: "password123",
    first_name: "Dr. Priya",
    last_name: "Tutor",
    role: "Tutor",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "usr-hod-01",
    email: "hod@gatepass.com",
    password: "password123",
    first_name: "Prof. Kumar",
    last_name: "HOD",
    role: "HOD",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "usr-warden-01",
    email: "warden@gatepass.com",
    password: "password123",
    first_name: "Mr. Ramesh",
    last_name: "Warden",
    role: "Warden",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const SEED_REQUESTS: RequestData[] = [
  {
    id: "req-001",
    student_id: "usr-student-01",
    student_name: "Joshikaa R",
    student_room_number: "B-204",
    hostel_name: "Bhavani",
    student_course: "CSE / III / A",
    student_contact: "9876543210",
    parent_contact: "9123456780",
    reason: "Weekend Home Visit - Destination: Coimbatore",
    leave_start_date: new Date(Date.now() + 86400000).toISOString(),
    leave_end_date: new Date(Date.now() + 86400000 * 3).toISOString(),
    status: "pending_tutor_approval",
    created_at: new Date().toISOString(),
  },
  {
    id: "req-002",
    student_id: "usr-student-01",
    student_name: "Joshikaa R",
    student_room_number: "B-204",
    hostel_name: "Bhavani",
    student_course: "CSE / III / A",
    student_contact: "9876543210",
    parent_contact: "9123456780",
    reason: "Library Visit - Destination: City Center",
    leave_start_date: new Date(Date.now() - 86400000 * 5).toISOString(),
    leave_end_date: new Date(Date.now() - 86400000 * 4).toISOString(),
    status: "approved",
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];

function getUsers(): UserData[] {
  try {
    const raw = localStorage.getItem(STORAGE_USERS);
    if (!raw) {
      localStorage.setItem(STORAGE_USERS, JSON.stringify(SEED_USERS));
      return SEED_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_USERS;
  }
}

function saveUsers(users: UserData[]) {
  try {
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
  } catch (e) {
    console.error("Failed to save users", e);
  }
}

function getRequests(): RequestData[] {
  try {
    const raw = localStorage.getItem(STORAGE_REQUESTS);
    if (!raw) {
      localStorage.setItem(STORAGE_REQUESTS, JSON.stringify(SEED_REQUESTS));
      return SEED_REQUESTS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_REQUESTS;
  }
}

function saveRequests(reqs: RequestData[]) {
  try {
    localStorage.setItem(STORAGE_REQUESTS, JSON.stringify(reqs));
  } catch (e) {
    console.error("Failed to save requests", e);
  }
}

function getCurrentSession(): { user: any; profile: UserData } | null {
  try {
    const raw = localStorage.getItem(STORAGE_SESSION);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function setCurrentSession(session: { user: any; profile: UserData } | null) {
  try {
    if (!session) {
      localStorage.removeItem(STORAGE_SESSION);
    } else {
      localStorage.setItem(STORAGE_SESSION, JSON.stringify(session));
    }
  } catch (e) {
    console.error("Failed to save session", e);
  }
}

// Mock Query Builder supporting chainable supabase-like syntax
class QueryBuilder {
  private table: string;
  private filters: Array<(item: any) => boolean> = [];
  private orderField: string | null = null;
  private orderAscending: boolean = true;
  private isSingle: boolean = false;
  private insertedData: any = null;
  private updatedData: any = null;

  constructor(table: string) {
    this.table = table;
  }

  select(_fields = "*") {
    return this;
  }

  insert(data: any) {
    this.insertedData = data;
    return this.executeInsert();
  }

  update(data: any) {
    this.updatedData = data;
    return this;
  }

  eq(field: string, value: any) {
    this.filters.push((item: any) => item[field] === value);
    return this;
  }

  in(field: string, values: any[]) {
    this.filters.push((item: any) => values.includes(item[field]));
    return this;
  }

  order(field: string, options?: { ascending?: boolean }) {
    this.orderField = field;
    this.orderAscending = options?.ascending !== false;
    return this;
  }

  single() {
    this.isSingle = true;
    return this.executeSelect();
  }

  private executeInsert(): Promise<{ data: any; error: any }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (this.table === "gatepass_requests") {
          const reqs = getRequests();
          const newReq: RequestData = {
            id: `req-${Date.now()}`,
            created_at: new Date().toISOString(),
            ...this.insertedData,
          };
          reqs.unshift(newReq);
          saveRequests(reqs);
          resolve({ data: newReq, error: null });
        } else if (this.table === "profiles") {
          const users = getUsers();
          const newUser: UserData = {
            id: this.insertedData.id || `usr-${Date.now()}`,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            ...this.insertedData,
          };
          users.push(newUser);
          saveUsers(users);
          resolve({ data: newUser, error: null });
        } else {
          resolve({ data: this.insertedData, error: null });
        }
      }, 50);
    });
  }

  private executeUpdate(): Promise<{ data: any; error: any }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (this.table === "gatepass_requests") {
          let reqs = getRequests();
          reqs = reqs.map((r) => {
            const matches = this.filters.every((f) => f(r));
            if (matches) {
              return { ...r, ...this.updatedData, updated_at: new Date().toISOString() };
            }
            return r;
          });
          saveRequests(reqs);
          resolve({ data: this.updatedData, error: null });
        } else if (this.table === "profiles") {
          let users = getUsers();
          users = users.map((u) => {
            const matches = this.filters.every((f) => f(u));
            if (matches) {
              return { ...u, ...this.updatedData, updated_at: new Date().toISOString() };
            }
            return u;
          });
          saveUsers(users);
          resolve({ data: this.updatedData, error: null });
        } else {
          resolve({ data: this.updatedData, error: null });
        }
      }, 50);
    });
  }

  private executeSelect(): Promise<{ data: any; error: any }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let items: any[] = [];
        if (this.table === "profiles") {
          items = getUsers();
        } else if (this.table === "gatepass_requests") {
          items = getRequests();
        }

        // Apply filters
        for (const filter of this.filters) {
          items = items.filter(filter);
        }

        // Apply ordering
        if (this.orderField) {
          const field = this.orderField;
          items.sort((a, b) => {
            if (a[field] < b[field]) return this.orderAscending ? -1 : 1;
            if (a[field] > b[field]) return this.orderAscending ? 1 : -1;
            return 0;
          });
        }

        if (this.isSingle) {
          const item = items[0] || null;
          if (!item) {
            resolve({ data: null, error: { message: "Item not found" } });
          } else {
            resolve({ data: item, error: null });
          }
        } else {
          resolve({ data: items, error: null });
        }
      }, 50);
    });
  }

  then(resolve: (value: any) => void, reject?: (reason: any) => void) {
    if (this.updatedData) {
      return this.executeUpdate().then(resolve, reject);
    }
    return this.executeSelect().then(resolve, reject);
  }
}

// Local mock Supabase Auth
const auth = {
  async signUp({ email, password, options }: { email: string; password: string; options?: any }) {
    await new Promise((r) => setTimeout(r, 100));
    const users = getUsers();
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { data: { user: null }, error: { message: "An account with this email already exists." } };
    }

    const role = options?.data?.role || "Student";
    const firstName = options?.data?.first_name || "";
    const lastName = options?.data?.last_name || "";
    const newId = `usr-${Date.now()}`;

    const newUser: UserData = {
      id: newId,
      email: email.toLowerCase(),
      password,
      first_name: firstName,
      last_name: lastName,
      role,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    const authUser = {
      id: newId,
      email: newUser.email,
      user_metadata: { first_name: firstName, last_name: lastName, role },
    };

    // Automatically set session so user is ready
    setCurrentSession({ user: authUser, profile: newUser });

    return {
      data: { user: authUser, session: { user: authUser } },
      error: null,
    };
  },

  async signInWithPassword({ email, password }: { email: string; password: string }) {
    await new Promise((r) => setTimeout(r, 100));
    const users = getUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return { data: { user: null }, error: { message: "Invalid email or password." } };
    }

    if (user.password && user.password !== password) {
      return { data: { user: null }, error: { message: "Invalid password. Please try again." } };
    }

    const authUser = {
      id: user.id,
      email: user.email,
      user_metadata: { first_name: user.first_name, last_name: user.last_name, role: user.role },
    };

    setCurrentSession({ user: authUser, profile: user });

    return {
      data: { user: authUser, session: { user: authUser } },
      error: null,
    };
  },

  async getUser() {
    await new Promise((r) => setTimeout(r, 50));
    const session = getCurrentSession();
    if (!session || !session.user) {
      return { data: { user: null }, error: { message: "No active session." } };
    }
    return { data: { user: session.user }, error: null };
  },

  async getSession() {
    const session = getCurrentSession();
    return { data: { session }, error: null };
  },

  async signOut() {
    setCurrentSession(null);
    return { error: null };
  },

  onAuthStateChange(callback: (event: string, session: any) => void) {
    const session = getCurrentSession();
    callback(session ? "SIGNED_IN" : "SIGNED_OUT", session);
    return {
      data: {
        subscription: {
          unsubscribe: () => {},
        },
      },
    };
  },
};

export const supabase = {
  auth,
  from: (table: string) => new QueryBuilder(table),
};