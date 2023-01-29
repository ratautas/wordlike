import { writable, derived } from 'svelte/store';

type ElementRef = HTMLElement;
type Refs = Record<string, ElementRef>;

export const refs = writable<Refs>({});

export function setElementRef(
  id: string,
  ref: ElementRef,
) {
  refs.update(($refs) => {
    $refs[id] = ref;

    return $refs;
  });
};

export function deleteElementRef(id: string) {
  refs.update((refs) => {
    delete refs[id];
    return refs;
  });
};