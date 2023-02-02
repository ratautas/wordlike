import { writable } from 'svelte/store';

type ElementRef = HTMLElement;
type Refs = Record<string, ElementRef>;

export const refStore = writable<Refs>({});

export function refAction(elementRef: ElementRef, id: string) {
  refStore.update(($refStore) => {
    $refStore[id] = elementRef;

    return $refStore;
  });

  return {
    destroy() {
      refStore.update(($refStore) => {
        delete $refStore[id];
        return $refStore;
      });
    },
  };
};