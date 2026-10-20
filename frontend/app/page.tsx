
'use client';

import { useEffect, useState } from 'react';

type Project = {
  id: number;
  name: string;
  status: string;
};

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch(
          'http://localhost:3000/api/projects',
        );

        if (!response.ok) {
          throw new Error('Failed to load projects');
        }

        const data: Project[] = await response.json();
        setProjects(data);
      } catch {
        setError('Could not load projects. Is the API running?');
      }
    }

    loadProjects();
  }, []);

  return (
    <main style={{ padding: '32px', fontFamily: 'Arial' }}>
      <h1>Business Dashboard</h1>
      <h2>Projects ({projects.length})</h2>

      {error && <p>{error}</p>}

      {projects.map((project) => (
        <article
          key={project.id}
          style={{
            padding: '12px',
            marginBottom: '12px',
            border: '1px solid #ccc',
            borderRadius: '8px',
          }}
        >
          <h3>{project.name}</h3>
          <p>Status: {project.status}</p>
        </article>
      ))}
    </main>
  );
}
