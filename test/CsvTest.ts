import { Csv } from '../lib/Csv'
import { expect } from 'chai'
import * as streams from 'memory-streams'
import * as os from 'os'
import { createReadStream } from 'fs'
import { join } from 'path'

describe('Csv-API', () => {
    it('should convert a STDIN CSV file with headers into an array', async () => {
        let csv = new Csv()
        let stream = new streams.ReadableStream('')
        stream.push(
            [
                'name,street,city',
                'Jane Doe,Central Street,Nowhere',
                'John Doe,North Avenue,Somewhere'
            ].join(os.EOL)
        )
        stream.push(null)
        const result = await csv.getDataFromStream(stream, ',', true)
        expect(result).to.be.an('array')
        expect(result).to.have.lengthOf(2)
        expect(result[0]).to.be.an('array')
        expect(result[0]).to.have.lengthOf(3)
        expect(result[0][0]).to.be.equal('Jane Doe')
        expect(result[0][1]).to.be.equal('Central Street')
        expect(result[0][2]).to.be.equal('Nowhere')
        expect(result[1][0]).to.be.equal('John Doe')
        expect(result[1][1]).to.be.equal('North Avenue')
        expect(result[1][2]).to.be.equal('Somewhere')
    })
    it('should convert a STDIN CSV file without headers into an array', async () => {
        let csv = new Csv()
        let stream = new streams.ReadableStream('')
        stream.push(
            [
                'Jane Doe,Central Street,Nowhere',
                'John Doe,North Avenue,Somewhere'
            ].join(os.EOL)
        )
        stream.push(null)
        const result = await csv.getDataFromStream(stream, ',', false)
        expect(result).to.be.an('array')
        expect(result).to.have.lengthOf(2)
        expect(result[0]).to.be.an('array')
        expect(result[0]).to.have.lengthOf(3)
        expect(result[0][0]).to.be.equal('Jane Doe')
        expect(result[0][1]).to.be.equal('Central Street')
        expect(result[0][2]).to.be.equal('Nowhere')
        expect(result[1][0]).to.be.equal('John Doe')
        expect(result[1][1]).to.be.equal('North Avenue')
        expect(result[1][2]).to.be.equal('Somewhere')
    })
    it('should convert a STDIN CSV file with a different delimiter into an array', async () => {
        let csv = new Csv()
        let stream = new streams.ReadableStream('')
        stream.push(
            [
                'Jane Doe;Central Street;Nowhere',
                'John Doe;North Avenue;Somewhere'
            ].join(os.EOL)
        )
        stream.push(null)
        const result = await csv.getDataFromStream(stream, ';', false)
        expect(result).to.be.an('array')
        expect(result).to.have.lengthOf(2)
        expect(result[0]).to.be.an('array')
        expect(result[0]).to.have.lengthOf(3)
        expect(result[0][0]).to.be.equal('Jane Doe')
        expect(result[0][1]).to.be.equal('Central Street')
        expect(result[0][2]).to.be.equal('Nowhere')
        expect(result[1][0]).to.be.equal('John Doe')
        expect(result[1][1]).to.be.equal('North Avenue')
        expect(result[1][2]).to.be.equal('Somewhere')
    })
    it('should convert a STDIN CSV file without headers into an array', async () => {
        let csv = new Csv()
        let stream = new streams.ReadableStream('')
        stream.push(
            [
                'Jane Doe,Central Street,Nowhere',
                'John Doe,North Avenue,Somewhere'
            ].join(os.EOL)
        )
        stream.push(null)

        const result = await csv.getDataFromStream(stream, ',', false)
        expect(result).to.be.an('array')
        expect(result).to.have.lengthOf(2)
        expect(result[0]).to.be.an('array')
        expect(result[0]).to.have.lengthOf(3)
        expect(result[0][0]).to.be.equal('Jane Doe')
        expect(result[0][1]).to.be.equal('Central Street')
        expect(result[0][2]).to.be.equal('Nowhere')
        expect(result[1][0]).to.be.equal('John Doe')
        expect(result[1][1]).to.be.equal('North Avenue')
        expect(result[1][2]).to.be.equal('Somewhere')
    })
    it('should convert a CSV file into an array', async () => {
        let csv = new Csv()
        let stream = createReadStream(join(__dirname, 'fixtures', 'test.csv'))
        const result = await csv.getDataFromStream(stream, ',', true)
        expect(result).to.be.an('array')
        expect(result).to.have.lengthOf(2)
        expect(result[0]).to.be.an('array')
        expect(result[0]).to.have.lengthOf(3)
        expect(result[0][0]).to.be.equal('Jane Doe')
        expect(result[0][1]).to.be.equal('Central Street')
        expect(result[0][2]).to.be.equal('Nowhere')
        expect(result[1][0]).to.be.equal('John Doe')
        expect(result[1][1]).to.be.equal('North Avenue')
        expect(result[1][2]).to.be.equal('Somewhere')
    })
})
