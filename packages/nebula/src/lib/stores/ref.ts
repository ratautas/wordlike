import { writable } from 'svelte/store';

type ElementRef = HTMLElement;
type Refs = Record<string, ElementRef>;

export const refs = writable<Refs>({});

export function ref(elementRef: ElementRef, id: string) {
    refs.update(($refs) => {
        $refs[id] = elementRef;

        return $refs;
    });

    return {
        destroy() {
            refs.update(($refs) => {
                delete $refs[id];
                return $refs;
            });
        },
    };
};