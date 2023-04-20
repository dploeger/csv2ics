package main

import (
	"csv2ics/internal"
	"fmt"
	"github.com/akamensky/argparse"
	"github.com/emersion/go-ical"
	"io"
	"os"
	"strings"
	"time"
)

func main() {
	parser := argparse.NewParser("csv2ics", "Convert CSV files into ICS calendars")
	delimiter := parser.String("d", "delimiter", &argparse.Options{
		Help:    "Delimiter used in CSV-file",
		Default: ",",
	})
	headers := parser.Flag("H", "headers", &argparse.Options{
		Help:    "CSV file has headers",
		Default: false,
	})
	headerMap := parser.String("m", "header-map", &argparse.Options{
		Help:    "A comma separated list that sets the ical property to the header",
		Default: "SUMMARY,DTSTART,DTEND,DESCRIPTION,LOCATION",
	})
	calendarName := parser.String("c", "calendar-name", &argparse.Options{
		Help:    "Name of the calendar to generate",
		Default: "My calendar",
	})
	timezone := parser.String("t", "timezone", &argparse.Options{
		Help:    "Timezone-ID of the dates of the calendar",
		Default: "UTC",
	})
	datetimeFormat := parser.String("D", "dateformat", &argparse.Options{
		Help:    "Format of dates in the CSV file in Go Date format (see https://pkg.go.dev/time@go1.20.3#pkg-constants)",
		Default: "2006-01-02 15:04",
	})
	inputName := parser.StringPositional(&argparse.Options{
		Help: "Input CSV file (defaults to STDIN if not provided)",
	})
	outputName := parser.StringPositional(&argparse.Options{
		Help: "Output ICS file (defaults to STDOUT if not provided)",
	})

	if err := parser.Parse(os.Args); err != nil {
		panic(parser.Usage(fmt.Sprintf("Error parsing arguments: %s", err.Error())))
	}

	var inputFile io.Reader

	if *inputName == "" {
		inputFile = os.Stdin
	} else {
		if f, err := os.Open(*inputName); err != nil {
			panic(parser.Usage(fmt.Sprintf("can not open file %s: %s", *inputName, err.Error())))
		} else {
			inputFile = f
		}
	}

	var outputFile *os.File

	if *outputName == "" {
		outputFile = os.Stdout
	} else {
		if f, err := os.OpenFile(*outputName, os.O_CREATE|os.O_WRONLY, 0644); err != nil {
			panic(parser.Usage(fmt.Sprintf("Can not open output file %s: %s", *inputName, err.Error())))
		} else {
			outputFile = f
		}
	}

	var location *time.Location

	if l, err := time.LoadLocation(*timezone); err != nil {
		panic(parser.Usage(fmt.Sprintf("Unknown timezone: %s", *timezone)))
	} else {
		location = l
	}

	var records [][]string

	if r, err := internal.ReadCsvFile(inputFile, *headers, *delimiter); err != nil {
		panic(parser.Usage(fmt.Sprintf("Error reading file: %s", err.Error())))
	} else {
		records = r
	}

	outputCalendar := ical.NewCalendar()
	outputCalendar.Name = *calendarName

	for _, record := range records {
		if ev, err := internal.ParseCsvRecord(record, strings.Split(*headerMap, ","), *datetimeFormat, location); err != nil {
			panic(parser.Usage(fmt.Sprintf("Error parsing record %s: %s", strings.Join(record, *delimiter), err.Error())))
		} else {
			outputCalendar.Children = append(outputCalendar.Children, ev.Component)
		}
	}

	if err := ical.NewEncoder(outputFile).Encode(outputCalendar); err != nil {
		panic(parser.Usage(fmt.Sprintf("Can not write calendar to output: %s", err.Error())))
	}
}
