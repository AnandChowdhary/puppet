# 🎭 Puppet
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Natural-language web automation using [Puppeteer](https://github.com/puppeteer/puppeteer).

[![Node CI](https://img.shields.io/github/workflow/status/AnandChowdhary/puppet/Node%20CI?label=GitHub%20CI&logo=github)](https://github.com/AnandChowdhary/puppet/actions)
[![Travis CI](https://img.shields.io/travis/AnandChowdhary/puppet?label=Travis%20CI&logo=travis%20ci&logoColor=%23fff)](https://travis-ci.org/AnandChowdhary/puppet)
[![Coverage](https://coveralls.io/repos/github/AnandChowdhary/puppet/badge.svg?branch=master&v=2)](https://coveralls.io/github/AnandChowdhary/puppet?branch=master)
[![Dependencies](https://img.shields.io/librariesio/release/npm/puppet)](https://libraries.io/npm/puppet)
[![License](https://img.shields.io/npm/l/puppet)](https://github.com/AnandChowdhary/puppet/blob/master/LICENSE)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/puppet.svg)](https://snyk.io/test/npm/puppet)
[![Based on Node.ts](https://img.shields.io/badge/based%20on-node.ts-brightgreen)](https://github.com/AnandChowdhary/puppet)
[![npm type definitions](https://img.shields.io/npm/types/puppet.svg)](https://unpkg.com/browse/puppet/dist/index.d.ts)
[![npm package](https://img.shields.io/npm/v/puppet.svg)](https://www.npmjs.com/package/puppet)
[![npm downloads](https://img.shields.io/npm/dw/puppet)](https://www.npmjs.com/package/puppet)
[![Contributors](https://img.shields.io/github/contributors/AnandChowdhary/puppet)](https://github.com/AnandChowdhary/puppet/graphs/contributors)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![npm](https://nodei.co/npm/puppet.png)](https://www.npmjs.com/package/puppet)

## ⭐️ How it works

Write in natural language (following the [Commands](#-commands))

## 💡 Usage

Install the package from [npm](https://www.npmjs.com/package/puppet):

```bash
npm install puppet
```

Install and use the CLI:

```bash
npm install --save-global puppet
puppet "path/to/commands.puppet"
```

Import and use the API:

```ts
const { puppet } = require("puppet"); // Node.js
import { puppet } from "puppet"; // TypeScript/ES6

const { url } = await puppet("path/to/commands.puppet");
```

## 🔫 Commands

| Command example      | Description              |
| -------------------- | ------------------------ |
| `Go to example.com`  | Navigate to a URL        |
| `Wait for 5 seconds` | Wait for a specific time |

## 👩‍💻 Development

Build TypeScript:

```bash
npm run build
```

Run unit tests and view coverage:

```bash
npm run test-without-reporting
```

## 📄 License

[MIT](./LICENSE) © [Anand Chowdhary](https://anandchowdhary.com)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://anandchowdhary.com/?utm_source=github&utm_medium=about&utm_campaign=about-link"><img src="https://avatars3.githubusercontent.com/u/2841780?v=4" width="100px;" alt=""/><br /><sub><b>Anand Chowdhary</b></sub></a><br /><a href="#ideas-AnandChowdhary" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/AnandChowdhary/puppet/commits?author=AnandChowdhary" title="Code">💻</a> <a href="https://github.com/AnandChowdhary/puppet/commits?author=AnandChowdhary" title="Tests">⚠️</a> <a href="https://github.com/AnandChowdhary/puppet/commits?author=AnandChowdhary" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!