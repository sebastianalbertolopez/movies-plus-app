const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const uuidV4 = require('uuid/v4');

const db = require('../database/config');

// Create multer object
const imageUpload = multer({
  storage: multer.diskStorage(
    {
      destination: (req, file, cb) => {
        cb(null, 'public/uploads');
      },
      filename: (req, file, cb) => {
        const extension = file.originalname.split('.').pop();
        cb(null, `${uuidV4()}.${extension}`);
      }
    }
  )
});

// api/movies
router.post('/', imageUpload.single('image'), (req, res) => {
  const { filename, originalname, size, destination, mimetype } = req.file;
  const filepath = req.file.path;
  const extension = filename.split('.').pop();

  db
    .insert({
      name: filename,
      uuid: filename.split('.')[0],
      original_name: originalname,
      extension,
      destination,
      path: filepath,
      mime_type: mimetype,
      size
    })
    .into('file')
    .then(() => res.json({ success: true, filename }))
    .catch(err => res.json({
      success: false,
      message: 'upload failed',
      stack: err.stack
    }));
});

// Image Get Routes
router.get('/:uuid', (req, res) => {
  const { uuid } = req.params;

  db
    .select('*')
    .from('file')
    .where({ uuid })
    .then((images) => {
      if (images[0]) {
        console.log(images[0]);
        const dirname = path.resolve();
        const fullfilepath = path.join(dirname, images[0].path);
        return res.type(images[0].mime_type).sendFile(fullfilepath);
      }
      return Promise.reject(
        new Error('Image does not exist')
      );
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: 'not found',
        stack: err.stack
      });
    });
});

/*
var upload = multer({ storage: multer.memoryStorage({}) })

app.post('/', upload.single('test'), function (req, res, next) {
  var raw = new Buffer(req.file.buffer.toString(), 'base64')

  fs.writeFile('/tmp/upload.png', raw, function (err) {
    if (err) return next(err)

    res.end('Success!')
  })
})
*/

module.exports = router;
