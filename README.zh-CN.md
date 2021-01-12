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

