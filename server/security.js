module.exports = security
var cors = require('cors')
var helmet = require('helmet')

function security(self) {
	self.app.use(helmet(self.settings.bodyparser.helmet))

	self.app.use(cors())
}