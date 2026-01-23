import type { User, UserCreate, UserUpdate } from '@/types/user';

// TODO: Adapt the API base URL as needed

// Local address to connect with the server. Use this address if you decide to run the server locally
// export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Remote address to connect with the server running in RTI infrastructure. This is the one recommended for the workshop
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://pers-grhino001.sjcvirt.rti.com:8000';

// Helper function with error handling
async function fetchAPI<T>(endpoint: string, options?:  RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ... options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json();
}


// TIP: This is a simple API client for user management

// API functions
export const userAPI = {
  getAll:  (): Promise<User[]> => {
    console.log('🔴 userAPI: Fetching all users...');
    return fetchAPI<User[]>('/users');
  },

  getById: (id: number): Promise<User> => {
    console.log(`🔴 userAPI: Fetching user with id ${id}...`);
    return fetchAPI<User>(`/users/${id}`);
  },

  create: (data: UserCreate): Promise<User> => {
    console.log('🔴 userAPI: Creating a new user...');
    return fetchAPI<User>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: (id: number, data:  UserUpdate): Promise<User> => {
    console.log(`🔴 userAPI: Updating user with id ${id}...`);
    return fetchAPI<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: (id: number): Promise<void> => {
    console.log(`🔴 userAPI: Deleting user with id ${id}...`);
    return fetchAPI<void>(`/users/${id}`, {
      method: 'DELETE',
    });
  },
};