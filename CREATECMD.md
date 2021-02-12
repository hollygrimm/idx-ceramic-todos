# Steps to create Angular Ceramic App
Adapted from:
https://blog.ceramic.network/how-to-build-a-simple-notes-app-with-idx/

# Install NPM, Create Angular Project with ngrx, material, flex-layout

## Downgrade NPM
breaking change on Feb 2 https://github.com/angular/angular-cli/issues/19957#issuecomment-773569798  will be fixed...
```
npm install --global npm@6
```

create angular project:
```
ng new ceramic-todos
  NO stricter type checking angularCompilerOptions
  angular routing
  SCSS
```
```
cd ceramic-todos
```

add ngrx:
```
npm i -—save @ngrx/store@latest @ngrx/effects@latest @ngrx/store-devtools@latest @ngrx/router-store@latest @ngrx/entity@latest --legacy-peer-deps
```

add layout:
```
ng add @angular/material
npm i @angular/flex-layout
npm i serialize-error
```

add custom webpack for crypto
```
npm i @angular-builders/custom-webpack
```

add support for asynciterator with rxjs
```
npm install ix
```

## Install Ceramic Studio Tools
```
npm install -g @ceramicstudio/idx-cli

npm install @ceramicnetwork/cli @ceramicnetwork/http-client @ceramicstudio/idx-tools 3id-connect@next dids
npm install authereum fortmatic web3modal @walletconnect/web3-provider
```

add to package.json, scripts:
```
"bootstrap": "node ./bootstrap.js",
"ceramic": "ceramic daemon",
```

## Run Local Ceramic node
open terminal and run:
```
npm run ceramic
```

## Bootstrap local node with IDX documents
open second terminal and run
```
idx bootstrap
```

## Create Ceramic schema and definition
create bootstrap.js document on root

run:
```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
run:
```
SEED=<your seed from above> npm run bootstrap
```

creates config.json with globally unique schemas and definition DocIDs and can be shared with other apps

run:
```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

FIXME Local User Seed: f80aded2939e3943e89f386345d044085bb98009b3915d36e48affe5b4daf2e8

```
idx did:create --label=local --seed=<seed from above>
```

returns:
did:key:z6MkoU3XveeHLQ1jLzZorHFjRFeEzG47hzzcMavycbtwxo2G

from config.json get the schema URL

```
idx tile:create local '{"title":"My task title"}' --schema=ceramic://k3y52l7qbv1frxyrxtjpyg1lw0br7hp1boy3e2oqxe5xl88ukpfyrimqz4w5aue4g
```

returns:
DocID: kjzl6cwe1jw14axqvirxii39agxjwt0n5tga3ntoivqgvg77xhkubvx0my6h3i7


from config.json get "definitions"/"tasks"
kjzl6cwe1jw149bvnp5g1m21zc0zoeca28pohircfeutcrkozbeeu69vx4yx33u

```
idx index:set local kjzl6cwe1jw149bvnp5g1m21zc0zoeca28pohircfeutcrkozbeeu69vx4yx33u '{"tasks":[{"id":"ceramic://kjzl6cwe1jw14axqvirxii39agxjwt0n5tga3ntoivqgvg77xhkubvx0my6h3i7","title":"First"}]}'
```

```
idx index:set local kjzl6cwe1jw1486y8ahz88noyg8vmra4erhraskiv117b08lgu28ql4epvlg46l '{
    "tasks": [
        {
            "id": "ceramic://kjzl6cwe1jw146lwcdn6y31t3vg4n7nk17mdf0ziwc08s8ew9t5sva2hg20rs79",
            "title": "First"
        },
        {
            "id": "ceramic://kjzl6cwe1jw148u1veneb9tvgvoembezgin32ncw44ajgd7ockpjex4of56qlyn",
            "title": "Second"
        }
    ]
}'
```


## Check task and task lists can be created
put definition key into next call:
```
idx index:get local kjzl6cwe1jw1486y8ahz88noyg8vmra4erhraskiv117b08lgu28ql4epvlg46l
```

get tasks by DocID:
```
idx tile:get ceramic://kjzl6cwe1jw146lwcdn6y31t3vg4n7nk17mdf0ziwc08s8ew9t5sva2hg20rs79
idx tile:get ceramic://kjzl6cwe1jw148u1veneb9tvgvoembezgin32ncw44ajgd7ockpjex4of56qlyn
```

## add idx and random
```
npm install @ceramicstudio/idx @stablelib/random
```

## Core module
```
ng g module core
ng g @angular/material:nav core/components/nav
ng g @angular/material:dashboard core/components/home
ng g component core/components/my-snack-bar
```

## Root store setup
```
npm i -—save @ngrx/schematics@latest --legacy-peer-deps
npm i -—save @ngrx/router-store@latest --legacy-peer-deps
npm i -—save @ngrx/data@latest --legacy-peer-deps
ng g @ngrx/schematics:store State --root --module app.module.ts  #creates Root reducers
ng config cli.defaultCollection @ngrx/schematics
```

## Tasks module
```
ng g module tasks
ng g component tasks/containers/ListDisplay
ng g component tasks/components/List
ng g interface tasks/models/Task
ng g service tasks/services/Task
ng g @ngrx/schematics:action tasks/store/actions/task -group
ng g @ngrx/schematics:reducer tasks/store/reducers/task -group
ng g @ngrx/schematics:effect tasks/store/effects/task -m tasks/tasks.module.ts -group
```

## Core store
```
ng g @ngrx/schematics:action core/store/actions/idx-gateway -group
ng g @ngrx/schematics:reducer core/store/reducers/idx-gateway -group
ng g @ngrx/schematics:effect core/store/effects/idx-gateway -m core/core.module.ts -group
ng g @ngrx/schematics:action core/store/actions/error -group
ng g @ngrx/schematics:reducer core/store/reducers/error -group
ng g @ngrx/schematics:effect core/store/effects/error -m core/core.module.ts -group
ng g @ngrx/schematics:action core/store/actions/snack-bar -group
ng g @ngrx/schematics:reducer core/store/reducers/snack-bar -group
ng g @ngrx/schematics:effect core/store/effects/snack-bar -m core/core.module.ts -group
ng g @ngrx/schematics:action core/store/actions/spinner -group
ng g @ngrx/schematics:reducer core/store/reducers/spinner -group
ng g @ngrx/schematics:effect core/store/effects/spinner -m core/core.module.ts -group
ng g interface core/models/SnackBar
ng g service core/services/IdxProvider
ng g service core/services/SpinnerOverlay
ng g service core/services/AppErrorHandler
ng g service core/services/SnackBar
ng g interceptor core/services/HttpError
ng generate component core/containers/NotFoundPage
```

modify core.module.ts to create COMPONENTS Array
```
  declarations: COMPONENTS,
  exports: COMPONENTS,
```

add core module to app.module.ts
```
import { CoreModule } from './core/core.module';
```

add RouterModule to core.module.ts:
```
import { RouterModule } from '@angular/router';
```

## Navigation

add to NavComponent in navcomponent.ts
```
menuItems = ['home', 'tasks'];
```

modify navcomponent.html
```
    <mat-nav-list>
      <a *ngFor="let item of menuItems" mat-list-item [routerLink]="'/'+item"> {{item | titlecase}} </a>
    </mat-nav-list>
```

remove everything from app.component.html and add this:
```
<app-nav></app-nav>
```

replace <--Add Content ...> in nav.component.html with:
```
<router-outlet></router-outlet>
```

## Add Home to Routing

modify app-routing.module.ts with
```
const routes: Routes = [
  {
    path: '',
    redirectTo: '/home', 
    pathMatch: 'full' 
  },
  {
    path: 'home',
    component: HomeComponent
  },  
  {
    path: 'tasks',
    loadChildren: () => import('./tasks/tasks.module').then(value => value.TasksModule),
    // FIXME: canLoad: [guards.IdxConnectGuard]
  },
];
```

# Ceramic imports require
add to tsconfig.json compilerOptions:
```
"resolveJsonModule": true,
"skipLibCheck": true,
```

add custom webpack to angular.json
