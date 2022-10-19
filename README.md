# Deno.run

A tiny [Deno](https://deno.land/) development sandbox for quickly building small CLI utilities.

## Instructions

- Clone the repo
- [Install Deno](https://deno.land/#installation)
- Add the `.run` directory to your path
- Run `dr`
- Make cool things!

## Included scripts

## `dr`

Adds bash script runners for every `.ts` file in the root of the repo to `.run` for quick execution.
You can add permissions for individual scripts by adding a comment with `//` at the beginning of the file
and including the exact flags you'd like to pass to deno like `--allow-read`

## `js`

Handle piped text with JavaScript!

### Reverse the text of every piped line

```bash
ls | js ".split('').reverse().join('')"
```

### Reformat input

```bash
ls | js "x => `- \${x}`"
```

### Filter by extension

```bash
ls | js ".endsWith('.ts')"
```

```bash
ls | js "x => !x.endsWith('.ts')"
```
