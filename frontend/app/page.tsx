
'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';

type Project = {
  id: number;
  name: string;
  status: 'Planned' | 'In Progress' | 'Completed';
};

const API_URL = 'http://localhost:3001/api/projects';

const STATUSES: Project['status'][] = [
  'Planned',
  'In Progress',
  'Completed',
];

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState('');
  const [status, setStatus] =
    useState<Project['status']>('Planned');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProjects = useCallback(async () => {
    try {
      setError('');

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('案件一覧を取得できませんでした。');
      }

      const data: Project[] = await response.json();
      setProjects(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'API サーバーに接続できません。',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProjects();
  }, [loadProjects]);

  async function createProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setError('');

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), status }),
      });

      if (!response.ok) {
        throw new Error('案件を登録できませんでした。');
      }

      setName('');
      setStatus('Planned');
      await loadProjects();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '登録に失敗しました。',
      );
    }
  }

  async function updateStatus(
    project: Project,
    nextStatus: Project['status'],
  ) {
    try {
      setError('');

      const response = await fetch(`${API_URL}/${project.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!response.ok) {
        throw new Error('案件の状態を更新できませんでした。');
      }

      await loadProjects();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '更新に失敗しました。',
      );
    }
  }

  async function deleteProject(id: number) {
    if (!window.confirm('この案件を削除しますか？')) {
      return;
    }

    try {
      setError('');

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('案件を削除できませんでした。');
      }

      await loadProjects();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '削除に失敗しました。',
      );
    }
  }

  return (
    <main
      style={{
        maxWidth: 900,
        margin: '40px auto',
        padding: 24,
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1>業務管理ダッシュボード</h1>
      <p>案件情報を PostgreSQL で管理します。</p>

      {error && (
        <p role="alert" style={{ color: 'crimson' }}>
          {error}
        </p>
      )}

      <section style={{ marginTop: 32, marginBottom: 40 }}>
        <h2>新規案件登録</h2>

        <form
          onSubmit={createProject}
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="案件名を入力"
            maxLength={100}
            required
            style={{ padding: 10, flex: '1 1 220px' }}
          />

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as Project['status'])
            }
            style={{ padding: 10 }}
          >
            {STATUSES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <button type="submit" style={{ padding: '10px 18px' }}>
            登録
          </button>
        </form>
      </section>

      <section>
        <h2>案件一覧（{projects.length}件）</h2>

        {loading ? (
          <p>読み込み中...</p>
        ) : projects.length === 0 ? (
          <p>案件はまだ登録されていません。</p>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {projects.map((project) => (
              <article
                key={project.id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: 8,
                  padding: 20,
                }}
              >
                <h3>{project.name}</h3>
                <p>案件番号：{project.id}</p>

                <label>
                  進捗状況：
                  {' '}
                  <select
                    value={project.status}
                    onChange={(event) =>
                      void updateStatus(
                        project,
                        event.target.value as Project['status'],
                      )
                    }
                  >
                    {STATUSES.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <div style={{ marginTop: 16 }}>
                  <button
                    type="button"
                    onClick={() => void deleteProject(project.id)}
                  >
                    削除
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
