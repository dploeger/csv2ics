import { MomentFormatSpecification } from 'moment'

export interface ICalOptions {
    headerMap: Array<string>
    calendarName: string
    timezone: string
    dateFormat: MomentFormatSpecification
}
