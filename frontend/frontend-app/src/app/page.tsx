'use client';

import { useState } from 'react';
import { TraditionalVersion } from '@/components/TraditionalVersion';
import { QueryVersion } from '@/components/QueryVersion';
import { TraditionalCreate } from '@/components/TraditionalCreate';
import { QueryCreate } from '@/components/QueryCreate';
import { TraditionalUpdate } from '@/components/TraditionalUpdate';
import { QueryUpdate } from '@/components/QueryUpdate';
import { TraditionalDelete } from '@/components/TraditionalDelete';
import { QueryDelete } from '@/components/QueryDelete';

type Exercise = 'read' | 'create' | 'update' | 'delete';
type Version = 'traditional' | 'query';

export default function Home() {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [version, setVersion] = useState<Version | null>(null);

  if (!exercise || !version) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TanStack Query Workshop
            </h1>
            <p className="text-xl text-gray-600">
              Congratulations!! You've set up the frontend and (hopefully) backend successfully.
            </p>
            <br/>
            <p className="text-xl text-gray-600">
              Choose one part of the workshop to continue:
            </p>
          </div>

          {/* Exercise Selection */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Exercise 1: READ */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
              <div className="text-4xl mb-3">📖</div>
              <h3 className="text-2xl font-bold mb-3">Exercise 1: Read Data</h3>
              <p className="text-gray-600 mb-4">
                Fetch and display users from the server
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setExercise('read');
                    setVersion('traditional');
                  }}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
                >
                  📝 Traditional
                </button>
                <button
                  onClick={() => {
                    setExercise('read');
                    setVersion('query');
                  }}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium"
                >
                  ✨ TanStack Query
                </button>
              </div>
            </div>

            {/* Exercise 2: CREATE */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
              <div className="text-4xl mb-3">➕</div>
              <h3 className="text-2xl font-bold mb-3">Exercise 2: Create User</h3>
              <p className="text-gray-600 mb-4">
                Add a new user with a form
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setExercise('create');
                    setVersion('traditional');
                  }}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
                >
                  📝 Traditional
                </button>
                <button
                  onClick={() => {
                    setExercise('create');
                    setVersion('query');
                  }}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium"
                >
                  ✨ TanStack Query
                </button>
              </div>
            </div>

            {/* Exercise 3: UPDATE */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
              <div className="text-4xl mb-3">✏️</div>
              <h3 className="text-2xl font-bold mb-3">Exercise 3: Update User</h3>
              <p className="text-gray-600 mb-4">
                Edit existing user data
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setExercise('update');
                    setVersion('traditional');
                  }}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
                >
                  📝 Traditional
                </button>
                <button
                  onClick={() => {
                    setExercise('update');
                    setVersion('query');
                  }}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium"
                >
                  ✨ TanStack Query
                </button>
              </div>
            </div>

            {/* Exercise 4: DELETE */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
              <div className="text-4xl mb-3">🗑️</div>
              <h3 className="text-2xl font-bold mb-3">Exercise 4: Delete + Optimistic Updates</h3>
              <p className="text-gray-600 mb-4">
                Delete users with instant UI feedback
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setExercise('delete');
                    setVersion('traditional');
                  }}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
                >
                  📝 Traditional
                </button>
                <button
                  onClick={() => {
                    setExercise('delete');
                    setVersion('query');
                  }}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium"
                >
                  ✨ TanStack Query
                </button>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-3 text-yellow-900">
              ⚙️ Setup Check
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>
                ✅ Frontend: <code className="bg-white px-2 py-1 rounded font-mono text-sm">http://localhost:3000</code>
              </p>
              <p>
                ✅ Backend: <code className="bg-white px-2 py-1 rounded font-mono text-sm">http://localhost:5000</code>
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            Exercise {exercise === 'read' ? '1' : exercise === 'create' ? '2' : exercise === 'update' ? '3' : '4'}:{' '}
            {exercise === 'read' && 'Read Data'}
            {exercise === 'create' && 'Create User'}
            {exercise === 'update' && 'Update User'}
            {exercise === 'delete' && 'Delete + Optimistic Updates'}
          </h1>
          <div className="flex items-center gap-4">
            <select
              value={version}
              onChange={(e) => setVersion(e.target.value as Version)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold cursor-pointer hover:border-blue-500 transition"
            >
              <option value="traditional">📝 Traditional React</option>
              <option value="query">✨ TanStack Query</option>
            </select>
            <button
              onClick={() => {
                setExercise(null);
                setVersion(null);
              }}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              ← Back to Exercises
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        {exercise === 'read' && version === 'traditional' && <TraditionalVersion />}
        {exercise === 'read' && version === 'query' && <QueryVersion />}
        {exercise === 'create' && version === 'traditional' && <TraditionalCreate />}
        {exercise === 'create' && version === 'query' && <QueryCreate />}
        {exercise === 'update' && version === 'traditional' && <TraditionalUpdate />}
        {exercise === 'update' && version === 'query' && <QueryUpdate />}
        {exercise === 'delete' && version === 'traditional' && <TraditionalDelete />}
        {exercise === 'delete' && version === 'query' && <QueryDelete />}
      </div>
    </div>
  );
}