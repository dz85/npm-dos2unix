oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g dos2unix.js
$ dos2unix COMMAND
running command...
$ dos2unix (--version)
dos2unix.js/0.0.4 darwin-arm64 node-v18.14.1
$ dos2unix --help [COMMAND]
USAGE
  $ dos2unix COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`dos2unix [GLOB]`](#dos2unix-glob)
* [`dos2unix help [COMMANDS]`](#dos2unix-help-commands)
* [`dos2unix plugins`](#dos2unix-plugins)
* [`dos2unix plugins:install PLUGIN...`](#dos2unix-pluginsinstall-plugin)
* [`dos2unix plugins:inspect PLUGIN...`](#dos2unix-pluginsinspect-plugin)
* [`dos2unix plugins:install PLUGIN...`](#dos2unix-pluginsinstall-plugin-1)
* [`dos2unix plugins:link PLUGIN`](#dos2unix-pluginslink-plugin)
* [`dos2unix plugins:uninstall PLUGIN...`](#dos2unix-pluginsuninstall-plugin)
* [`dos2unix plugins:uninstall PLUGIN...`](#dos2unix-pluginsuninstall-plugin-1)
* [`dos2unix plugins:uninstall PLUGIN...`](#dos2unix-pluginsuninstall-plugin-2)
* [`dos2unix plugins:update`](#dos2unix-pluginsupdate)

## `dos2unix [GLOB]`

A dos2UniX-like command-line tool written in Nodejs

```
USAGE
  $ dos2unix [GLOB]

ARGUMENTS
  GLOB  [default: **/*] the glob pattern to be scanned

EXAMPLES
  $ dos2unix **/*.js
```

_See code: [dist/index.ts](https://github.com/dz85/npm-dos2unix/blob/v0.0.4/dist/index.ts)_

## `dos2unix help [COMMANDS]`

Display help for dos2unix.

```
USAGE
  $ dos2unix help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for dos2unix.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.9/src/commands/help.ts)_

## `dos2unix plugins`

List installed plugins.

```
USAGE
  $ dos2unix plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ dos2unix plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.3/src/commands/plugins/index.ts)_

## `dos2unix plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ dos2unix plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ dos2unix plugins:add

EXAMPLES
  $ dos2unix plugins:install myplugin 

  $ dos2unix plugins:install https://github.com/someuser/someplugin

  $ dos2unix plugins:install someuser/someplugin
```

## `dos2unix plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ dos2unix plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ dos2unix plugins:inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.3/src/commands/plugins/inspect.ts)_

## `dos2unix plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ dos2unix plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ dos2unix plugins:add

EXAMPLES
  $ dos2unix plugins:install myplugin 

  $ dos2unix plugins:install https://github.com/someuser/someplugin

  $ dos2unix plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.3/src/commands/plugins/install.ts)_

## `dos2unix plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ dos2unix plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ dos2unix plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.3/src/commands/plugins/link.ts)_

## `dos2unix plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ dos2unix plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ dos2unix plugins:unlink
  $ dos2unix plugins:remove
```

## `dos2unix plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ dos2unix plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ dos2unix plugins:unlink
  $ dos2unix plugins:remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.3/src/commands/plugins/uninstall.ts)_

## `dos2unix plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ dos2unix plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ dos2unix plugins:unlink
  $ dos2unix plugins:remove
```

## `dos2unix plugins:update`

Update installed plugins.

```
USAGE
  $ dos2unix plugins:update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.3/src/commands/plugins/update.ts)_
<!-- commandsstop -->
