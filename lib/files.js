var fs = require('fs');

function directoryExists(directory) {
  try {
    fs.statSync(directory);
  } catch(e){
    return false;
  }
  return true;
}

module.exports = {
  directoryExists: directoryExists
}
