## Introduction

ValueLabs React Bolierplate with Redux, Saga, Sass, Multilingual and Testing Support. It also comes with generators.

## Important Scripts

### Setup

1. Base Setup `yarn install`

### Common

1. Local Server `npm run start`
2. Local Server on Diffrent Port `npm start -- --port 5000`
3. Mock Api `npm run start-mockapi`
4. Before Git Commit `npm run build`

### Quality

1. Complete Static Code Analysis `npm run lint`
2. JS Static Code Analysis `npm run lint:js`
3. CSS Static Code Analysis `npm run lint:css`
4. Run Test `npm run test`
5. Run Specific Component Test `npm run test-specific -- about`
6. Give Coverage Report `npm run coveralls`

### Automations

1. Create Component Skelton `npm run generate component`
2. Create Container Skelton `npm run generate container`
3. Adds New Langauge Skelton `npm run generate language`
4. Extract JSON File for Langauge `npm run extract-intl`
5. Fixes all JS Lint issue `npm run lint:eslint:fix`, please handle these while coding, try not to run this
6. Updates Transaltionfolder with all the label used `npm run extract-intl`
7. Fixing all the indentation issues `npm run prettify`, please handle these while coding, try not to run this

### Build

1. install node v12 and npm
2. install git cli <github-url>
   git clone ssh://git@github.com/[username]/[repository-name].git
3. GIT <github-url>
