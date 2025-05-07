/*
  4260 - AllCombinations
  -------
  by 蛭子屋双六 (@sugoroku-y) #medium #template-literal #infer #union

  ### Question

  Implement type ```AllCombinations<S>``` that return all combinations of strings which use characters from ```S``` at most once.

  For example:

  ```ts
  type AllCombinations_ABC = AllCombinations<'ABC'>;
  // should be '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'
  ```

  > View on GitHub: https://tsch.js.org/4260
*/

/* _____________ Your Code Here _____________ */

// 1
type IsNever<T> = [T] extends [never] ? true : false

type StringToUnion<T extends string> =
  T extends `${infer Head}${infer Rest}`
    ? Head | StringToUnion<Rest>
    : never

type AllCombinations0<S extends string, Acc extends string = StringToUnion<S>> =
  IsNever<Acc> extends true
    ? ''
    : '' | {
      [Combo in Acc]: `${Combo}${AllCombinations0<never, Exclude<Acc, Combo>>}`
    }[Acc]

// 2
type Combination1<A extends string, B extends string> =
  | A
  | B
  | `${A}${B}`
  | `${B}${A}`

type UnionCombination<
    A extends string,
    B extends string = A,
  > = A extends B
    ? Combination1<A, UnionCombination<Exclude<B, A>>>
    : never

type AllCombinations<S extends string> =
    '' | UnionCombination<StringToUnion<S>>

// 3
type AllCombinations2<S extends string, Acc extends string = ''> =
S extends `${infer H}${infer T}`
  ?
  | `${H}${AllCombinations2<`${Acc}${T}`>}`
  | AllCombinations2<T, `${Acc}${H}`>
  : ''

type Test = AllCombinations2<'AB'>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<AllCombinations<''>, ''>>,
  Expect<Equal<AllCombinations<'A'>, '' | 'A'>>,
  Expect<Equal<AllCombinations<'AB'>, '' | 'A' | 'B' | 'AB' | 'BA'>>,
  Expect<Equal<AllCombinations<'ABC'>, ''
  | 'A' | 'B' | 'C'
  | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB'
  | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'>
  >,
  Expect<Equal<AllCombinations<'ABCD'>, '' | 'A' | 'B' | 'C' | 'D' | 'AB' | 'AC' | 'AD' | 'BA' | 'BC' | 'BD' | 'CA' | 'CB' | 'CD' | 'DA' | 'DB' | 'DC' | 'ABC' | 'ABD' | 'ACB' | 'ACD' | 'ADB' | 'ADC' | 'BAC' | 'BAD' | 'BCA' | 'BCD' | 'BDA' | 'BDC' | 'CAB' | 'CAD' | 'CBA' | 'CBD' | 'CDA' | 'CDB' | 'DAB' | 'DAC' | 'DBA' | 'DBC' | 'DCA' | 'DCB' | 'ABCD' | 'ABDC' | 'ACBD' | 'ACDB' | 'ADBC' | 'ADCB' | 'BACD' | 'BADC' | 'BCAD' | 'BCDA' | 'BDAC' | 'BDCA' | 'CABD' | 'CADB' | 'CBAD' | 'CBDA' | 'CDAB' | 'CDBA' | 'DABC' | 'DACB' | 'DBAC' | 'DBCA' | 'DCAB' | 'DCBA'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4260/answer
  > View solutions: https://tsch.js.org/4260/solutions
  > More Challenges: https://tsch.js.org
*/
