# Aconex Live Styleguide

## How to run the styleguide

    npm install
    npm start

## How to dev with aconex-ui

By default the styleguide will npm install aconex-ui from the git repo, however you can use a local version using `npm link`

    cd ../aconex-ui
    npm link
    cd ../styleguide
    npm link aconex-ui

At this point the styleguide will use your development version of aconex-ui rather than the master committed version
