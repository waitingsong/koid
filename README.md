# Koid

Koid generator yields k-ordered, conflict-free ids in a distributed environment, 
based on [flake-idgen](https://github.com/T-PWK/flake-idgen)


[![GitHub tag](https://img.shields.io/github/tag/waitingsong/koid.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![](https://img.shields.io/badge/lang-TypeScript-blue.svg)]()
[![ci](https://github.com/waitingsong/koid/workflows/ci/badge.svg)](https://github.com/waitingsong/koid/actions?query=workflow%3A%22ci%22)
[![codecov](https://codecov.io/gh/waitingsong/koid/branch/master/graph/badge.svg?token=xaYSfbo3Xw)](https://codecov.io/gh/waitingsong/koid)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)


## Install

```sh
npm i koid
```


## Koid Numbers Format

The Koid is made up of: `timestamp`, `dataCenter`, `worker` and `counter`. Examples in the following table: 

| Timestamp   | Datacenter | Worker  | Counter | Koid               |
| ----------- | ---------- | ------- | ------- | ------------------ |
| 0x8c20543b0 | 0b00000    | 0b00000 | 0x000   | 0x02308150ec000000 |
| 0x8c20543b1 | 0b00000    | 0b00000 | 0x000   | 0x02308150ec400000 |
| 0x8c20543b1 | 0b00000    | 0b00000 | 0x001   | 0x02308150ec400001 |
| 0x8c20543b1 | 0b00000    | 0b00000 | 0x002   | 0x02308150ec400002 |
| 0x8c20543b1 | 0b00000    | 0b00000 | 0x003   | 0x02308150ec400003 |
| 0x8c20c0335 | 0b00011    | 0b00001 | 0x000   | 0x02308300cd461000 |
| 0x8c20c0335 | 0b00011    | 0b00001 | 0x001   | 0x02308300cd461001 |

As you can see, each Koid is 64 bits long, consisting of:
* `timestamp`, a 42 bit long number of milliseconds elapsed since 1 January 1970 00:00:00 UTC 
* `dataCenter`, a 5 bit long datacenter identifier. It can take up to 32 unique values (including 0)
* `worker`, a 5 bit long worker identifier. It can take up to 32 unique values (including 0)
* `counter`, a 12 bit long counter of ids in the same millisecond. It can take up to 4096 unique values. 

Breakdown of bits for an id e.g. `5828128208445124608` (counter is `0`, dataCenter is `7` and worker `3`) is as follows:
```
 010100001110000110101011101110100001000111 00111 00011 000000000000
                                                       |------------| 12 bit counter
                                                 |-----|               5 bit worker
                                           |-----|                     5 bit datacenter
                                           |----- -----|              10 bit generator identifier
|------------------------------------------|                          42 bit timestamp
```


## Usage

Koid Generator returns 8 byte long node [Buffer](http://nodejs.org/api/buffer.html) objects with its bytes representing 64 bit long id. Note that the number is stored in Big Endian format i.e. the most significant byte of the number is stored in the smallest address given and the least significant byte is stored in the largest.

Koid generator instance has one getter `next` returning generated id.


```ts
import { KoidFactory } from 'koid'

const koid = KoidFactory()

console.log(koid.next)
console.log(koid.next)
console.log(koid.next)
```

It would give something like:
```
<Buffer 50 dd d5 99 01 c0 00 00>
<Buffer 50 dd d5 99 02 80 00 00>
<Buffer 50 dd d5 99 02 80 00 01>
```




## Initialization

```sh
npm run repo:init
```


## Update

```sh
npm run bootstrap
```


## Test

- Use `npm run lint` to check code style.
- Use `npm run test` to run unit test.


## Note

- Run `npm run clean` before `npm run build`, if any file under typescript outDir folder was deleted manually.
- Default publish registry is `NPM`, configurated in file `lerna.json`


## Packages

| Package  | Version                | Dependencies                 | DevDependencies                |
| -------- | ---------------------- | ---------------------------- | ------------------------------ |
| [`koid`] | [![main-svg]][main-ch] | [![main-d-svg]][main-d-link] | [![main-dd-svg]][main-dd-link] |


## License
[MIT](LICENSE)


### Languages
- [English](README.md)
- [中文](README.zh-CN.md)


[`koid`]: https://github.com/waitingsong/koid/tree/master/packages/koid
[main-svg]: https://img.shields.io/npm/v/koid.svg?maxAge=86400
[main-ch]: https://github.com/waitingsong/koid/tree/master/packages/koid/CHANGELOG.md
[main-d-svg]: https://david-dm.org/waitingsong/koid.svg?path=packages/koid
[main-d-link]: https://david-dm.org/waitingsong/koid.svg?path=packages/koid
[main-dd-svg]: https://david-dm.org/waitingsong/koid/dev-status.svg?path=packages/koid
[main-dd-link]: https://david-dm.org/waitingsong/koid?path=packages/koid#info=devDependencies

