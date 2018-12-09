import { ConvertOptions } from './ConvertOptions'
import * as Bluebird from 'bluebird'
import moment = require('moment')

export class ICal {
  private _options: ConvertOptions
  private _headers: Array<string>

  constructor(options: ConvertOptions) {
    this._options = options
    this._headers = this._options.headerMap.split(/,/)
  }
  public listToCalendar(list: Array<any>): Bluebird<string> {
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
      return builder.toString()
    })
  }
  private _createEvent(line: any): any {
    let event: any = {}

    for (let index in this._headers) {
      if (this._headers.hasOwnProperty(index)) {
        let attribute = this._headers[index]
        if (attribute === 'SUMMARY') {
          event.summary = line[index]
        } else if (attribute === 'DTSTART') {
          event.start = moment(line[index])
            .tz('UTC')
            .toDate()
        } else if (attribute === 'DTEND') {
          event.end = moment(line[index])
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
