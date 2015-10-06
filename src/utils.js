import fs from 'fs'
import path from 'path'
import Home from 'home-dir'
import pathExists from 'path-exists'

export default {
  async readFile (filepath) {
    return new Promise ((resolve, reject) => {
      pathExists(filepath).then(exists => {
        if (exists) {
          let filedata = fs.readFileSync(filepath, 'utf8')
          filedata = JSON.parse(filedata)
          return resolve(filedata)
        }
        return resolve(null)
        
      })
    })
  },
  async saveFile (filepath, data) {

    return new Promise ((resolve, reject) => {
      data = JSON.stringify(data, null, 2)
      filepath = path.resolve(filepath)
      console.log(filepath)
      fs.writeFile(filepath, data, 'utf8', err => {
        if (err) {
          return reject(err)
        }
        return resolve(null)
      })
      
    })
  }
}