import { interval } from "rxjs";
import { map, take } from "rxjs/operators";

import { TICK, LENGTH, gaussian } from "./base";

/**
 * The JavaScript pipeline operator proposal is
 * at an early stage and may never get added!
 */
const draw = brush => stream =>
  stream  // it replaces the pipe utility function
  |> map(
    num =>
      num * 65
      |> Math.floor  // it enables function chaining
      |> brush.repeat
  )
  |> take(LENGTH);

const stream =
  interval(TICK)
  |> map(gaussian)  // it replaces the pipe method
  |> draw("•");

stream.subscribe(console.log);