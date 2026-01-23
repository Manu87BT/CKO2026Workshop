// src/components/TraditionalVersion.tsx
'use client';

import { useState, useEffect } from 'react';
import type { User } from '@/types/user';
import { userAPI } from '@/lib/api';

export function UserList() {
  // --------------------------------------------------------------------------------- //
  // TODO: Experiment 1, part 1 for the workshop
  // 
  // Implement data fetching with useState and useEffect, handling
  // the loading and error states as well and show a message
  // indicating: LOADING or ERROR if there is any error. 
  // (I will force errors from the backend)
  //
  // You must implement both UserList and UserCount components
  //
  // NOTE: UI already implemented below, you only need to handle
  // the data fetching logic
  //
  // When completed, use the Network tab and Console to see
  // the duplicate requests and logs.
  //
  // Then, navigate to the main page and return... How many calls are made?
  // Why? How many calls are made to fetch the same data? How could we reduce that number?
  //
  // NOTE: Call the variables users, loading and error to match the existing code below.
  // --------------------------------------------------------------------------------- //




  // ------ You don't need to modify anything below this line in this component ------ //
  // UI should work out of the box when you implement the data fetching logic
  // --------------------------------------------------------------------------------- //

  // Message to show until you implement the data fetching logic and define the variables: users, loading and error
  if (typeof users === 'undefined' || typeof loading === 'undefined' || typeof error === 'undefined') {
    console.error('Required variables are not defined');
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="font-semibold text-lg text-red-800">Implement the User List module with traditional react</p>
      </div>
    );
  }

  // UI when loading is true
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

  // UI when there is an error
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  // UI when data is loaded
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
  // --------------------------------------------------------------------------------- //
  // TODO: Experiment 1, part 2 for the workshop
  //
  // Implement data fetching with useState and useEffect, handling
  // the loading and error states as well and show a message
  // indicating: LOADING or ERROR if there is any error.
  // (I will force errors from the backend)
  // NOTE (The implementation of this should be almost the same as UserList)
  // --------------------------------------------------------------------------------- //




  // ------ You don't need to modify anything below this line in this component ------ //
  // UI should work out of the box when you implement the data fetching logic
  // --------------------------------------------------------------------------------- //
  // Message to show until you implement the data fetching logic and define the variables: users, loading and error
  if (typeof users === 'undefined' || typeof loading === 'undefined' || typeof error === 'undefined') {
    console.error('Required variables are not defined');
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="font-semibold text-lg text-red-800">Implement the User Count module with traditional react</p>
      </div>
    );
  }

  // UI to be shown. In this case, for simplicity, we only handle the loading state and data to show when data is available
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
            <h3 className="font-semibold mb-2 text-blue-700">✅ Your Task:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>Open the file <strong>TraditionalVersion.tsx</strong> and locate the function <strong>UserList</strong></li>
            <li>Implement (using useState and useEffect) the logic required to set users, loading, and error states</li>
            <li>Locate the function <strong>UserCount</strong> and implement the same logic</li>
            <li>When it works, open DevTools → Network tab and check what is happening with the backend</li>
            <li>Navigate back to home page and open this view again. What is happening?</li>
          </ul>
        </div>
        
      </div>

      {/* Components */}
      <UserCount />
      <UserList />
    </div>
  );
}