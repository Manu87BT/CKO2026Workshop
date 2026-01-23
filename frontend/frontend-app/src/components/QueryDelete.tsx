// src/components/QueryDelete. tsx
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { User } from '@/types/user';
import { userAPI } from '@/lib/api';

/*
function UserList() {
  const queryClient = useQueryClient();

  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => {
      console.log('🟢 useQuery: Fetching users...');
      return userAPI.getAll();
    },
  });

  const deleteMutation = useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: (userId: number) => {
      console.log(`🟢 useMutation: Deleting user ${userId}...`);
      return userAPI.delete(userId);
    },

    // ✨ OPTIMISTIC UPDATE:  Before the request even starts
    onMutate: async (deletedUserId) => {
      console.log(`⚡ onMutate: Optimistically removing user ${deletedUserId} from UI`);

      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['users'] });

      // Snapshot the previous value (for rollback if needed)
      const previousUsers = queryClient.getQueryData<User[]>(['users']);

      // Optimistically update to the new value
      queryClient.setQueryData<User[]>(['users'], (old) => {
        return old?.filter((user) => user.id !== deletedUserId) ??  [];
      });

      console.log('💾 Previous users saved for potential rollback:', previousUsers);

      // Return a context object with the snapshotted value
      return { previousUsers };
    },

    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, deletedUserId, context) => {
      console.error(`❌ onError: Delete failed!  Rolling back...`, err);
      
      if (context?. previousUsers) {
        queryClient.setQueryData(['users'], context.previousUsers);
        console.log('🔄 Rollback complete - users restored');
      }

      alert(`Error deleting user:  ${err.message}`);
    },

    // Always refetch after error or success to sync with server
    onSettled: (data, error, deletedUserId) => {
      console.log(`✅ onSettled:  Invalidating queries to sync with server`);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },

    onSuccess: (data, deletedUserId) => {
      console.log(`✅ onSuccess: User ${deletedUserId} deleted successfully! `);
    },
  });

  const handleDelete = (userId: number, userName:  string) => {
    if (!confirm(`Are you sure you want to delete ${userName}?`)) {
      return;
    }

    deleteMutation.mutate(userId);
  };

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
          <strong>Error:</strong> {error. message}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        User List ({users?. length ??  0} users)
      </h2>
      
      {deleteMutation.isPending && (
        <div className="mb-4 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
          <div className="flex items-center gap-2">
            <span className="animate-spin">⏳</span>
            <span>Deleting user...  (Check DevTools to see optimistic update! )</span>
          </div>
        </div>
      )}

      {users?. length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No users found.  Create some users first!
        </div>
      ) : (
        <div className="space-y-3">
          {users?. map((user) => (
            <div
              key={user. id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-500">Age: {user.age}</p>
                </div>
                <button
                  onClick={() => handleDelete(user.id, user.name)}
                  disabled={deleteMutation.isPending}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                >
                  🗑️ Delete
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

export function QueryDelete() {
  return (
    <div className="space-y-8">
      {/* Info Banner */}
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-3 text-green-800">
          ✨ TanStack Query Approach - DELETE with Optimistic Updates
        </h2>
        <p className="text-gray-700 mb-4">
          Deleting users with <code className="bg-white px-2 py-1 rounded">useMutation</code> and optimistic updates.
        </p>
        <div className="bg-white rounded p-4">
          <h3 className="font-semibold mb-2 text-green-700">✅ Benefits:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>⚡ User disappears INSTANTLY (before server responds)</li>
            <li>🔄 Automatic rollback if delete fails</li>
            <li>💾 Previous state is saved and restored on error</li>
            <li>✨ UI feels incredibly fast and responsive</li>
            <li>🎯 Automatic cache sync after mutation</li>
            <li>📊 Full mutation lifecycle in DevTools</li>
          </ul>
        </div>

        <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-4">
          <h4 className="font-semibold text-blue-800 mb-2">🧪 Try This:</h4>
          <ol className="list-decimal list-inside space-y-1 text-sm text-blue-900">
            <li>Open DevTools → Network tab (throttle to "Slow 3G")</li>
            <li>Click "Delete" on a user</li>
            <li>Notice:  User disappears IMMEDIATELY</li>
            <li>Watch console: See the optimistic update logs</li>
            <li>If you want to test rollback:  Stop the backend and try to delete</li>
          </ol>
        </div>
      </div>

    
      {/*<UserList />*/}
    </div>
  );
}