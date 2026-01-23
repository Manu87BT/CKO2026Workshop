// src/components/TraditionalUpdate.tsx
'use client';

import { useState, useEffect, FormEvent } from 'react';
import type { User, UserUpdate } from '@/types/user';
import { userAPI } from '@/lib/api';

function UpdateUserForm({ 
  user, 
  onCancel, 
  onUserUpdated 
}: { 
  user: User;
  onCancel: () => void;
  onUserUpdated: () => void;
}) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    const userData: UserUpdate = {
      name,
      email,
      role,
    };

    try {
      // TODO: Exercise for the workshop 
      console.log(`🔴 Updating user ${user.id}...`);
      await userAPI.update(user.id, userData);
      console.log('✅ User updated! ');
      
      setSuccess(true);
      
      // Notify parent to refetch users
      setTimeout(() => {
        onUserUpdated();
        onCancel();
      }, 1000);
      
    } catch (err:  any) {
      console.error('❌ Error updating user:', err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">
        Edit User: {user.name}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <input
            type="text"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            min="1"
            max="150"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition font-medium"
          >
            {submitting ? '⏳ Updating...' :  '✏️ Update User'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 transition font-medium"
          >
            Cancel
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            ✅ User updated successfully! 
          </div>
        )}
      </form>
    </div>
  );
}

/*
function UserList({ refreshTrigger }: { refreshTrigger: number }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    console.log('🔴 UserList:  Fetching users...');
    setLoading(true);
    setError(null);

    userAPI
      .getAll()
      .then((data) => {
        console. log('✅ UserList:  Got users', data);
        setUsers(data);
      })
      .catch((err) => {
        console.error('❌ UserList: Error', err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refreshTrigger]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        User List ({users.length} users)
      </h2>
      <div className="space-y-3">
        {users.map((user) => (
          <div key={user.id}>
            {editingUser?.id === user. id ? (
              <UpdateUserForm
                user={user}
                onCancel={() => setEditingUser(null)}
                onUserUpdated={() => {
                  setEditingUser(null);
                  // Parent will handle refetch via refreshTrigger
                }}
              />
            ) : (
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-500">Role: {user.role}</p>
                  </div>
                  <button
                    onClick={() => setEditingUser(user)}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
                  >
                    ✏️ Edit
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
*/

export function TraditionalUpdate() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUserUpdated = () => {
    // Trigger refetch by changing the state
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="space-y-8">
      {/* Info Banner */}
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-3 text-red-800">
          📝 Traditional React Approach - UPDATE
        </h2>
        <p className="text-gray-700 mb-4">
          Updating users with traditional React patterns. 
        </p>
        <div className="bg-white rounded p-4">
          <h3 className="font-semibold mb-2 text-red-700">❌ Problems:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>Manual state management for edit mode (editingUser)</li>
            <li>Manual loading, error, and success states</li>
            <li>Need to manually trigger refetch after update</li>
            <li>Tight coupling between form and list (callbacks)</li>
            <li>Need to track which user is being edited</li>
            <li>Complex state coordination</li>
          </ul>
        </div>
      </div>

      {/*<UserList refreshTrigger={refreshTrigger} onUserUpdated={handleUserUpdated} />*/}
    </div>
  );
}