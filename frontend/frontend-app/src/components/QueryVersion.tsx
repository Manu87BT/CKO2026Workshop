// src/components/QueryVersion.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import type { User } from '@/types/user';
import { userAPI } from '@/lib/api';
import { useEffect } from 'react';

export function UserList() {
  // --------------------------------------------------------------------------------- //
  // TODO: Experiment 2, part 1 for the workshop
  // 
  // Implement data fetching with useQuery you need to handle 
  // the loading and error states as well and show a message
  // indicating: LOADING or ERROR if there
  // is any error.
  //
  // Implement also the part 2 in UserCount component below.
  // Note: Use the query ID 'users' to match both components.
  //
  // When completed, use the Network tab and Console to see
  // how many requests are made and logs printed.
  //
  // Then, navigate to the main page and return... How many calls are made?
  // Why? How many calls are made to fetch the same data?
  //
  // And... What happen if the server-state is changed? Does it update automatically?
  // How could we make it update automatically?
  // NOTE: There is no real time with TanStack Query... No black magic... but there are ways to
  // keep data fresh automatically with configuration options.
  // --------------------------------------------------------------------------------- //

  





  // ------ You don't need to modify anything below this line in this component ------ //
  // UI should work out of the box when you implement the data fetching logic
  // --------------------------------------------------------------------------------- //
  // Message to show until you implement the data fetching logic and define the variables: users, loading and error
  if (typeof users === 'undefined' && typeof isLoading === 'undefined' && typeof error === 'undefined') {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="font-semibold text-lg text-red-800">Implement the User List module with TanStack query</p>
      </div>
    );
  }


  if (isLoading) {
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
          <strong>Error:</strong> {error. message}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">User List</h2>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition font-medium"
        >
          {isFetching ? '⏳ Refreshing...' : '🔄 Refresh'}
        </button>
      </div>
      <div className="space-y-3">
        {users?. map((user) => (
          <div
            key={user. id}
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
          >
            <h3 className="font-semibold text-lg text-gray-800">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">Role: {user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function UserCount() {
  // --------------------------------------------------------------------------------- //
  // TODO: Experiment 2, part 2 for the workshop
  // Implement data fetching with useQuery, handling
  // the loading and error states as well and show a message
  // indicating: LOADING or ERROR if there is any error.
  //
  // Note: Take into account that this component and UserList
  // should share ID... That way... you will see a big benefit of
  // using TanStack Query.
  // --------------------------------------------------------------------------------- //






  // ------ You don't need to modify anything below this line in this component ------ //
  // UI should work out of the box when you implement the data fetching logic
  // --------------------------------------------------------------------------------- //
  // Message to show until you implement the data fetching logic and define the variables: users, loading and error
  if (typeof users === 'undefined' && typeof isLoading === 'undefined' && typeof error === 'undefined') {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="font-semibold text-lg text-red-800">Implement the User List module with TanStack query</p>
      </div>
    );
  }

  // This UI shows the text loading and, if loaded, the number of users
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Total Users:{' '}
        <span className="text-green-600">
          {isLoading ? 'LOADING... - this may be slow depending on the latency -' : users?.length ??  0}
        </span>
      </h2>
      <p className="text-sm text-green-600 mt-2">
        ✅ Check Network tab:  Only 1 request! 
      </p>
    </div>
  );
}

export function QueryVersion() {
  return (
    <div className="space-y-8">
      {/* Info Banner */}
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-3 text-green-800">
          ✨ TanStack Query Approach
        </h2>
        <p className="text-gray-700 mb-4">
          This version uses <code className="bg-white px-2 py-1 rounded">useQuery</code> from TanStack Query.
        </p>
        <div className="bg-white rounded p-4">
          <h3 className="font-semibold mb-2 text-green-700">✅ Benefits:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li><strong>Only 1 request</strong> (automatic deduplication)</li>
            <li>Less boilerplate code</li>
            <li>Automatic caching:  Navigate away and back → instant load from cache (example: Back to Exercise and return here)</li>
            <li>Background refetching: If configured correctly, refocus the window or after some time, triggers automatic refresh</li>
            <li>Built-in DevTools:  Click the TanStack Query icon (bottom-left)</li>
          </ul>
        </div>
      </div>

      {/* Components */}
      <UserCount />
      <UserList />
    </div>
  );
}