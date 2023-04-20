package internal

import (
	"encoding/csv"
	"io"
)

func ReadCsvFile(inputFile io.Reader, hasHeader bool, delimiter string) ([][]string, error) {
	r := csv.NewReader(inputFile)
	r.Comma = []rune(delimiter)[0]

	var records [][]string

	if r, err := r.ReadAll(); err != nil {
		return nil, err
	} else {
		records = r
	}

	if hasHeader {
		records = records[1:]
	}

	return records, nil
}
