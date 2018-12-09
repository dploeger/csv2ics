import { command, Command, option, Options, param } from 'clime'
import { Csv } from '../Csv'
import { ConvertOptions } from '../ConvertOptions'
import { ReadStream, createReadStream } from 'fs'
import { Readable } from 'stream'

@command({
    description: 'Convert csv to ical files'
})
export default class extends Command {
    public execute(
        @param({
            required: false,
            description: 'Input .csv file'
        })
        input: string,
        @param({
            required: false,
            description: 'Output .ics file'
        })
        output: string,
        options: ConvertOptions
    ): Promise<any> | any {
        let inputStream: Readable
        if (!input) {
            inputStream = process.stdin
        } else {
            inputStream = createReadStream(input)
        }

        let csv = new Csv()
        return csv
            .getDataFromStream(inputStream, options.delimiter, options.headers)
            .then(lines => {})
    }
}
