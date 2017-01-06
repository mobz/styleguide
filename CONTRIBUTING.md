# Requirements

- nodejs v6.3.0+

# Code style

- Tabs for indentation
- We use ESLint to lint and check JavaScript code style. Most IDEs have plugins for ESLint that automatically reads the rules from this project's `.eslintrc.js`.
- We use the JSBeautify code formatter to automatically format code to the appropriate style. You can manually format your code by hand, however, a JSBeautify plugin for your IDE simplifies this. Most IDEs have plugins for JSBeautify that automatically reads the rules from this project's `.jsbeautifyrc`.

# Working with aconex-ui

This project is dependent on the aconex-ui project. To generate the styleguide's contents, we look for files in aconex-ui that match a filename format of `example.guide.md`.

For example, if a file exists at `aconex-ui/basics/button/button.guide.md`, a _Button_ link will appear under the _Basics_ category in the styleguide's navigation, and the contents of `button.guide.md` will be displayed when the link is clicked.

## Adding new patterns to aconex-ui

See the contributing guide for aconex-ui: <https://git.cloudengr.aconex.com/ui/aconex-ui/blob/master/CONTRIBUTING.md>

## Developing with aconex-ui

By default the styleguide will npm install the latest aconex-ui sourced from [its git repository's master branch](https://git.cloudengr.aconex.com/ui/aconex-ui), however you can bind your styleguide to a local version of aconex-ui using [`npm link`](https://docs.npmjs.com/cli/link).

This will allow you to get live feedback in the styleguide for changes that you make to your local aconex-ui.

To set this up:

```
cd ../aconex-ui
npm link
cd ../styleguide
npm link aconex-ui
npm run dev
```

At this point the styleguide will use your development version of aconex-ui instead of the latest master. Your local changes to aconex-ui can be seen by refreshing the styleguide in the browser.

# Contributing to the styleguide

We use pull requests to develop and receive contributions to the styleguide.

To contribute:

1. Fork this repository (the main repository).

2. `git clone` your **fork**, not the main repository.

3. Add the main repository as a git remote:

  ```
  git remote add upstream ssh://git@git.cloudengr.aconex.com/ui/styleguide.git
  ```

4. Develop your changes locally and push to your **fork**.

5. As you develop locally, you will want to pull commits from the main repository so that your fork stays up to date with what other developers have contributed. Do this with:

  ```
  git fetch --all
  git merge upstream/master
  ```

6. When all your changes are finalised and pushed to your fork, create a new pull request at <https://git.cloudengr.aconex.com/ui/styleguide/pulls>.

7. The pull request will be reviewed and then merged into the main repository.
