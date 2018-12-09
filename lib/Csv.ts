import * as Bluebird from 'bluebird'
import fast_csv = require('fast-csv')
import { ReadStream } from 'fs'
import { Readable } from 'stream'

export class Csv {
    public getDataFromStream(
        input: Readable,
        delimiter: string,
        headers: boolean
    ): Bluebird<Array<any>> {
        return new Bluebird((resolve, reject) => {
            let lines: Array<any> = []
            let readHeaders: boolean = false

            let csvStream = fast_csv
                .fromStream(input, {
                    delimiter: delimiter,
                    headers: false
                })
                .on('data', data => {
                    if (headers && !readHeaders) {
                        readHeaders = true
                    } else {
                        lines.push(data)
                    }
                })
                .on('end', () => {
                    resolve(lines)
                })
                .on('error', error => {
                    reject(error)
                })
        })
    }
}
