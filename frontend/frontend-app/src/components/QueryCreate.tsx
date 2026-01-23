// src/components/QueryCreate.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { User, UserCreate } from '@/types/user';
import { userAPI } from '@/lib/api';
import { UserCount, UserList } from '@/components/QueryVersion';

function CreateUserForm() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const queryClient = useQueryClient();

  // --------------------------------------------------------------------------------- //
  // TODO: Experiment 4 of the workshop
  // Implement user creation with useMutation.
  // Make sure to handle loading, success and error states.
  //
  // Also, invalidate the users query on success to refetch the user list automatically.
  //
  // Remember which is the component that acts as brain to invalidate the queries!
  //
  // When completed, check the following:
  // 1. Open the Network tab and Console to see the mutation request and logs printed.
  // 2. Create a new user using the form.
  // 3. After creating a user, check that the user list updates automatically without
  //    needing to pass any props or callbacks.
  // 4. Check the TanStack Query DevTools to see the mutation and its states.
  // --------------------------------------------------------------------------------- //



  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const userData: UserCreate = {
      name,
      email,
      role,
    };

    mutation.mutate(userData);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New User</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target. value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus: ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="John Doe"
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
            placeholder="john@example.com"
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
            onChange={(e) => setRole(e.target. value)}
            required
            min="1"
            max="150"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Unknown role"
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition font-medium"
        >
          {mutation.isPending ? '⏳ Creating...' : '➕ Create User'}
        </button>

        {mutation.isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            <strong>Error:</strong> {mutation.error. message}
          </div>
        )}

        {mutation.isSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            ✅ User created successfully! 
          </div>
        )}
      </form>
    </div>
  );
}

export function QueryCreate() {
  return (
    <div className="space-y-8">
      {/* Info Banner */}
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-3 text-green-800">
          ✨ TanStack Query Approach - CREATE
        </h2>
        <p className="text-gray-700 mb-4">
          Creating a user with <code className="bg-white px-2 py-1 rounded">useMutation</code>. 
        </p>
        <div className="bg-white rounded p-4">
          <h3 className="font-semibold mb-2 text-green-700">✅ Benefits:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>Automatic loading states (<code>isPending</code>, <code>isSuccess</code>, <code>isError</code>)</li>
            <li>Automatic cache invalidation after success</li>
            <li>Form and list are decoupled (no props needed)</li>
            <li>Less boilerplate code</li>
            <li>Built-in error handling</li>
            <li>Check TanStack Query DevTools to see the mutation! </li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <CreateUserForm />
        <div>
            <UserCount />
            <UserList />
        </div>
      </div>
    </div>
  );
}