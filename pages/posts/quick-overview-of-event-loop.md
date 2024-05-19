---
title: Quick overview of the JavaScript event loop
tag: javascript, event-loop, microtasks, macrotasks
date: 2021-05-28
---

![event loop](/event-loop.png)

javascript 處理非同步任務的機制，其組成包含：

- heap
- call stack
- web api
- event loop
- microtask queue
- macrotask queue

## Heap

javascript 用來存放複雜類型資料的空間，例如：物件或陣列引用類型的值

在 function 內部建立物件、陣列等引用類型的資料，也會放至 heap 中，其對應的 reference 會存在 execution context 內

這些 reference 會在 function 執行結束後被 gc 處理，藉此釋放不需要的記憶體空間

## Call stack

用於追蹤執行中的 function 及 execution context

## Web API

在瀏覽器中提供處理耗時、非同步任務接口，其任務會被先放至 event queue

event queue 主要分為兩種類型

- microtask queue (優先級較高的任務)
- macrotask queue (每個 macrotask 執行完畢後，會優先處理 microtask queue 內的所有任務，直到 microtask queue 為空)

### Microtask enqueued by

- `MutationObserver`
- `process.nextTick`
- `queueMicrotasks`
- `Promise.then`, `Promise.catch`, `Promise.finally`
- etc.

### Macrotask enququed by

- `setTimeout`, `setInterval`
- `requestAnimationFrame`
- user interaction event callback
- etc.

## Event Loop

event loop 會持續監聽 event queue 上的任務，當 call stack 空閒時，會將待處理的任務放入 call stack

## Processing model

簡易版的流程

1. 從 macrotask queue 中取出一個 task，將其放入 call stack 中執行
1. 直到 call stack 為空或遇到一個 microtask
1. 從 microtask queue 中，取出所有 tasks，依次將它們放入 call stack 執行，直到 microtask queue 為空
1. 如果都沒有任務，event loop 將等待新的事件加入 event queue 中
1. 重複上述步驟

## Others

- 每一輪的 event loop 不一定會觸發 rendering
- 1fps 內多次 dom 更新不會馬上反應

## Reference

- [stackoverflow - Difference between microtask and macrotask within an event loop context](https://stackoverflow.com/questions/25915634/difference-between-microtask-and-macrotask-within-an-event-loop-context)
- [Event loop: microtasks and macrotasks](https://javascript.info/event-loop)
- [Microtask and Macrotask: A Hands-on Approach](https://blog.bitsrc.io/microtask-and-macrotask-a-hands-on-approach-5d77050e2168)
- [Using microtasks in JavaScript with queueMicrotask()](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide)
- [Event Loop 運行機制解析 - 瀏覽器篇](https://yu-jack.github.io/2020/02/03/javascript-runtime-event-loop-browser/)
- [WHATWG - Event Loop](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)
