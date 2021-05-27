# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 4.1.2 (2021-05-27)


### Bug Fixes

* **koid:** isValidBigintStr() process ([9c15851](https://github.com/waitingsong/koid/commit/9c158514a30ef15c0551ff6b3003380d06fc8140))





## 4.1.1 (2021-05-13)


### Bug Fixes

* **koid:** next() time assignment ([8768206](https://github.com/waitingsong/koid/commit/8768206c175335cc9e045564428c784618e19ed1))





# 4.1.0 (2021-05-13)


### Features

* **koid:** add optional parameter of genConfigRandom(epoch) ([649296f](https://github.com/waitingsong/koid/commit/649296f151a56e5edf92d1dcf318c5d7b3fbb998))





# 4.0.0 (2021-05-13)


### Features

* **koid:** wait until next available id as default ([dcb5ef1](https://github.com/waitingsong/koid/commit/dcb5ef1e2d30d77bc76258347183a96b3e152fcf))





# 3.4.0 (2021-04-28)

**Note:** Version bump only for package koid





## 3.3.1 (2021-04-15)

**Note:** Version bump only for package koid





# 3.3.0 (2021-03-12)

**Note:** Version bump only for package koid





## [3.2.1](/compare/v3.2.0...v3.2.1) (2021-01-28)


### Bug Fixes

* **koid:** exports waitTillNextMillisecond() 0a89445





# [3.2.0](/compare/v3.1.0...v3.2.0) (2021-01-28)


### Features

* **koid:** add waitTillNextMillisecond() f5dfd7f





# [3.1.0](/compare/v3.0.0...v3.1.0) (2021-01-26)


### Features

* **koid:** add epoch parameter of retrieveFromId(id, epoch = 0) 8efabca





# [3.0.0](/compare/v2.1.2...v3.0.0) (2021-01-17)


### Features

* **koid:** breaking change return type of genConfigRandom() 84c2541





## [2.1.2](/compare/v2.1.1...v2.1.2) (2021-01-17)


### Bug Fixes

* **egg-koid:** missing assignment within parseOptions() d69ef00





## [2.1.1](/compare/v2.1.0...v2.1.1) (2021-01-17)


### Bug Fixes

* **koid:** parse overflow of dataCenter and worker 99c4635





# [2.1.0](/compare/v2.0.0...v2.1.0) (2021-01-17)


### Features

* **koid:** add 'hex' property of ReturnType<retrieveFromId()> 31bb032





# [2.0.0](/compare/v1.4.0...v2.0.0) (2021-01-17)

**Note:** Version bump only for package koid





# [1.4.0](/compare/v1.3.0...v1.4.0) (2021-01-17)


### Features

* **koid:** add koid:retrieveFromId() 4c1e3ee





# [1.3.0](/compare/v1.2.0...v1.3.0) (2021-01-17)


### Features

* **koid:** retrieveFromId() accept bigint string like "6755455236955799552" f7147c3





# [1.2.0](/compare/v1.1.0...v1.2.0) (2021-01-16)


### Features

* **koid:** generate bitint with koid.nextBigint 7da4954





# [1.1.0](/compare/v1.0.0...v1.1.0) (2021-01-16)


### Features

* **koid:** add retrieveFromId() b9e607d





# [1.0.0](/compare/v0.5.0...v1.0.0) (2021-01-14)

**Note:** Version bump only for package koid





# [0.5.0](/compare/v0.4.0...v0.5.0) (2021-01-14)


### Features

* **egg-koid:** egg-plugin "egg-koid" 9e35380





# [0.4.0](/compare/v0.3.0...v0.4.0) (2021-01-12)


### Features

* **koid:** add KoidMsg.ClockBack e121e0c





# [0.3.0](/compare/v0.2.0...v0.3.0) (2021-01-12)


### Features

* **koid:** export enum KoidMsg d46c3b6





# [0.2.0](/compare/v0.1.0...v0.2.0) (2021-01-12)


### Bug Fixes

* **koid:** parseConfigId() 1dcacf0


### Features

* **koid:** add config getter to retrieve Options from instance ea66b32
* **koid:** parameter of KoidFactory() can be optional 011f923
* **koid:** prefer using ConfigDc if both id and dataCenter passing 0ab10a9





# 0.1.0 (2021-01-12)


### Features

* add koid generator 5cb8493
