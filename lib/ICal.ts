import { ConvertOptions } from './ConvertOptions'
import * as Bluebird from 'bluebird'
import moment = require('moment-timezone')
import { ICalOptions } from './ICalOptions'

export class ICal {
    private _options: ICalOptions

    constructor(options: ICalOptions) {
        this._options = options
    }

    public listToCalendar(list: Array<any>): Bluebird<any> {
        let ical = require('ical-toolkit')

        let builder = ical.createIcsFileBuilder()
        builder.calname = this._options.calendarName
        builder.tzid = this._options.timezone

        return Bluebird.reduce<any, Array<any>>(
            list,
            (events, line) => {
                events.push(this._createEvent(line))
                return events
            },
            []
        ).then(events => {
            builder.events = events
            return builder
        })
    }
    private _createEvent(line: any): any {
        let event: any = {}

        for (let index in this._options.headerMap) {
            if (this._options.headerMap.hasOwnProperty(index)) {
                let attribute = this._options.headerMap[index]
                if (attribute === 'SUMMARY') {
                    event.summary = line[index]
                } else if (attribute === 'DTSTART') {
                    event.start = moment(line[index], this._options.dateFormat)
                        .tz('UTC')
                        .toDate()
                } else if (attribute === 'DTEND') {
                    event.end = moment(line[index], this._options.dateFormat)
                        .tz('UTC')
                        .toDate()
                } else if (attribute === 'DESCRIPTION') {
                    event.description = line[index]
                } else if (attribute === 'LOCATION') {
                    event.location = line[index]
                } else {
                    if (!event.hasOwnProperty('additionalTags')) {
                        event.additionalTags = {}
                    }
                    event.additionalTags[attribute] = line[index]
                }
            }
        }

        return event
    }
}
