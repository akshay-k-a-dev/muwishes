import { writable } from 'svelte/store';

function createRouteStore() {
  const { subscribe, set } = writable<string>(window.location.pathname);

  // Initialize route handling
  if (typeof window !== 'undefined') {
    window.addEventListener('popstate', () => {
      set(window.location.pathname);
    });
  }

  return {
    subscribe,
    navigate: (path: string) => {
      window.history.pushState({}, '', path);
      set(path);
    }
  };
}

export const currentRoute = createRouteStore();