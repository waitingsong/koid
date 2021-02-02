# Koid


适用于分布式环境的偏排序（K-ordered）雪花（SnowFlake）序列号生成器，
基于项目 [flake-idgen](https://github.com/T-PWK/flake-idgen)


[![GitHub tag](https://img.shields.io/github/tag/waitingsong/koid.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![](https://img.shields.io/badge/lang-TypeScript-blue.svg)]()
[![ci](https://github.com/waitingsong/koid/workflows/ci/badge.svg)](https://github.com/waitingsong/koid/actions?query=workflow%3A%22ci%22)
[![codecov](https://codecov.io/gh/waitingsong/koid/branch/master/graph/badge.svg?token=xaYSfbo3Xw)](https://codecov.io/gh/waitingsong/koid)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)


## 安装

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
                                                       | ------------ | 12 bit counter |
                                                       | ------------ |5 bit worker
                                           |-----|                     5 bit datacenter
                                           | ----- ----- | 10 bit generator identifier |
                                           | ----------- |42 bit timestamp
```


## 使用

Koid Generator returns 8 byte long node [Buffer](http://nodejs.org/api/buffer.html) objects with its bytes representing 64 bit long id. Note that the number is stored in Big Endian format i.e. the most significant byte of the number is stored in the smallest address given and the least significant byte is stored in the largest.

Koid generator instance has one getter `next` returning generated id.


```ts
import { KoidFactory } from 'koid'

const koid = KoidFactory()

console.log(koid.next)
console.log(koid.next)
console.log(koid.next)
console.log(koid.nextBigint)
```

It would give something like:
```
<Buffer 50 dd d5 99 01 c0 00 00>
<Buffer 50 dd d5 99 02 80 00 00>
<Buffer 50 dd d5 99 02 80 00 01>
5827048346035945474n
```


### 计数器溢出
Koid generator can generate up to 4096 unique identifiers within a millisecond. When generator tries to generate more than 4096 identifiers within a millisecond, **an error is thrown**.

### 设置参数
Koid generator constructor takes optional parameter (generator configuration options) with the following properties:
- `dataCenter` (5 bit) - datacenter identifier. It can have values from 0 to 31.
- `worker` (5 bit) - worker identifier. It can have values from 0 to 31.
- `id` (10 bit) - generator identifier. It can have values from 0 to 1023. It can be provided instead of `dataCenter` and `worker` identifiers.
- `epoch` - number used to reduce value of a generated timestamp. Note that this number should not exceed number of milliseconds elapsed since 1 January 1970 00:00:00 UTC. It can be used to generate _smaller_ ids.

Example of using `dataCenter` and `worker` identifiers:
```ts
import { KoidFactory } from 'koid'

const koid = KoidFactory()
const koid2 = KoidFactory({ dataCenter: 9, worker: 7 })

console.info(koid.next);
console.info(koid2.next);
```

It would give something like:
```
<Buffer 50 dd da 8f 43 40 00 00>
<Buffer 50 dd da 8f 43 d2 70 00>
```


### 属性
Koid generator has config getter that can be read from a generator instance:
- `dataCenter` - returns worker number used for generator creation
- `worker` - returns worker number used for generator creation


```ts
import { KoidFactory } from 'koid'

const koid = KoidFactory({ id: 34 })

console.info(koid.dataCenter);   // 1
console.info(koid.worker);       // 2
```

### 时钟回拨
From time to time Node.js clock may move backward. 
In most cases it is only a few millisecond. 
However, as the generator relies on current timestamp, 
it won't be able to generate conflict-free identifiers (i.e. without duplicates) until the clock catches up with the last timestamp value. 
In case of clock move backward an error is thrown.

### 格式化

Koid generator returns Node.js Buffer representing 64-bit number for the sake of future extensions or returned buffer modifications. Node Buffer can also be very easily converted to string format 

```ts
import { KoidFactory } from 'koid'

const koid = KoidFactory()

const buf: Buffer = koid.next
const id = buf.readBigInt64BE() // also koid.nextBigint
const hexId = buf.toString('hex')

```

It would give something like:
```ts
<Buffer 5d c2 cd d1 f4 fd 30 00>
6756188692651257856n // bigint
5dc2cdd1f4fd3000 // hex string
```

<br>

## 初始化项目

```sh
npm run repo:init
```


## 更新依赖

```sh
npm run bootstrap
```


## 测试

- Use `npm run lint` to check code style.
- Use `npm run test` to run unit test.


## 注意

- Run `npm run clean` before `npm run build`, if any file under typescript outDir folder was deleted manually.
- Default publish registry is `NPM`, configurated in file `lerna.json`


## Packages

| Package      | Version                | Dependencies                 | DevDependencies                |
| ------------ | ---------------------- | ---------------------------- | ------------------------------ |
| [`koid`]     | [![main-svg]][main-ch] | [![main-d-svg]][main-d-link] | [![main-dd-svg]][main-dd-link] |
| [`egg-koid`] | [![egg-svg]][egg-ch]   | [![egg-d-svg]][egg-d-link]   | [![egg-dd-svg]][egg-dd-link]   |


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

[`egg-koid`]: https://github.com/waitingsong/koid/tree/master/packages/egg-koid
[egg-svg]: https://img.shields.io/npm/v/egg-koid.svg?cacheSeconds=86400
[egg-ch]: https://github.com/waitingsong/koid/tree/master/packages/egg-koid/CHANGELOG.md
[egg-d-svg]: https://david-dm.org/waitingsong/koid.svg?path=packages/egg-koid
[egg-d-link]: https://david-dm.org/waitingsong/koid.svg?path=packages/egg-koid
[egg-dd-svg]: https://david-dm.org/waitingsong/koid/dev-status.svg?path=packages/egg-koid
[egg-dd-link]: https://david-dm.org/waitingsong/koid?path=packages/egg-koid#info=devDependencies

