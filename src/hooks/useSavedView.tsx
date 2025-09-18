import { useCallback, useEffect, useMemo, useState } from "react";

export interface SavedView<T> {
  id: string;
  name: string;
  payload: T;
  createdAt: string;
}

export const useSavedView = <T,>(key: string) => {
  const storageKey = `ags:view:${key}`;
  const [views, setViews] = useState<SavedView<T>[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try { setViews(JSON.parse(raw)); } catch {}
    }
  }, [storageKey]);

  const persist = useCallback((next: SavedView<T>[]) => {
    setViews(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  }, [storageKey]);

  const create = useCallback((name: string, payload: T) => {
    const v: SavedView<T> = { id: crypto.randomUUID(), name, payload, createdAt: new Date().toISOString() };
    const next = [v, ...views];
    persist(next);
    return v;
  }, [views, persist]);

  const remove = useCallback((id: string) => {
    persist(views.filter(v => v.id !== id));
  }, [views, persist]);

  const update = useCallback((id: string, patch: Partial<SavedView<T>>) => {
    persist(views.map(v => v.id === id ? { ...v, ...patch } : v));
  }, [views, persist]);

  return { views, create, remove, update };
};


