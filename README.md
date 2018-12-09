# csv2ics - Convert CSV files into ICS calendars

## Introduction

Convert a CSV file into an ICS calendar.

(Currently WIP)

## Header map

csv2ics needs to know which columns are mapped to which ICAL properties. This can not be easily specified through CSV headers, so we rely on the header map.

The header map is a comma separated list of strings that specify the matching ICAL-properties for each column. Certain mapping are detected and handled properly (e.g. the parsing of the date fields). If a mapping is unknown, it is simply added as a custom attribute.

These mappings are detected:

-   SUMMARY
-   DTSTART
-   DTEND
-   DESCRIPTION
-   LOCATION

## Building

To test and build this package, simply use grunt:

    grunt test
