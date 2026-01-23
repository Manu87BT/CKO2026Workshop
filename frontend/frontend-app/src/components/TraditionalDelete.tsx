'use client';

import { useState, useEffect } from 'react';
import type { User } from '@/types/user';
import { userAPI } from '@/lib/api';

/*
function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    console.log('🔴 UserList: Fetching users...');
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
        setError(err. message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = async (userId: number) => {
    if (! confirm('Are you sure you want to delete this user?')) {
      return;
    }

    setDeletingId(userId);
    console.log(`🔴 Deleting user ${userId}...`);

    try {

      await userAPI.delete(userId);
      console.log(`✅ User ${userId} deleted! `);
      
      // PROBLEM: We need to manually refetch to update the UI
      // The user is still visible until refetch completes. Otherwise,
      // the UI will not update until we refetch manually.
      // When working with default react state, we need to manually update the state
      // to reflect the deletion immediately.

      //console.log('🔄 Refetching users...');
      //const updatedUsers = await userAPI.getAll();
      //setUsers(updatedUsers);
      
    } catch (err:  any) {
      console.error(`❌ Error deleting user ${userId}: `, err);
      alert(`Error: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

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
      
      {users.length === 0 ?  (
        <div className="text-center py-8 text-gray-500">
          No users found. Create some users first!
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className={`border border-gray-200 rounded-lg p-4 transition ${
                deletingId === user. id ? 'opacity-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{user. name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-500">Role: {user.role}</p>
                </div>
                <button
                  onClick={() => handleDelete(user.id)}
                  disabled={deletingId === user.id}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                >
                  {deletingId === user.id ?  '⏳ Deleting...' : '🗑️ Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
*/

export function TraditionalDelete() {

  return (
    <div className="space-y-8">
      {/* Info Banner */}
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-3 text-red-800">
          📝 Traditional React Approach - DELETE
        </h2>
        <p className="text-gray-700 mb-4">
          Deleting users with traditional React patterns. 
        </p>
        <div className="bg-white rounded p-4">
          <h3 className="font-semibold mb-2 text-red-700">❌ Problems:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>User disappears ONLY after server responds (slow, visible delay)</li>
            <li>Need to manually refetch after delete</li>
            <li>No optimistic updates - UI feels sluggish</li>
            <li>If delete fails, no automatic rollback</li>
            <li>Manual loading state per user (deletingId)</li>
            <li>Watch the Network tab - you'll see the delay! </li>
          </ul>
        </div>
      </div>


      {/*<UserList />*/}
    </div>
  );
}