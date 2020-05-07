# 🎭 Puppet

Natural-language web automation using [Puppeteer](https://github.com/puppeteer/puppeteer).

[![Node CI](https://img.shields.io/github/workflow/status/AnandChowdhary/puppet/Node%20CI?label=GitHub%20CI&logo=github)](https://github.com/AnandChowdhary/puppet/actions)
[![Travis CI](https://img.shields.io/travis/AnandChowdhary/puppet?label=Travis%20CI&logo=travis%20ci&logoColor=%23fff)](https://travis-ci.org/AnandChowdhary/puppet)
[![Coverage](https://coveralls.io/repos/github/AnandChowdhary/puppet/badge.svg?branch=master&v=2)](https://coveralls.io/github/AnandChowdhary/puppet?branch=master)
[![Dependencies](https://img.shields.io/librariesio/release/npm/puppet)](https://libraries.io/npm/puppet)
[![License](https://img.shields.io/npm/l/puppet)](https://github.com/AnandChowdhary/puppet/blob/master/LICENSE)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/puppet.svg)](https://snyk.io/test/npm/puppet)
[![Based on Node.ts](https://img.shields.io/badge/based%20on-node.ts-brightgreen)](https://github.com/AnandChowdhary/node.ts)
[![npm type definitions](https://img.shields.io/npm/types/puppet.svg)](https://unpkg.com/browse/puppet/dist/index.d.ts)
[![npm package](https://img.shields.io/npm/v/puppet.svg)](https://www.npmjs.com/package/puppet)
[![npm downloads](https://img.shields.io/npm/dw/puppet)](https://www.npmjs.com/package/puppet)
[![Contributors](https://img.shields.io/github/contributors/AnandChowdhary/puppet)](https://github.com/AnandChowdhary/puppet/graphs/contributors)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![npm](https://nodei.co/npm/puppet.png)](https://www.npmjs.com/package/puppet)

## ⭐️ How it works

Write in natural language (following the [Commands](#-commands) section). For example, you can create a file with the following set of commands:

**`path/to/download.puppet`**:

```txt
Go to typeform.com
Click on the login link
Type username user@example.com
Type password 3rjiw9qie2308
Click on login button
Take a screenshot
Download https://admin.typeform.com/export
Save to to report.csv
```

Then, run the command:

```bash
puppet "path/to/download.puppet"
```

## 💡 Usage

### CLI

Install the package globally from [npm](https://www.npmjs.com/package/puppet):

```bash
npm install --global puppet
```

```bash
# Local Puppet file
puppet "path/to/commands.puppet"

# Remote Puppet file
puppet https://pastebin.com/raw/AeY1MAwF

# Commands directly in CLI
puppet "open example.com" "get page HTML" "save as page.html"
```

### API

Import and use the API:

```ts
const { puppet } = require("puppet"); // Node.js
import { puppet } from "puppet"; // TypeScript/ES6

// Local Puppet file
await puppet("path/to/commands.puppet");

// Remote Puppet file
await puppet("https://pastebin.com/raw/AeY1MAwF");

// Commands directly as an array of strings
await puppet(["open example.com", "get page HTML", "save as page.html"]);
```

## 🔫 Commands

### Navigation

- `Go to example.com`
- `Navigate to URL https://example.com`
- `Go to the page on example.com`
- `Open www.example.com`

### Timers

- `Wait for 10 seconds`
- `Wait for 2 minutes`
- `Wait for 100ms`
- `Wait for navigation`

### Screenshot

- `Take a screenshot of this page`
- `Take a JPEG screenshot`
- `Full screenshot this page`
- `Make a transparent screenshot`
- `Screenshot and omit the background`

### Export page to PDF/HTML

- `Save this page as PDF`
- `Save page HTML`
- `Get the HTML`
- `Save the whole page as PDF`

### Save to file

- `Save result to path/to/file`
- `Save this screenshot to path/to/file`
- `Save this to the file path/to/file`

### Mouse events

- `Click on point [123, 456]`
- `Right click on coordinates 123, 456`
- `Move mouse cursor to points 123, 456`
- `Click on 123, 456 using middle mouse button`

## 👩‍💻 Development

Build TypeScript:

```bash
npm run build
```

Run unit tests and view coverage:

```bash
npm run test-without-reporting
```

## Related work

- [Puppeteer](https://github.com/puppeteer/puppeteer) is the headless Chrome API for Node.js
- [Archiver](https://github.com/AnandChowdhary/archiver) is the Internet Archive saver I made using Puppeteer
- [TagUI](https://github.com/kelaberetiv/TagUI) is a CLI for digital process automation (RPA)

## ✨ Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://anandchowdhary.com/?utm_source=github&utm_medium=about&utm_campaign=about-link"><img src="https://avatars3.githubusercontent.com/u/2841780?v=4" width="100px;" alt=""/><br /><sub><b>Anand Chowdhary</b></sub></a><br /><a href="#ideas-AnandChowdhary" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/AnandChowdhary/puppet/commits?author=AnandChowdhary" title="Code">💻</a> <a href="https://github.com/AnandChowdhary/puppet/commits?author=AnandChowdhary" title="Tests">⚠️</a> <a href="https://github.com/AnandChowdhary/puppet/commits?author=AnandChowdhary" title="Documentation">📖</a></td>
    <td align="center"><a href="https://gitspo.com"><img src="https://avatars2.githubusercontent.com/u/973543?v=4" width="100px;" alt=""/><br /><sub><b>Gajus Kuizinas</b></sub></a><br /><a href="#infra-gajus" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## 📄 License

- Code: [MIT](./LICENSE) © [Anand Chowdhary](https://anandchowdhary.com)
- Landing page copy: CC-BY 4.0 Puppet
- Icon: CC-BY 3.0 [Jon Trillana](https://thenounproject.com/search/?q=puppet&i=44227)
- Illustrations: CC-0 [Pablo Stanley](https://www.opendoodles.com)
