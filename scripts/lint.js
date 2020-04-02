/* eslint-disable */
/**
 * Script to run eslint against unpushed .vue or .js files
 */
var childProcess = require('child_process');

childProcess.exec("git branch | grep \\* | cut -d ' ' -f2", function(
  err,
  branchname
) {
  childProcess.exec(
    'git diff --stat --name-only origin/' + branchname.trim(),
    function(err2, files) {
      if (!err2) {
        var filenames = files
          .split('\n')
          .filter(function(filename) {
            return /\.vue$|\.tsx$|\.ts$|\.js$/i.test(filename);
          })
          .join(' ');
        if (filenames) {
          var command =
            './node_modules/.bin/eslint --color ' + filenames + ' --fix';
          console.log('running command: ', command);
          var c = childProcess.exec(command, function(err3, stdout) {
            console.log(stdout);
          });
          c.on('close', function(code) {
            process.exit(code);
          });
        }
      } else {
        process.exit(0);
      }
    }
  );
});

/* eslint-enable */
