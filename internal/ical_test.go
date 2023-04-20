package internal_test

import (
	"csv2ics/internal"
	"github.com/emersion/go-ical"
	"github.com/stretchr/testify/assert"
	"testing"
	"time"
)

func TestParseCsvRecord(t *testing.T) {
	input := []string{"Test", "2023-01-01 12:00", "2023-01-02 13:00"}
	if s, err := internal.ParseCsvRecord(input, []string{"SUMMARY", "DTSTART", "DTEND"}, "2006-01-02 15:04", time.UTC); err != nil {
		t.Fatalf("Reading the input failed: %e", err)
	} else {
		assert.Equal(t, "Test", s.Props.Get(ical.PropSummary).Value)
		if s, err := s.Props.Get(ical.PropDateTimeStart).DateTime(time.UTC); err != nil {
			t.Fatalf("Reading the DTSTART property failed: %e", err)
		} else {
			assert.Equal(t, time.Date(2023, 1, 1, 12, 00, 00, 00, time.UTC), s)
		}
		if s, err := s.Props.Get(ical.PropDateTimeEnd).DateTime(time.UTC); err != nil {
			t.Fatalf("Reading the DTEND property failed: %e", err)
		} else {
			assert.Equal(t, time.Date(2023, 1, 2, 13, 00, 00, 00, time.UTC), s)
		}
	}
}

func TestParseCsvRecordWrongDateTimeFormat(t *testing.T) {
	input := []string{"Test", "2023-01-01_12:00", "2023-01-02 13:00"}
	if _, err := internal.ParseCsvRecord(input, []string{"SUMMARY", "DTSTART", "DTEND"}, "2006-01-02 15:04", time.UTC); err != nil {
		assert.Contains(t, err.Error(), "can not parse date in record 2023-01-01_12:00:")
	} else {
		t.Fatalf("Reading a record with a wrong datetime format did not fail")
	}
}

func TestParseCsvRecordWithCustomProperty(t *testing.T) {
	input := []string{"Test", "2023-01-01 12:00", "2023-01-02 13:00", "Custom"}
	if s, err := internal.ParseCsvRecord(input, []string{"SUMMARY", "DTSTART", "DTEND", "X-CUSTOM"}, "2006-01-02 15:04", time.UTC); err != nil {
		t.Fatalf("Reading the input failed: %e", err)
	} else {
		assert.Equal(t, "Custom", s.Props.Get("X-CUSTOM").Value)
	}
}
