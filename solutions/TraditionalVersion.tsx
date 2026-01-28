// src/components/TraditionalVersion.tsx
'use client';

import { useState, useEffect } from 'react';
import type { User } from '@/types/user';
import { userAPI } from '@/lib/api';

function UserList() {
  // TODO: Implement data fetching with useState and useEffect
  // you need to handle the loading and error states as well
  // and show a message indicating: LOADING or ERROR if there
  // is any error (NOTE: UI already implemented below)

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔴 UserList:  Fetching users...');
    setLoading(true);
    setError(null);

    userAPI
      .getAll()
      .then((data) => {
        console. log('✅ UserList: Got users', data);
        setUsers(data);
      })
      .catch((err) => {
        console.error('❌ UserList: Error', err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="font-semibold text-lg text-gray-800">LOADING...</p>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-20 bg-gray-200 rounded"></div>
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
      <h2 className="text-2xl font-bold mb-4 text-gray-800">User List</h2>
      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
          >
            <h3 className="font-semibold text-lg text-gray-800">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">Role: {user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function UserCount() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🔴 UserCount: Fetching users.. .');
    setLoading(true);

    userAPI
      . getAll()
      .then((data) => {
        console. log('✅ UserCount:  Got users', data);
        setUsers(data);
      })
      .catch((err) => {
        console.error('❌ UserCount: Error', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      
      <h2 className="text-2xl font-bold text-gray-800">
        Total Users:{' '}
        <span className="text-blue-600">
          {loading ? 'LOADING ... - this may be slow depending on the latency -' : users.length}
        </span>
      </h2>
      <p className="text-sm text-gray-500 mt-2">
        Check the console and Network tab 👀
      </p>
    </div>
  );
}

export function TraditionalVersion() {
  return (
    <div className="space-y-8">
      {/* Info Banner */}
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-3 text-red-800">
          📝 Traditional React Approach
        </h2>
        <p className="text-gray-700 mb-4">
          This version uses <code className="bg-white px-2 py-1 rounded">useState</code> and{' '}
          <code className="bg-white px-2 py-1 rounded">useEffect</code> for data fetching.
        </p>
        <div className="bg-white rounded p-4">
          <h3 className="font-semibold mb-2 text-red-700">❌ Problems to notice:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>Open DevTools → Network tab:  <strong>2 requests</strong> to the same endpoint</li>
            <li>Open Console:  See duplicate fetch logs</li>
            <li>Lots of boilerplate code (useState, useEffect, error handling)</li>
            <li>No caching:  Navigate away and back → refetches everything</li>
            <li>Each component manages its own state independently</li>
          </ul>
        </div>
      </div>

      {/* Components */}
      <UserCount />
      <UserList />
    </div>
  );
}