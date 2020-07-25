
React Router v5.1.0 with hooks

There is a new useHistory hook in React Router >5.1.0 if you are using React >16.8.0 and functional components.

import { useHistory } from "react-router-dom";

function HomeButton() {
  const history = useHistory();

  function handleClick() {
    history.push("/home");
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}
React Router v4

With v4 of React Router, there are three approaches that you can take to programmatic routing within components.

Use the withRouter higher-order component.
Use composition and render a <Route>
Use the context.
React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.

A history instance has two methods for navigating: push and replace. If you think of the history as an array of visited locations, push will add a new location to the array and replace will replace the current location in the array with the new one. Typically you will want to use the push method when you are navigating.

In earlier versions of React Router, you had to create your own history instance, but in v4 the <BrowserRouter>, <HashRouter>, and <MemoryRouter> components will create a browser, hash, and memory instances for you. React Router makes the properties and methods of the history instance associated with your router available through the context, under the router object.

1. Use the withRouter higher-order component
The withRouter higher-order component will inject the history object as a prop of the component. This allows you to access the push and replace methods without having to deal with the context.

import { withRouter } from 'react-router-dom'
// this also works with react-router-native

const Button = withRouter(({ history }) => (
  <button
    type='button'
    onClick={() => { history.push('/new-location') }}
  >
    Click Me!
  </button>
))
2. Use composition and render a <Route>
The <Route> component isn't just for matching locations. You can render a pathless route and it will always match the current location. The <Route> component passes the same props as withRouter, so you will be able to access the history methods through the history prop.

import { Route } from 'react-router-dom'

const Button = () => (
  <Route render={({ history}) => (
    <button
      type='button'
      onClick={() => { history.push('/new-location') }}
    >
      Click Me!
    </button>
  )} />
)
3. Use the context*
But you probably should not

The last option is one that you should only use if you feel comfortable working with React's context model (React's Context API is stable as of v16).

const Button = (props, context) => (
  <button
    type='button'
    onClick={() => {
      // context.history.push === history.push
      context.history.push('/new-location')
    }}
  >
    Click Me!
  </button>
)

// you need to specify the context type so that it
// is available within the component
Button.contextTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  })
}
1 and 2 are the simplest choices to implement, so for most use cases, they are your best bets.
