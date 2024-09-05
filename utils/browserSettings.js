import _ from 'lodash'
// import * as minimist from 'minimist'
import minimist from 'minimist';

const settings = {}
const args = minimist(process.argv.slice(2))
_.extend(settings, args)

if (args.headless) {
  settings.headless = true
}
// settings.port = 4444
settings.browserName = 'chrome'
if (args.chrome) settings.browserName = 'chrome'
if (args.ff) settings.browserName = 'firefox'
if (args.firefox) settings.browserName = 'firefox'
if (args.edge) settings.browserName = 'msedge'
// if (args.docker) settings.browserName = 'firefox'

export default settings
