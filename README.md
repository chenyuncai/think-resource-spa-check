# think-resource-spa

This is an exact middleware of the ThinkJS to config the SPA resource.

We don't need the nginx to rewrite the request to a exact dir anymore.

## Install

```
npm install think-resource-spa
```

## How to use

ensure to config the 'resource_spa' with an Array Object which the value is a sample string and turn resource_on with true

file config.js

```
{
    resource_on: true,
    resource_spa: ['firstspa/', 'secondspa/', 'static/firstAppOrAny/']
}
```

and we need to update the hook config about 'resource' only to replace the  original 'check_resource' middleware

file hook.js
```
{
    resource: ['think_resource_spa', 'output_resource'],
}
```

After that, we need register the middleware in the bootstrap folder

middleware.js

```
let spaCheck = require('think-resource-spa')
think.middleware('think-resource-spa', spaCheck);
```


now we have a request like 'http://example.com/firstspa', 'http://example.com/firstspa/', 'http://example.com/firstspa/routeone/param1' will run exactly what you want


So we can develop SPA apps with ThinkJS easily with Ng2,Vue2,  and the ThinkJS only provide the API module we call 'Backend Service'


## LICENSE

MIT