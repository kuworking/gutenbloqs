// version 0.2

const run = () => {
  const themeName = '/gutenbloqs-author'

  // require modules
  const fs = require('fs-extra')
  const archiver = require('archiver')

  // get year and year-week
  function getWeek() {
    const date = new Date()
    const dt = new Date(date.getFullYear(), 0, 1)
    const week = Math.ceil(((date - dt) / 86400000 + dt.getDay() + 1) / 7)
    return date.getFullYear() + '_' + week
  }

  // create a file to stream archive data to.
  const package = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  const name = __dirname + themeName + '.zip'
  const vname = __dirname + themeName + '.version.' + package.version + '.zip'

  // delete previous file if it exists
  if (fs.existsSync(name))
    try {
      fs.removeSync(name)
      fs.removeSync(vname)
      console.log('previous zip deleted')
    } catch (err) {
      console.log(`error: ${err}`)
      return
    }

  const output = fs.createWriteStream(name)
  const archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level.
  })

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes')
    console.log('archiver has been finalized and the output file descriptor has closed.')

    try {
      fs.copySync(name, vname)
      console.log('version file created')
    } catch (err) {
      console.log(`error: ${err}`)
    }
  })

  // This event is fired when the data source is drained no matter what was the data source.
  // It is not part of this library but rather from the NodeJS Stream API.
  // @see: https://nodejs.org/api/stream.html#stream_event_end
  output.on('end', function () {
    console.log('Data has been drained')
  })

  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
      // throw error
      throw err
    }
  })

  // good practice to catch this error explicitly
  archive.on('error', function (err) {
    throw err
  })

  // pipe archive data to the file
  archive.pipe(output)

  // append files from a sub-directory and naming it `new-subdir` within the archive
  // archive.directory('src/', 'src')
  archive.directory('vendor/', 'vendor')
  archive.directory('build/', 'build')
  archive.directory('static/', 'static')
  archive.directory('templates/', 'templates')

  // append files from a glob pattern
  archive.glob('*.json')
  archive.glob('*.php')
  archive.glob('*.png')
  archive.glob('*.css')

  // finalize the archive (ie we are done appending files but streams have to finish yet)
  // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
  archive.finalize()
}

run()
