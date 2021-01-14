# [egg-koid](https://waitingsong.github.io/koid/)


[![GitHub tag](https://img.shields.io/github/tag/waitingsong/koid.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![](https://img.shields.io/badge/lang-TypeScript-blue.svg)
[![Node CI](https://github.com/waitingsong/egg-plugin-base/workflows/ci/badge.svg)](https://github.com/waitingsong/egg-plugin-base/actions?query=workflow%3A%22ci%22)
[![codecov](https://codecov.io/gh/waitingsong/egg-plugin-base/branch/master/graph/badge.svg?token=9hyVmq1GwC)](https://codecov.io/gh/waitingsong/egg-plugin-base)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)


## 安装
```sh
npm i egg-koid
```


## 配置

### 开启插件

Edit `${app_root}/src/config/plugin.ts`:

```ts
export const koid = {
  enable: true,
  package: 'egg-koid',
}
```

### Add Configurations

```ts
/* location: ${app_root}/src/config/config.${env}.ts */

import { KoidEggConfig, genConfigRandom } from 'egg-koid'

export const koid: KoidEggConfig = {
  client: {
    debug: false,
    koidConfig: genConfigRandom(), // value or void 0
  },
}
// OR
export const koid: KoidEggConfig = {
  client: {
    debug: false,
    koidConfig: {
      dataCenter: 0,
      worker: 1,
    }
  },
}
```


## 使用

```ts
import { Plugin, Provide } from '@midwayjs/decorator'
import { Koid } from 'egg-koid'

@Provide()
export class UserService {

  @Plugin() readonly koid: Koid

}
```

## License
[MIT](LICENSE)


### Languages
- [English](README.md)
- [中文](README.zh-CN.md)

