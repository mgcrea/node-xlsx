# Changelog

## 0.25.0

### Breaking

- Requires node 18 or later (was 10).
- SheetJS is bundled inside the package instead of being installed from the SheetJS CDN. If you imported `xlsx`
  yourself relying on node-xlsx to install it, add it to your own dependencies.

### Fixed

- Installs no longer fail when pnpm blocks exotic subdependencies or when the SheetJS CDN times out (#206, #215).
- Codepages other than utf8, such as shift_jis, are now decoded when parsing a buffer (#198).
- Top-level legacy sheet options passed to `build()` (`"!cols"`, `"!merges"`, ...) are applied again.
- `WorkSheet.options` is optional in the types (#179, #205, thanks @b3nab).
- Output targets ES2019, so older bundlers such as webpack 4 can parse it (#204).
- CommonJS consumers get CommonJS type declarations.

### Changed

- Parsing reads sheets in dense mode, about 20% faster and lighter on large sheets (#213, from #218, thanks
  @DokiDoki1103). Sheets stay sparse when `range` is a function.
- SheetJS updated to 0.20.3.
