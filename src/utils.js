import fs from 'fs'
import path from 'path'
import Home from 'home-dir'
import pathExists from 'path-exists'
import yaml from 'js-yaml'

export default {
  async readFile (filepath, parser) {
    return new Promise ((resolve, reject) => {
      pathExists(filepath).then(exists => {
        if (exists) {
          let filedata
          if (parser === 'json') {
            filedata = require(filepath)
          } else if (parser === 'yaml') {
            filedata = fs.readFileSync(filepath, 'utf8')
            filedata = yaml.safeLoad(filedata)
          }
          return resolve(filedata)
        }
        return resolve(null)

      })
    })
  },
  async saveFile (filepath, data, parser) {

    return new Promise ((resolve, reject) => {
      if (parser === 'json') {
        data = JSON.stringify(data, null, 2)
      } else if (parser === 'yaml') {
        data = yaml.safeDump(data)
      }
      filepath = path.resolve(filepath)
      fs.writeFile(filepath, data, 'utf8', err => {
        if (err) {
          return reject(err)
        }
        return resolve(null)
      })

    })
  }
}
