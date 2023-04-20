package internal_test

import (
	"csv2ics/internal"
	"github.com/stretchr/testify/assert"
	"strings"
	"testing"
)

func TestReadCsvFile(t *testing.T) {
	input := "a,b,c\n1,2,3"
	if s, err := internal.ReadCsvFile(strings.NewReader(input), true, ","); err != nil {
		t.Fatalf("Reading the input failed: %e", err)
	} else {
		assert.Len(t, s, 1)
		assert.Len(t, s[0], 3)
		assert.Equal(t, s[0][0], "1")
	}
}

func TestReadCsvFileNoHeader(t *testing.T) {
	input := "a,b,c\n1,2,3"
	if s, err := internal.ReadCsvFile(strings.NewReader(input), false, ","); err != nil {
		t.Fatalf("Reading the input failed: %e", err)
	} else {
		assert.Len(t, s, 2)
		assert.Len(t, s[0], 3)
		assert.Equal(t, s[0][0], "a")
		assert.Equal(t, s[1][0], "1")
	}
}

func TestReadCsvFileDelimiter(t *testing.T) {
	input := "a;b;c\n1;2;3"
	if s, err := internal.ReadCsvFile(strings.NewReader(input), true, ";"); err != nil {
		t.Fatalf("Reading the input failed: %e", err)
	} else {
		assert.Len(t, s, 1)
		assert.Len(t, s[0], 3)
		assert.Equal(t, s[0][0], "1")
	}
}

func TestReadCsvFileWrongDelimiter(t *testing.T) {
	input := "a,b,c\n1,2,3"
	if s, err := internal.ReadCsvFile(strings.NewReader(input), true, ";"); err != nil {
		t.Fatalf("Reading the input failed: %e", err)
	} else {
		assert.Len(t, s, 1)
		assert.Len(t, s[0], 1)
		assert.Equal(t, s[0][0], "1,2,3")
	}
}
