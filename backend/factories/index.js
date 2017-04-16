var UserSchemaMessageFactory = require('./messages/models/UserSchemaMessageFactory'),
  AuthMessageFactory = require('./messages/ctrl/AuthMessageFactory'),
  GenericMessageFactory = require('./messages/GenericMessageFactory'),
  VersionAppMessageFactory = require('./messages/services/VersionAppMessageFactory'),
  UserCreateMessageFactory = require('./messages/services/UserCreateMessageFactory'),
  MailAliasMessageFactory = require('./messages/services/MailAliasMessageFactory.js');

module.exports = {
  messages: {
    models: {
      UserSchema: UserSchemaMessageFactory
    },
    ctrl: {
      Auth: AuthMessageFactory
    },
    services: {
      VersionAppMessageFactory: VersionAppMessageFactory,
      UserCreateMessageFactory: UserCreateMessageFactory,
      MailAliasMessageFactory: MailAliasMessageFactory
    },
    Generic: GenericMessageFactory
  }
};
