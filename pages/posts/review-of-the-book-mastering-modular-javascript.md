---
title: 《深入學習 JavaScript 模組化設計》
date: 2022-09-02
tag: javascript, book-review
---

主要依照自己的經驗紀錄心得，跟書中提到的內容有些許出入。

## Rules of Good Code

- scalable
- readable and maintainable

### Scalable

這裡指的是當負載上升，程式運算效能的變化，通常我們會考慮

- data structure
- time complexity
- space complexity

### Readable and Maintainable

模組化設計，如何提升程式碼的可讀性以及可維護性，過去 javascript 沒有原生的模組系統，早期會透過 IIFE 及 clousure 避免私有變數外溢，es6 後加入了 esm 作為原生的模組語法。

在 esm 中，每一個檔案都是一個模組，有自己的作用域 (scope)，模組的作用域可以幫助我們

- 相較於單一環境，能夠減少命名衝突
- 擁有私有變數及方法，避免外溢至全域環境
- 依照單一職責原則 (single responsibility principle) 劃分函式或模組，提升可維護性

模組中公開暴露的變數及方法稱為介面，透過介面可以隱藏實作的複雜性，以常見的 modal component 為例，我們可以透過公開，且有語意的 props，隱藏對 a11y 功能實作的複雜性

```jsx
<Modal
  lockFocus
  closeOnEsc
  closeOnOverlayClick
  blockScrollOnMount
/>
```

介面的好處：

- 隱藏弱小的實作，當介面保持不變，往後都可以將背後的程式碼重構成更好的實作
- 寫出更容易測試的程式碼，單元測試上關注介面的輸入、輸出，而不是執行細節。在 [Testing Library Guiding Principles](https://testing-library.com/docs/guiding-principles) 中，也有提及相似的概念
- 增加可讀性，隱藏局部複雜性，每一層可以關注在自身的業務邏輯。以上面 modal component 為例，當我們在專案有用到 modal component 時，因為透過介面隱藏了 ui 背後的操作邏輯，所以我們會關注在商業邏輯的組合上。

## 模組化的原則

模組化設計是著重在寫出可讀、可維護、可測試程式碼的部分，下面會紀錄書中提到的概念。

### 單一職責原則 (SRP)

- 一個組件發生的變更原因 (職責)，應該來自同一個業務關聯方，避免業務耦合導致的維護問題
- 隨著規模以及業務關聯方的成長，需要透過 SRP 將負責不同業務的組件單純化

### 介面優先

- 遵循 api 優先，將焦點放在介面上，正確的介面可以讓人輕鬆使用該模組最常使用的案例，易於測試外，也能保持擴充的彈性
- api 保持一致，就可以換掉劣質的程式

何謂正確的介面，我認為這部分會因團隊而異。實際開發前，或許先找團隊成員進行 design review，團隊中一定有人更擅長技術，有人熟悉公司的商業邏輯，能夠針對實際需求及開發規範，權衡介面的彈性或是簡單性，何者需要是公開的 api，在之中取得共識才是最重要的。

### 找出正確抽象

太快或是盲目地遵循 DRY 原則 (don't repeat yourself)，很容易導致錯誤的抽象。

真實世界裡，程式碼是用來解決商業需求，隨著產品的迭代，過去 legacy code 裡的抽象，塞滿了不同的參數、條件判斷，這可能是因為當初有些看起來相似的情境，所以先做一層抽象，隨著產品成長以及商業模式改變，發現過去的抽象不足的部分，或是業務性質開始不同，但因為時程的關係，沒有時間給你重構，所以只好先加上新的 if else 檔一下，隨著團隊成員來來去去，下一個接手的人繼續參照著前人的智慧，最終這個抽象也演變成老子改不動的狀況。

DRY 的意義是協助寫出簡潔的程式，如果比較簡潔的程式比以前更難理解，那麼就先試著重複，當需求越來越明朗，或是有更好的模式出現，抽象可以明顯帶來好處時再去考慮。

這部分推薦可以參考 [The Wet Codebase](https://overreacted.io/the-wet-codebase/)

### 一致 (Consistent)

- 相同的 api 外觀，使用者可以直覺地推斷如何使用 e.g. `Array.filter`, `Array.map`, etc...
- 一致性的程式碼風格，可以增加可讀性，減少 code review 的衝突
- 一致性的命名、結構，可以減少意外，讓程式保持一致

書中提到的一致，我認為這部分比較偏向團隊的開發規範，這部分我認為 [GitLab - Frontend Development Guidelines](https://docs.gitlab.com/ee/development/fe_guide/) 是很好的參考範本

### 彈性 (Resilient)

彈性不一定是必須的，彈性會增加內部程式碼的複雜度，在設計 api 時也要不斷權衡彈性與簡單性。

書中有提到，可以透過多載 (overload) 的方式，維持簡單性也能兼顧彈性，以 axios 為例

```js
// send a get request
axios('/user/12345');

// send a post request
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  },
});
```

如果你設計的函式參數超過 3 個以上，使用物件是一個不錯的選擇，除了不受參數順序影響外，物件屬性還可以描述該參數的用途。

### 明確性 (Unambigous)

函式的回傳型態，不應該受到輸入參數的影響，例如 `fetch` 始終會回傳一個 promise object，不會因為受到參數影響，與其他使用案例不一致。

### 簡單性 (Simple)

介面沒必要一開始就迎合所有可能的使用案例，應該先針對當下的需求製作一個簡單的解決方案，實作使用者還不需要的功能，可能會付出增加複雜性、難以維護，以及花費更多開發時間等等的代價。

如果 api 沒有要面對廣泛的使用者，可能只有自己的團隊會使用，維持精簡可以避免使用者以多種方式完成相同的工作，降低不確定性。

保持介面的簡單性，讓每個參數都有合理的預設值，以 `fetch` 為例，method 的預設值 `GET`，通常是最有可能被使用的 HTTP 動詞，隨著案例變複雜，也只要稍微調整 options 內的參數

```js
fetch('/api/users');

fetch('/api/users', {
  method: 'DELETE',
  headers: {
    Authorization: 'Bearer ....'
  },
});
```

### 更小的介面 (Tiny)

盡可能維持小的介面

- 更少的測試、文件
- 減少使用者誤用導致的 bug
- 選擇較少，更容易使用

## 型塑內在

### 避免過度嵌套

當程式碼出現一系列的嵌套，很有可能已經出現流程控制與商業邏輯混在一起的情況，如果可以將邏輯隔離到各自的層級裡面，流程會變得更明確。

### 特徵糾纏與緊耦合

隨著模組成長，它也越容易錯誤地將不同的功能混在一起，要減少糾纏的風險，在設計時可以注意可以元件化，或以其他方式隔離可以清楚描述的關注點。

書中沒有提供相關程式碼範例，但我第一個直覺想到的是 redux 的分層，例如

- store：存放狀態
- reducer：接收行為，狀態變更
- action：描述行為

### 擷取函式

根據條件定義變數時，可能會出現的情況

```js
// ...
let website = null;

if (user.details) {
  website = user.details.website;
} else if (user.website) {
  website = user.websites;
}
// ...
```

將條件賦值以函式重構

- 使用 `const`，可以確定這個變數的引用不會改變
- 建立一個函式，將高階的描述保留在上面，將細節放在後面，有助於先大致了解核心功能，不會受到過多細節而分心
- 在函式內使用 early return，可以在程式碼的前幾行內得知，提前回傳的案例以及優先順序

```js
// ...
const website = getUserWebsite(user);
// ...

function getUserWebsite(user) {
  if (user.details) {
    return user.details.website;
  }

  if (user.website) {
    return user.website;
  }

  return null;
};
```

### 組合與繼承

- 繼承：將程式互相堆疊來直向擴展，以便利用既有的功能，同時並加入其他功能，或是改變既有的行為。
- 組合：在同一個抽象層，加入相關或不相關的程式橫向擴展。

## Reference

- [Testing Library Guiding Principles](https://testing-library.com/docs/guiding-principles)
- [The Wet Codebase](https://overreacted.io/the-wet-codebase/)
- [GitLab - Frontend Development Guidelines](https://docs.gitlab.com/ee/development/fe_guide/)
