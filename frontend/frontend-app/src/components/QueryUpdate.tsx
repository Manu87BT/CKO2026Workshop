'use client';

import { useState, FormEvent } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { User, UserUpdate } from '@/types/user';
import { userAPI } from '@/lib/api';

function UpdateUserForm({ 
  user, 
  onCancel 
}: { 
  user:  User;
  onCancel:  () => void;
}) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['updateUser', user.id],
    mutationFn: (userData: UserUpdate) => {
      console.log(`🟢 useMutation: Updating user ${user.id}...`);
      return userAPI.update(user. id, userData);
    },
    onSuccess: (updatedUser) => {
      console.log('✅ useMutation: User updated! ', updatedUser);
      
      // Invalidate queries to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
      
      // Close edit form
      setTimeout(() => onCancel(), 500);
    },
    onError: (error:  any) => {
      console.error('❌ useMutation:  Error', error);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const userData: UserUpdate = {
      name,
      email,
      role,
    };

    mutation.mutate(userData);
  };

  return (
    <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">
        Edit User:  {user.name}
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
            disabled={mutation.isPending}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
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
            disabled={mutation.isPending}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
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
            disabled={mutation.isPending}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition font-medium"
          >
            {mutation. isPending ? '⏳ Updating...' : '✏️ Update User'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={mutation.isPending}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 transition font-medium"
          >
            Cancel
          </button>
        </div>

        {mutation.isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            <strong>Error:</strong> {mutation.error. message}
          </div>
        )}

        {mutation.isSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            ✅ User updated successfully! 
          </div>
        )}
      </form>
    </div>
  );
}

// I accepted to use UserList here as we are enabling editing directly from the list,
// I am not adding a edit button to the original one to do not have a variable that
// indicates if it is editable to do not overcomplicate the first exercise, but this
// should be in the original user list component.
/*
function UserList() {
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => {
      console.log('🟢 useQuery:  Fetching users...');
      return userAPI.getAll();
    },
  });

  if (isLoading) {
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
          <strong>Error:</strong> {error.message}
        </div>
      </div>
    );
  }

  const editingUser = users?. find(u => u.id === editingUserId);

  return (
    <div className="space-y-6">
      {editingUser && (
        <UpdateUserForm
          user={editingUser}
          onCancel={() => setEditingUserId(null)}
        />
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          User List ({users?. length ??  0} users)
        </h2>
        <div className="space-y-3">
          {users?.map((user) => (
            <div
              key={user.id}
              className={`border border-gray-200 rounded-lg p-4 transition ${
                editingUserId === user.id ? 'bg-green-50 border-green-300' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-500">Role: {user.role}</p>
                </div>
                <button
                  onClick={() => setEditingUserId(user.id)}
                  disabled={editingUserId !== null}
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                >
                  ✏️ Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
*/

export function QueryUpdate() {
  return (
    <div className="space-y-8">
      {/* Info Banner */}
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-3 text-green-800">
          ✨ TanStack Query Approach - UPDATE
        </h2>
        <p className="text-gray-700 mb-4">
          Updating users with <code className="bg-white px-2 py-1 rounded">useMutation</code>.
        </p>
        <div className="bg-white rounded p-4">
          <h3 className="font-semibold mb-2 text-green-700">✅ Benefits:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>Automatic loading states (isPending, isSuccess, isError)</li>
            <li>Automatic cache invalidation after success</li>
            <li>Form and list are decoupled (no callbacks needed)</li>
            <li>Less boilerplate code</li>
            <li>Built-in error handling</li>
            <li>Mutation tracking in DevTools</li>
            <li>Easy to add optimistic updates later</li>
          </ul>
        </div>
      </div>


      {/*<UserList />*/}
    </div>
  );
}