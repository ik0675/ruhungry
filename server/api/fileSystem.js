const fs = require('fs');

module.exports = function(res, tempPath, imgPath) {
  fs.rename(tempPath, imgPath, err => {
    if (err) {
      console.log(err);
      fs.unlink(tempPath, err => {
        if (err) {
          console.log(err);
          return res.json({ status: false, msg: 'Internal err. Please try again' });
        }
        return res.json({ status: false, msg: 'Creating image file error. Please try again' });
      });
    }
    return res.json({ status: true, msg: 'Restaurant has been successfully added!' });
  });
}
