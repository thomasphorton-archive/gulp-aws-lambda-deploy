# gulp-aws-lambda-deploy

A pattern for keeping NodeJS Lambda functions in version control.

## Use
Check out the example at `src/test-function/`. The idea is to create a 'submodule' that declares its own dependencies with `package.json`. Run `gulp default` to install the dependencies, zip the package, and deploy it to AWS.

## Getting Started
```
git clone git@github.com:thomasphorton/gulp-aws-lambda-deploy.git
cd gulp-aws-lambda-deploy
npm install
gulp

```

## Troubleshooting
* Make sure your AWS credentials are set up correctly (default location is `~/.aws/credentials`)

```
validation error detected: Value '<lambda role ARN>' at 'role' failed to satisfy constraint:
```

This isn't configurable yet- edit `settings.roleARN` in `gulpfile.js`

## TODO:
### Iterate over folders in gulp
https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-task-steps-per-folder.md

```
function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function(file)) {
        return fs.statSync(path.join(dir, file)).isDirectory();
    }
}
```