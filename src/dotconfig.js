import Home from 'home-dir'
import _ from './utils'
import 'babel/polyfill'

const dotFileRe = /^(\.[^\/]*)$/

class Config {
  constructor(filename) {

    const validFilename = dotFileRe.test(filename)

    this.filename = filename
    this.filepath = Home(filename)
  }

  get (key) {
    return new Promise((resolve, reject) => {
      (async() => {
        let filedata = await _.readFile(this.filepath)
        if (key) {
          return resolve(filedata && filedata[key])
        }
        return resolve(filedata)
      }())
    })
  }

  set(key, value) {

    return new Promise((resolve, reject) => {
      (async() => {
        let filedata = await _.readFile(this.filepath)
        filedata = filedata ? filedata : {}
        if (typeof key === 'object') {
          for (var prop in key) {
            filedata[prop] = key[prop]
          }
        } else if (typeof key === 'string') {
          filedata[key] = value
        }
        
        try {
          await _.saveFile(this.filepath, filedata)
          resolve(filedata)
        } catch (err) {
          console.error(err)
        }
      }())

    })

  }

}

export default Config