# showcase for ots

A showcase for ots. Simple project's manager with oauth implicit + bearer flow.


# Get started

Install client
```sh
cd frontend
npm install -g gulp bower
bower install && npm install
gulp build
```
install server
```sh
cd backend
npm install
```

# Usage

create an .env file in backend dir, and specify your options (here is an example):
```sh
SERVER_API_PORT=8080
SERVER_API_DOMAIN=http://example.com
OAUTH_CLIENT_ID=GOOGLE_OAUTH_CLIENT_ID
OAUTH_CLIENT_SECRET=GOOGLE_OAUTH_CLIENT_SECRET
OAUTH_CALLBACK_URL=http://example.com/oauth
DB_URI=mysql://root:root@localhost:3276/test
```

the start up:
```sh
node .
```

This will start app on 8080 port


License
----

MIT