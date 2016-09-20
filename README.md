# Aconex Live Styleguide

## How to run the styleguide

Run the following commands in this project's folder to install the project's dependencies, build the styleguide, and start a web server that serves the styleguide.

```
npm install
npm run build
npm start
```

Then browse to [`http://localhost:3080`](http://localhost:3080) in your browser to view the styleguide.

## How to add documentation and pages to the styleguide

This project is dependent on the `aconex-ui` project. To generate the styleguide's contents, we look for files in `aconex-ui` that match a filename format of `example.guide.md`.

For example, if a file exists at `aconex-ui/basics/button/button.guide.md`, a *Button* link will appear under the *Basics* category in the styleguide's navigation, and the contents of `button.guide.md` will be displayed when the link is clicked.

The contents of `button.guide.md` are written in [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

We have added an extension to the syntax to allow you to include demonstrative content into the page's contents.

For example, if files called `button.anchor.demo.html` and `button.disabled.demo.html` existed in the same location as `button.guide.md` as in the following image:

![](http://i.imgur.com/5KnEFwE.png)

Then the contents of those html files can be pulled into the page by referencing them with the `--$ example $--` syntax as in the following image:

![](http://i.imgur.com/dCnKIrr.png)

## How to dev with aconex-ui

By default the styleguide will install the latest `aconex-ui` from [its git repo](https://git.cloudengr.aconex.com/ui/aconex-ui), however you can bind your styleguide to a local version of `aconex-ui` using [`npm link`](https://docs.npmjs.com/cli/link). This will allow you to see your local changes live in the styleguide.

```
cd ../aconex-ui
npm link
cd ../styleguide
npm link aconex-ui
```

At this point the styleguide will use your development version of `aconex-ui` rather than the latest commit from the master branch.
