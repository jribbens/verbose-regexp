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
