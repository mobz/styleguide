# Aconex Live Styleguide

## Running the styleguide

Run the following commands in this project's folder to install the project's dependencies, build the styleguide, and start a web server that serves the styleguide.

```
npm install
npm run build
npm start
```

Then browse to [`http://localhost:3080`](http://localhost:3080) in your browser to view the styleguide.

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
