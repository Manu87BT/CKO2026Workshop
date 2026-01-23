// src/components/TraditionalCreate.tsx
'use client';

import { useState, useEffect, FormEvent } from 'react';
import type { User, UserCreate } from '@/types/user';
import { userAPI } from '@/lib/api';
import { UserList } from '@/components/TraditionalVersion';

function CreateUserForm({ onUserCreated }: { onUserCreated: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e:  FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    const userData: UserCreate = {
      name,
      email,
      role
    };

    

    try {
      console.log('🔴 Creating user ' + userData.name + " - " + userData.email + " - " + userData.role);

      // --------------------------------------------------------------------------------- //
      // TODO: Experiment 3 part 1 for the workshop
      // Implement user creation handling loading, success and error states.
      //
      // Note: The data to create the user is already available in userData variable.
      //
      // When completed, check the following:
      // 1. Open the Network tab and Console to see the request and logs printed.
      // 2. Create a new user using the form.
      // 3. After creating a user, check if the user list updates automatically or not.
      //
      // Question: Is the UserList updated automatically after creating a user? Stale? Why?
      // --------------------------------------------------------------------------------- //

      
      
      // Uncomment this line for clarity when the user is created so you can see it in the console
      // console.log('✅ User created! ');

      // ------ You don't need to modify anything below this line in this component ------ //
      // UI should work out of the box when you implement the data fetching logic
      // --------------------------------------------------------------------------------- //
      setName('');
      setEmail('');
      setRole('');
      
    } catch (err:  any) {
      console.error('❌ Error creating user:', err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
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
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            onChange={(e) => setRole(e.target.value)}
            required
            min="1"
            max="150"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Unknown role"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition font-medium"
        >
          {submitting ? '⏳ Creating...' : '➕ Create User'}
        </button>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            ✅ User created successfully! 
          </div>
        )}
      </form>
    </div>
  );
}


export function TraditionalCreate() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUserCreated = () => {
    console.log('🔄 User created, should trigger refetch in UserList... This will redraw ALL the component');
    // Trigger refetch by changing the state
    // This line of code is commented to illustrate the problem with traditional React approach
    // this approach requires manual intervention to refresh the user list, in this case, by
    // updating a dummy state variable that contains no useful information other than
    // triggering a re-render and refetch in the UserList component.
    // setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-8">
      {/* Info Banner */}
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-3 text-red-800">
          📝 Traditional React Approach - CREATE
        </h2>
        <p className="text-gray-700 mb-4">
          Creating a user with traditional React patterns. 
        </p>
        <div className="bg-white rounded p-4">
          <h3 className="font-semibold mb-2 text-red-700">❌ Problems:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>Manual state management for form (name, email, age)</li>
            <li>Manual loading, error, and success states</li>
            <li>Need to manually trigger refetch after creation</li>
            <li>Lots of boilerplate code</li>
            <li>Form and list are tightly coupled (refreshTrigger prop)</li>
            <li>Even if this operation is VERY simple, something like: await userAPI.create(userData); this can cause server state inconsistencies</li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <CreateUserForm onUserCreated={handleUserCreated} />
        <UserList/>
      </div>
    </div>
  );
}