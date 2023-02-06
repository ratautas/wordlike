import { writable } from 'svelte/store';

enum RefTypesEnum {
  elementRef = "elementRef",
  planeRef = "planeRef",
  overshootLeftRef = "overshootLeftRef",
  overshootRightRef = "overshootRightRef",
};

type RefKeyType = keyof typeof RefTypesEnum;
type RefActionParams = { id: string; type: RefKeyType };
type RefsRefType = Record<RefTypesEnum, HTMLElement>;
type RefsRecordType = Record<string, RefsRefType>;

export const refStore = writable<RefsRecordType>({});

export function refAction(ref: HTMLElement, { id, type }: RefActionParams) {
  refStore.update(($refStore) => {
    if (!$refStore[id]) {
      $refStore[id] = {
        [type]: ref,
      };
    }

    $refStore[id][type] = ref;
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