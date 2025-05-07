/*
  3326 - BEM style string
  -------
  by Songhn (@songhn233) #medium #template-literal #union #tuple

  ### Question

  The Block, Element, Modifier methodology (BEM) is a popular naming convention for classes in CSS.

  For example, the block component would be represented as `btn`, element that depends upon the block would be represented as `btn__price`, modifier that changes the style of the block would be represented as `btn--big` or `btn__price--warning`.

  Implement `BEM<B, E, M>` which generate string union from these three parameters. Where `B` is a string literal, `E` and `M` are string arrays (can be empty).

  > View on GitHub: https://tsch.js.org/3326
*/

/* _____________ Your Code Here _____________ */

type BX<B extends string, X extends string[], J extends string = '__'> =
  X extends [infer H extends string, ... infer R extends string[]]
    ? `${B}${J}${H}` | BX<B, R, J>
    : never

type BEM0<B extends string, E extends string[], M extends string[]> =
  E extends []
    ? BX<B, M, '--'>
    : M extends []
      ? BX<B, E>
      : BX<BX<B, E>, M, '--'>

type Join<T extends string[], U extends string> =
  T[number] extends never ? '' : `${U}${T[number]}`

type BEM<B extends string, E extends string[], M extends string[]> =
  `${B}${Join<E, '__'>}${Join<M, '--'>}`

type Test = BEM<'btn', ['price'], []>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<Equal<BEM<'btn', ['price'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success' >>,
  Expect<Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large' >>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3326/answer
  > View solutions: https://tsch.js.org/3326/solutions
  > More Challenges: https://tsch.js.org
*/
