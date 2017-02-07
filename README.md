# Aconex Live Styleguide

## Running the styleguide

Run the following commands in this project's folder to install the project's dependencies, build the styleguide, and start a web server that serves the styleguide.

```
npm install
npm run build
npm start
```

Then browse to [`http://localhost:3080`](http://localhost:3080) in your browser to view the styleguide.

## Working with your UI library

The styleguide requires a UI library. To generate the styleguide's contents, we look for files in your UI library that match a filename format of `example.guide.md`.

1. Install `styleguide` as a dependency in your project.
```
npm install styleguide
```


For example, if a file exists at `aconex-ui/basics/button/button.guide.md`, a _Button_ link will appear under the _Basics_ category in the styleguide's navigation, and the contents of `button.guide.md` will be rendered when the link is clicked.

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

## Contributing

Please see <https://git.cloudengr.aconex.com/ui/styleguide/blob/master/CONTRIBUTING.md>.

## Publishing

```
mkdir publish
cd publish
rhc git-clone sg1
cd ..
npm run publish:prod
cd publish/sg1
```

check the commit looks ok

```
git commit -a -m "message"
git push origin master
```
