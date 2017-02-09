# Requirements

- nodejs v6.3.0+

# Code style

- Tabs for indentation
- We use ESLint to lint and check JavaScript code style. Most IDEs have plugins for ESLint that automatically reads the rules from this project's `.eslintrc.js`.
- We use the JSBeautify code formatter to automatically format code to the appropriate style. You can manually format your code by hand, however, a JSBeautify plugin for your IDE simplifies this. Most IDEs have plugins for JSBeautify that automatically reads the rules from this project's `.jsbeautifyrc`.

# Contributing to the styleguide

We use pull requests to develop and receive contributions to the styleguide.

To contribute:

1. Fork this repository (the main repository).

2. `git clone` your **fork**, not the main repository.

3. Add the main repository as a git remote:

  ```
  git remote add upstream ssh://git@github.com:Aconex/styleguide.git
  ```

4. Develop your changes locally and push to your **fork**.

5. As you develop locally, you will want to pull commits from the main repository so that your fork stays up to date with what other developers have contributed. Do this with:

  ```
  git fetch --all
  git merge upstream/master
  ```

6. When all your changes are finalised and pushed to your fork, create a new pull request at <https://github.com/Aconex/styleguide/pulls>.

7. The pull request will be reviewed and then merged into the main repository.
