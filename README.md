> [!WARNING]
> This project is no longer maintained and the code quality is no longer up to my standards.

# Py93

Py93 is a Python 3 compiler and shell (based on [Brython](https://brython.info)) for [Windows 93](https://windows93.net/).

<!--- ![Experimental branch status](https://img.shields.io/badge/experimental_branch_status-active-informational) -->
<!--- ![Experimental branch status](https://img.shields.io/badge/experimental_branch_status-testing-informational) -->
<!---
![Experimental branch status](https://img.shields.io/badge/experimental_branch_status-getting_ready_to_merge-brightgreen)
-->

![License: MPL-2.0](https://img.shields.io/badge/license-MPL--2.0-informational)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/hasha2982/Py93?label=latest%20release)
![GitHub last commit](https://img.shields.io/github/last-commit/hasha2982/Py93)
![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hasha2982/Py93?logo=codefactor)

<!--- code redactor (based on [CodeMirror](https://codemirror.net)),  -->

<!---
## Installing

To install Py93 to your Windows 93 computer, just create `Py93` folder in `/a/`, then paste this repository to `Py93` folder. See `installguide.md` for more detailed guide.
-->

<!---
> **Warning:** This branch is experimental and things may work not as they should work.
-->

## Quick-start guide

1. Download release archive from the [releases page](https://github.com/hasha2982/Py93/releases) and extract it to your computer.
2. Create `Py93` folder in `/a/`.
3. Move the extracted archive from your computer to `/a/Py93/`.
4. Move `helper.js` from `/a/Py93` to `/a/boot/`.
5. Reboot.

See `installguide.md` for more detailed guide.

## Features

* Compiler
* Shell
* CLI application

## How to use CLI app

You can launch Py93 shell or compiler from Windows 93 terminal.

To see help message, write the following in the terminal:

```
py93
```

or

```
py93 help
```

> You can also use `py93 h` instead of `py93 help`.

## Developers

*You are a developer?* You can make your Brython package installable via Py93 package manager. Check out [a tutorial](https://github.com/hasha2982/Py93/wiki/Creating-your-first-Py93-package) about how to do it.

Py93 also has a SDK, you can find documentation about it [here](https://github.com/hasha2982/Py93/wiki/SDK).

<!---
## CLI commands

```
Printing out help message:
py93
py93 help
py93 h

Launching the shell:
py93 shell
py93 s

Printing out py93compile help message:
py93 compile
py93 c
py93 compile help
py93 compile h
py93 c help
py93 c h

Launching py93compile (Py93 Compiler):
py93 c [filename]
py93 compile [filename]
// py93compile have got more options, see py93compile help message for more
```
-->

> *Last updated: May 30, 2020*
