---
title: Under the hood of Zustand
slug: under-the-hood-of-zustand
featured: false
draft: false
tags:
  - react
pubDatetime: 2024-04-24
---

- react@18
- zustand@5.0.0-alpha.6

## Introduction to Zustand

- a state management solution for react
- immutable state model
- using selectors for rendering optimizations (透過 selectors 優化更新粒度)
  - selector is a function that accepts state as an argument and returns derived data from the state
- zustand store is a external store
  - can be access outside of react
  - observer pattern (notifies listeners of any state changes)
- using the `useSyncExternalStore` hook to integrate with zustand store
  - triggering the component to re-render when the snapshot changes

## With a typical example

```js
import { create } from 'zustand'

const useCountStore = create((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
}))

// binding components
function Count() {
  const count = useCountStore((state) => state.count)
  return (
    // ...
  )
}

function Double() {
  const double = useCountStore((state) => state.count * 2)
  return (
    // ...
  )
}
```

inside the `create` method

1. creating a zustand store (vanilla store)
1. return a currying hook

```js
function create(createState) {
  // ...
  const api = createStore(createState);
  const useBoundStore = selector => {
    return useSyncExternalStore(
      api.subscribe, // add callback to zustand store
      () => selector(api.getState()), // get snapshot
      () => selector(api.getInitialState()) // get server snapshot
    );
  };
  // ...
  return useBoundStore;
}
```

inside the `useSyncExternalStore` hook

- calculating the latest snapshot
- control the subscription of a component to the zustand store through the `useEffect` hook

```js
function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
  // ...
  const [{ inst }, forceUpdate] = useState({ inst: { value, getSnapshot } });
  useEffect(() => {
    // ...
    const handleStoreChange = () => {
      if (checkIfSnapshotChanged(inst)) {
        forceUpdate({ inst });
      }
    };
    // Subscribe to the store and return a clean-up function.
    return subscribe(handleStoreChange);
  }, [subscribe]);
  // ...
}
```

![zustand-with-a-typical-example](/zustand-with-a-typical-example.png)

## Reference

- [Zustand](https://github.com/pmndrs/zustand)
- [Zustand - Comparison](https://docs.pmnd.rs/zustand/getting-started/comparison)
- [react.dev - useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)
- [useSyncExternalStoreShimClient](https://github.com/facebook/react/blob/main/packages/use-sync-external-store/src/useSyncExternalStoreShimClient.js)
