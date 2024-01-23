/* eslint-disable @typescript-eslint/no-unused-vars */
module.exports = {
  'src/**/*.{ts}': () => 'tsc --noEmit', // https://github.com/okonet/lint-staged#example-run-tsc-on-changes-to-typescript-files-but-do-not-pass-any-filename-arguments

  '*.ts': ['eslint --fix', 'prettier --write'],
}
