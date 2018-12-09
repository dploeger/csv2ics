import { Options, option } from 'clime'

export class ConvertOptions extends Options {
  @option({
    flag: 'd',
    description: 'Delimiter used in CSV-file',
    default: ','
  })
  public delimiter: string

  @option({
    flag: 'h',
    description: 'CSV file has headers',
    type: Boolean,
    toggle: true
  })
  public headers: boolean

  @option({
    flag: 'm',
    description: 'A map of headers to ical properties (see README.md)',
    default: 'SUMMARY,DTSTART,DTEND,DESCRIPTION,LOCATION'
  })
  public headerMap: string

  @option({
    description: 'Name of calendar',
    default: 'My Calendar'
  })
  public calendarName: string

  @option({
    description: 'Timezone-ID of the dates of the calendar',
    default: 'UTC'
  })
  public timezone: string

  @option({
    description:
      'Date/Time-Format in CSV (see https://momentjs.com/docs/#/parsing/string-format/)',
    default: 'YYYY-MM-DD HH:mm:ss'
  })
  public dateformat: string
}
