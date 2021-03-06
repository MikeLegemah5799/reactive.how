---
id: rxjs/dot
title: RxJS Pipeable operators vs. Dot-chaining
layout: default
class: post
preview_image: rxjs/explorer_preview.jpg
preview_image_alt: explorer preview
date: Monday, 26 Mar.
---

## <span class="rxjs">RxJS</span> Pipeable operators vs. Dot-chaining

📣 UPDATE: this article now takes the form of an [RxJS Explorer](/rxjs/explorer):

> [![](/img/rxjs/explorer.png)](/rxjs/explorer)
> Visit [reactive.how/rxjs/explorer](/rxjs/explorer)

> ![](/img/pipeline-operator/code-with-pipeline-operator.gif)
> Animation from [Episode 27 - JavaScript Pipeline Operator](/pipeline-operator).

## RxJS <5.5 and dot-chaining

Prior to RxJS 5.5, you were _dot-chaining_ the operators like this:

```
const stream = Observable.interval(TICK)
  .take(LENGTH)
  .map(gaussian)
```

## RxJS 5.5.\* and pipeable operators

RxJS 5.5 introduced _pipeable operators_ and `pipe`:

```
// Pull in only what you need:
import { take, map } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';

const stream = interval(TICK).pipe(
  take(LENGTH),
  map(gaussian)
)
```

> Read why this is is a better approach:
> <br/> [github.com/ReactiveX/rxjs/.../pipeable-operators.md#why](https://github.com/ReactiveX/rxjs/blob/master/doc/pipeable-operators.md#why)

You can now easily build your own operators and chain them with the RxJS ones:

```
// Create your own operator based on RxJS map:
const draw = brush =>
  map(num =>
    brush.repeat(Math.floor(num * 65))
  )

const stream = interval(TICK).pipe(
  take(LENGTH),
  map(gaussian),
  draw("•")
)
```

## RxJS 6 beta and rx-compat

RxJS 6 is coming soon. If you have a code base with dot-chaining operators, you can still use it thanks to the compatibility package `rx-compat`. It adds operators to Observable.prototype and creation methods to Observable.

## The future

### JavaScript |> pipeline operator

There is a [pipeline operator proposal](https://github.com/tc39/proposal-pipeline-operator). In particular, it allows you to write your code like this:

```
const draw = brush =>
  map(num =>
    num * 65 |> Math.floor |> brush.repeat
  )

const stream =
  interval(TICK)
  |> take(LENGTH)
  |> map(gaussian)
  |> draw("•")
```

Read my babel+prettier+ligature configuration in [Episode 27 - Pipeline Operator](/pipeline-operator) to try the pipeline operator yourself.

## A new episode every Monday

> [![](/img/reduce/icon.png){:.w350}](/reduce) <br/>[Episode 22 - **scan vs. reduce**](/reduce)

📮 You can subscribe to [the mailing list](#subscribe) to receive new episodes right inside your inbox. Or [follow me on Twitter](https://twitter.com/CedricSoulas).
