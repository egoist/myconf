import Home from 'home-dir'
import _ from './utils'
import 'babel/polyfill'
import path from 'path'

const dotFileRe = /^(\.[^\/]*)$/

class Config {
  constructor(filename) {

    const validFilename = dotFileRe.test(filename)
    if (!validFilename) {
      return console.error(`the filename '${filename}' is not valid`)
    }
    this.filename = filename
    this.filepath = Home(filename)
    this.fileparser = 'json'
  }

  path(filepath = Home()) {
    this.filepath = path.resolve(filepath + `/${this.filename}`)
    return this
  }

  parser(parser = 'json') {
    this.fileparser = parser
    return this
  }

  get(key) {
    return new Promise((resolve, reject) => {
      (async() => {
        let filedata = await _.readFile(this.filepath, this.fileparser)
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
        let filedata = await _.readFile(this.filepath, this.fileparser)
        filedata = filedata ? filedata : {}
        if (typeof key === 'object') {
          for (var prop in key) {
            filedata[prop] = key[prop]
          }
        } else if (typeof key === 'string') {
          filedata[key] = value
        }

        try {
          await _.saveFile(this.filepath, filedata, this.fileparser)
          resolve(filedata)
        } catch (err) {
          console.error(err)
        }
      }())

    })

  }

  save(filedata) {
    return new Promise((resolve, reject) => {
      (async() => {
        try {
          await _.saveFile(this.filepath, filedata, this.fileparser)
          resolve(filedata)
        } catch (err) {
          console.error(err)
        }
      }())
    })
  }

}

export default Config
