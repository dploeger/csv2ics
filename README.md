# csv2ics - Convert CSV files into ICS calendars

![](https://img.shields.io/npm/v/csv2ics.svg) [![Build Status](https://travis-ci.org/dploeger/csv2ics.svg?branch=master)](https://travis-ci.org/dploeger/csv2ics) [![Coverage Status](https://coveralls.io/repos/github/dploeger/csv2ics/badge.svg?branch=master)](https://coveralls.io/github/dploeger/csv2ics?branch=master)

## Introduction

Convert a CSV file into an ICS calendar.

## Header map

csv2ics needs to know which columns are mapped to which ICAL properties. This can not be easily specified through CSV headers, so we rely on the header map.

The header map is a comma separated list of strings that specify the matching ICAL-properties for each column. Certain mapping are detected and handled properly (e.g. the parsing of the date fields). If a mapping is unknown, it is simply added as a custom attribute.

These mappings are detected:

-   SUMMARY
-   DTSTART
-   DTEND
-   DESCRIPTION
-   LOCATION

## Usage

Install csv2ics using npm:

    npm install -g csv2ics

Run it using

    csv2ics <input file.csv> <output file.ics>

Input and output files are optional. If only one file is specified, it is used as an input file. If no file is specified, CSV data is taken from the STDIN.

For option help, use

    csv2ics --help

# Options

Supported options with defaults are:

-   -d, --delimiter \<delimiter\> - Delimiter used in CSV-file [,]
-   -h, --headers - CSV file has headers
-   -m, --header-map \<headerMap\> - A map of headers to ical properties [SUMMARY,DTSTART,DTEND,* DESCRIPTION,LOCATION]
-   --calendar-name \<calendarName\> - Name of calendar [My Calendar]
-   --timezone \<timezone\> - Timezone-ID of the dates of the calendar [UTC]
-   --dateformat \<dateformat\> - Date/Time-Format in CSV (see [https://momentjs.com/docs/#/parsing/string-format/](https://momentjs.com/docs/#/parsing/string-format/)) [YYYY-MM-DD HH:mm:ss]

## Building

To test and build this package, simply use grunt:

    grunt test
