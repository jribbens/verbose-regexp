# verbose-regexp

This module provides a way to use verbose regular expressions in
JavaScript and TypeScript, similar to `re.VERBOSE` in Python. It
provides that white-space at the start and end of lines are ignored,
as are newlines, and anything following `//` to the end of the line.

It allows you to easily write multi-line regular expressions, and to
make your regular expressions more self-documenting using formatting
and comments.

Example:

```javascript
    import { rx } from 'verbose-regexp'
    // or: const { rx } = require('verbose-regexp')

    const dateTime = rx`
      (\d{4}-\d{2}-\d{2}) // date
      T                   // time separator
      (\d{2}:\d{2}:\d{2}) // time
    `
    console.log(dateTime.exec(new Date().toISOString()))
```

You can also embed regular expressions within each other, to allow a
complicated regular expression to be built up in steps from simpler parts,
e.g.:

```javascript
    const date = rx`\d{4}-\d{2}-\d{2}`
    const time = rx`\d{2}:\d{2}:\d{2}`
    const dateTime = rx`
      (${date})           // date
      T                   // time separator
      (${time})           // time
    `
    console.log(dateTime.exec(new Date().toISOString()))
```

Note that embedded sub-expressions are automatically surrounded with `(?:`
and `)`, so that they are always treated as a self-contained unit. Also note
that embedded sub-expressions will be run using the flags of the parent
expression, regardless of what flags were on the sub-expression - so, for
example, if the sub-expression had the 'case insensitive' flag set but the
parent expression didn't, then the sub-expression will be executed in a
case sensitive manner.

You can use regular expression flags by accessing them as a property of `rx`,
e.g.:

```javascript
    const alpha = rx.i`[a-z]+`
    const allAlpha = rx.gi`[a-z]+`
```

If you want to use a string that would otherwise be ignored (i.e. whitespace
or `//`), you can simply escape it with backslashes or a character class:

```javascript
    const url = rx.i`
      [ ]*([a-z]+):\/\/  // scheme
      ([^/]+)           // location
      (?:/(.*))         // path
    `
```

## History

### 3.0.0 (2023-06-04)

  * Allow embedding of other RegExp objects.

### 2.0.0 (2022-05-03)

  * Use 'Proxy' objects to avoid having to create static properties for
    every permutation of the possible flags.

### 1.0.0 (2021-05-24)

  * Initial release.
