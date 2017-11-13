# grantentry

This react project provides an interface for Ledger volunteers to quickly enter
data from 990 PDFs. You get a split screen with PDFs on the left and our
grant entry form on the right.

## Install

This project requires at least node 6 and either a running local copy of the
[Ledger Backend](https://github.com/detroitledger/gnl_profile),
or a proxy to the frontend (see the "local dev" note below)

To install dependencies:

```
yarn install
```

## Local dev with proxy to prod server

When developing locally, start the create-react-app server with:

```
npm run dev
```

This creates a proxy that will forward requests to the dev server.

Then, log in with your account at `https://localhost:3000/user`. You will get
redirected after logging in but just flip back to `https://localhost:3000/user`
to verify that you are logged in. Add some PDFs for yourself as documented
[in our prototype doc](https://docs.google.com/document/d/1n5cPukP2cEdlmCV9YqwgpYyOITPaiuxjiir-rX7P4ec/edit#heading=h.44ejuwli3tac).

Now, navigate to `https://localhost:3000` and the react app should load up just
fine. If something goes wrong, make sure you aren't at 127.0.0.1:3000 or some
other local address -- that won't work.

## Run tests

Use `yarn test` to run the jest unit tests, and `yarn lint` to run eslint. Our circleci bot will run both the linter and jest suites.

## Debugging tests

Open `chrome://inspect/#devices` in a Chrome tab
Run

```
./node_modules/.bin/react-scripts --inspect-brk test --runInBand --no-cache --env=jsdom src/actions/index.test.js`
```

(or whatever test you want to run, or just leave off the name to run all tests)
Go to the Chrome tab and attach to the new target.

OR... use vs code & the config recommended in the jest docs.

## Full devs documentation

This project was built with create-react-app. See `README-CRA.md` for the full
documentation.
