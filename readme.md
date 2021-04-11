# @cprecioso/most-from-async-iterable

Honestly, just does what it says on the tin.

## Installation

```sh
# If you use npm
$ npm add @cprecioso/most-from-async-iterable
# If you use yarn
$ yarn add @cprecioso/most-from-async-iterable
```

## Usage

```js
// If you're using ES modules (no bundling or transpiling required)
import fromAsyncIterable from "@cprecioso/most-from-async-iterable"

// Or if you're working with CommonJS (e.g.: older Node.js)
const fromAsyncIterable = require("@cprecioso/most-from-async-iterable").default

const countToTen = async function* () {
  for (let i = 0; i < 10; i++) {
    await new Promise((fulfill) => setTimeout(fulfill, 1000))
    yield i + 1
  }
}

// Here's your @most/core stream!
const stream = fromAsyncIterable(countToTen())
```
