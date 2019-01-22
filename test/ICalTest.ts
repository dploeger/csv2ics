import { ICal } from '../lib/ICal'
import { expect } from 'chai'

describe('ICal-API', () => {
    it('should create a calendar out of a list of events with the default header list', () => {
        let api = new ICal({
            headerMap: [
                'SUMMARY',
                'DTSTART',
                'DTEND',
                'DESCRIPTION',
                'LOCATION'
            ],
            calendarName: 'Test calendar',
            timezone: 'UTC',
            dateFormat: 'YYYY-MM-DD HH:mm:ss'
        })

        return api
            .listToCalendar([
                [
                    'Testevent',
                    '2018-12-01 12:00:00',
                    '2018-12-01 13:00:00',
                    'Test description',
                    'Testlocation'
                ],
                [
                    'Testevent 2',
                    '2018-12-02 12:00:00',
                    '2018-12-02 13:00:00',
                    'Test description 2',
                    'Testlocation 2'
                ]
            ])
            .then((calendar: any) => {
                expect(calendar.calname).to.be.equal('Test calendar')
                expect(calendar.tzid).to.be.equal('UTC')
                expect(calendar.events).to.have.lengthOf(2)
                expect(calendar.events[0].summary).equals('Testevent')
                expect(calendar.events[0].start.toJSON()).equals(
                    new Date(2018, 11, 1, 12, 0, 0).toJSON()
                )
                expect(calendar.events[0].end.toJSON()).equals(
                    new Date(2018, 11, 1, 13, 0, 0).toJSON()
                )
                expect(calendar.events[0].description).equals(
                    'Test description'
                )
                expect(calendar.events[0].location).equals('Testlocation')
                expect(calendar.events[1].summary).equals('Testevent 2')
                expect(calendar.events[1].start.toJSON()).equals(
                    new Date(2018, 11, 2, 12, 0, 0).toJSON()
                )
                expect(calendar.events[1].end.toJSON()).equals(
                    new Date(2018, 11, 2, 13, 0, 0).toJSON()
                )
                expect(calendar.events[1].description).equals(
                    'Test description 2'
                )
                expect(calendar.events[1].location).equals('Testlocation 2')
            })
    })
    it('should support additional fields', () => {
        let api = new ICal({
            headerMap: [
                'SUMMARY',
                'DTSTART',
                'DTEND',
                'DESCRIPTION',
                'LOCATION',
                'X-SPECIAL-FIELD'
            ],
            calendarName: 'Test calendar',
            timezone: 'UTC',
            dateFormat: 'YYYY-MM-DD HH:mm:ss'
        })

        return api
            .listToCalendar([
                [
                    'Testevent',
                    '2018-12-01 12:00:00',
                    '2018-12-01 13:00:00',
                    'Test description',
                    'Testlocation',
                    'Specialfield1'
                ],
                [
                    'Testevent 2',
                    '2018-12-02 12:00:00',
                    '2018-12-02 13:00:00',
                    'Test description 2',
                    'Testlocation 2',
                    'Specialfield2'
                ]
            ])
            .then((calendar: any) => {
                expect(calendar.calname).to.be.equal('Test calendar')
                expect(calendar.tzid).to.be.equal('UTC')
                expect(calendar.events).to.have.lengthOf(2)
                expect(calendar.events[0].summary).equals('Testevent')
                expect(calendar.events[0].start.toJSON()).equals(
                    new Date(2018, 11, 1, 12, 0, 0).toJSON()
                )
                expect(calendar.events[0].end.toJSON()).equals(
                    new Date(2018, 11, 1, 13, 0, 0).toJSON()
                )
                expect(calendar.events[0].description).equals(
                    'Test description'
                )
                expect(calendar.events[0].location).equals('Testlocation')
                expect(
                    calendar.events[0].additionalTags['X-SPECIAL-FIELD']
                ).equals('Specialfield1')
                expect(calendar.events[1].summary).equals('Testevent 2')
                expect(calendar.events[1].start.toJSON()).equals(
                    new Date(2018, 11, 2, 12, 0, 0).toJSON()
                )
                expect(calendar.events[1].end.toJSON()).equals(
                    new Date(2018, 11, 2, 13, 0, 0).toJSON()
                )
                expect(calendar.events[1].description).equals(
                    'Test description 2'
                )
                expect(calendar.events[1].location).equals('Testlocation 2')
                expect(
                    calendar.events[1].additionalTags['X-SPECIAL-FIELD']
                ).equals('Specialfield2')
            })
    })
})
