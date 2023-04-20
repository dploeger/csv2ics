package internal

import (
	"fmt"
	"github.com/emersion/go-ical"
	"github.com/google/uuid"
	"time"
)

func ParseCsvRecord(record []string, headerMap []string, dateTimeFormat string, location *time.Location) (*ical.Event, error) {
	ev := ical.NewEvent()
	ev.Props.SetDateTime(ical.PropDateTimeStamp, time.Now())
	ev.Props.SetText(ical.PropUID, uuid.New().String())
	for i, prop := range headerMap {
		var p *ical.Prop
		switch prop {
		case "DTSTART", "DTEND":
			if record[i] != "" {
				p = ical.NewProp(prop)
				if t, err := time.ParseInLocation(dateTimeFormat, record[i], location); err != nil {
					return nil, fmt.Errorf("can not parse date in record %s: %s", record[i], err.Error())
				} else {
					p.SetDateTime(t)
				}
			}
		default:
			p = ical.NewProp(prop)
			p.SetText(record[i])
		}
		if p != nil {
			ev.Props.Add(p)
		}
	}
	return ev, nil
}
