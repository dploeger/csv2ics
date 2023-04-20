# csv2ics - Convert CSV files into ICS calendars

## Introduction

Convert a CSV file into an ICS calendar.

## Header map

csv2ics needs to know which columns are mapped to which ICAL properties. This can not be easily specified through CSV headers, so we rely on the header map.

The header map is a comma separated list of strings that specify the matching ICAL-properties for each column. Certain mappings are detected and handled properly (e.g. the parsing of the date fields). If a mapping is unknown, it is simply added as a custom attribute.

## Usage

Install csv2ics by downloading the latest binary from the latest [release](https://github.com/dploeger/csv2ics/releases) and run it using

    csv2ics <input file.csv> <output file.ics>

Input and output files are optional. If only one file is specified, it is used as an input file. If no file is specified, CSV data is taken from the STDIN.

For option help, use

    csv2ics --help

# Options

Supported options with defaults are:

```
usage: csv2ics [-h|--help] [-d|--delimiter "<value>"] [-H|--headers]
               [-m|--header-map "<value>"] [-c|--calendar-name "<value>"]
               [-t|--timezone "<value>"] [-D|--dateformat "<value>"]
               [input file] [output file]

               Convert CSV files into ICS calendars

Arguments:

  -h  --help                      Print help information
  -d  --delimiter                 Delimiter used in CSV-file. Default: ,
  -H  --headers                   CSV file has headers. Default: false
  -m  --header-map                A comma separated list that sets the ical
                                  property to the header. Default:
                                  SUMMARY,DTSTART,DTEND,DESCRIPTION,LOCATION
  -c  --calendar-name             Name of the calendar to generate. Default: My
                                  calendar
  -t  --timezone                  Timezone-ID of the dates of the calendar.
                                  Default: UTC
  -D  --dateformat                Format of dates in the CSV file in Go Date
                                  format (see
                                  https://pkg.go.dev/time@go1.20.3#pkg-constants).
                                  Default: 2006-01-02 15:04
      input file                  Input CSV file (defaults to STDIN if not
                                  provided)
      output file                 Output ICS file (defaults to STDOUT if not
                                  provided)
```

## Building

To test and build this package, install [golangci-lint](https://golangci-lint.run/) and run:

    golangci-lint run
    go test ./...
    go build cmd/csv2ics.go
    
