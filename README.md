# Py93

Py93 is a Python 3 compiler and shell (based on [Brython](https://brython.info)) for [Windows 93](https://windows93.net/).

<!--- code redactor (based on [CodeMirror](https://codemirror.net)),  -->

<!---
## Installing

To install Py93 to your Windows 93 computer, just create `Py93` folder in `/a/`, then paste this repository to `Py93` folder. See `installguide.md` for more detailed guide.
-->
## Quick-start guide
1. Clone this repository to your computer.
2. Create `Py93` folder in `/a/`.
3. Move the repository from your computer to `/a/Py93/`.
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

> *Last updated: Apr 28, 2020*