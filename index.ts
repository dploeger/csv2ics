import { CLI, Shim } from 'clime'
import * as Path from 'path'

let cli = new CLI('csv2ics', Path.join(__dirname, 'lib', 'commands'))
let shim = new Shim(cli)
shim.execute(process.argv)
