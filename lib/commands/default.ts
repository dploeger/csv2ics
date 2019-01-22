import { command, Command, option, Options, param } from 'clime'
import { Csv } from '../Csv'
import { ConvertOptions } from '../ConvertOptions'
import { ReadStream, createReadStream } from 'fs'
import { Readable } from 'stream'
import { ICal } from '../ICal'
import * as Bluebird from 'bluebird'

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
            .then(lines => {
                let ical = new ICal({
                    calendarName: options.calendarName,
                    dateFormat: options.dateformat,
                    headerMap: options.headerMap.split(','),
                    timezone: options.timezone
                })

                return ical.listToCalendar(lines)
            })
            .then(calendar => {
                return calendar.toString()
            })
    }
}
