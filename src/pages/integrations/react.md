export const filename = __filename

# Usage with React


## `<NavProvider>`

Your app's `<NavProvider>` component is responsible for subscribing to the latest navigation state, and passing that state to Navi's *other* components.

As a result, all other components must be rendered inside a `<NavProvider>`.

### Props

#### `navigation`: [`Navigation`](../../reference/navigation/#navigation-interface)

Your app's `Navigation` object, as returned from [`createBrowserNavigation()`](../../reference/navigation/#createbrowsernavigation) or [`createMemoryNavigation()`](../../reference/navigation/#creatememorynavigation)


## `<NavLink>`

This component can be used as a drop-in replacement for `<a>` tags. Internally, it renders an `<a>` tag so that statically rendered links will work even if JavaScript is disabled.

### Props

#### `active: boolean` <small>(optional)</small>

Allows you to explicit enable or disable the `activeClassName` and `activeStyle` props.

#### `activeClassName: string` <small>(optional)</small>

Will be added to your link's `className` if the app's current URL matches the `href` prop, or if the `active` prop is set to `true`.

#### `activeStyle: object` <small>(optional)</small>

Will be merged into your link's `style` if the app's current URL matches the `href` prop, or if the `active` prop is set to `true`.

#### `exact: bool` <small>(optional)</small>

If true, the link will only be considered to "match" the current URL if it is an *exact* match.

By default, a partial match at the beginning of the current URL will also be considered a match. This facilitates nav links, which often need to be highlighted when child pages are active.

#### `href: string` <small>(required)</small>

The url to navigate to; identical to the `href` attribute of a HTML `<a>` tag.

#### `precache: boolean` <small>(required)</small>

If specified, the linked page's content will be loaded as soon as the link is rendered.


## `<NavRoute>`

Renders the content for the latest route that has complete content.

<!--If you'd like to render the next switch that corresponds to the next URL segment -- as opposed to rendering the innermost page - then use `<NavSegment>` or `<NavContentSegment>` instead.-->

If the route's content is a React element or component, then the `render` prop is optional, and that content will be rendered by default. Otherwise, you'll need to provide a render prop to specify how to render the route content. 

### Props

#### <code>children: (route: [Route](../../reference/route-and-segment/#route)) => React.ReactNode</code> <small>(optional)</small>

If provided, the component's `children` must be a [render prop](https://reactjs.org/docs/render-props.html) that takes the current [Route](../../reference/route-and-segment/#route), and returns React element to render.

If not provided, the default behavior is:

1. If `route.content` contains a React element, render it.
2. If `route.content` contains a function, then call it to get the rendered content.
3. Otherwise, if `route.status` is `busy`, don't render anything. 
4. Finally, if `route.content` isn't a React element, and `route.status` isn't `busy`, then throw an error.

### Examples

#### Basic Usage

```js
class App extends Component {
  render() {
    return (
      <NavProvider navigation={this.props.navigation}>
        <div className="App">
          <NavRoute />
        </div>
      </NavProvider>
    );
  }
}
```

#### Usage with render prop

```js
class App extends Component {
  render() {
    return (
      <NavProvider navigation={this.props.navigation}>
        <div className="App">
          <NavRoute>
            {route => route.content}
          </NavRoute>
        </div>
      </NavProvider>
    );
  }
}
```

## `<NavLoading>`

A headless component that outputs a boolean that will be true when it contains a `<NavRoute />`, `<NavSegment />` or `<NavContentSegment />` that is loading.

### Example

```js
class App extends Component {
  render() {
    return (
      <NavProvider navigation={this.props.navigation}>
        <NavLoading>
          {loading =>
            <div className="App">
              <BusyIndicator show={loading} />
              <NavRoute />
            </div>
          }
        </NavLoading>
      </NavProvider>
    );
  }
}
```

## `<NavNotFoundBoundary>`

Catches not found errors thrown by `<NavRoute />`, `<NavSegment />` or `<NavContentSegment />` 

```js
class App extends Component {
  render() {
    return (
      <NavProvider navigation={this.props.navigation}>
        <NavLoading>
          {loading =>
            <Nav.NotFoundBoundary render={() =>
              <h1>Not Found</h1>
            }>
              <div className="App">
                <BusyIndicator show={loading} />
                <NavRoute />
              </div>
            </Nav.NotFoundBoundary>
          }
        </NavLoading>
      </NavProvider>
    );
  }
}
```

## `<NavHistory>`

Allows you to access the [`history`](../../reference/history) property of your app's [`navigation`](../../reference/navigation) object, through a render prop passed to the `children` prop.

This can be used to facilitate programmatic navigation.

## `<NavConsumer>`

Allows you to access the last [`NavigationSnapshot`](../../reference/navigation/#navigationsnapshot-objects) object published by your app's [`navigation`](../../reference/navigation/) object, through a render prop passed to the `children` prop.

<!--
## `<NavSegment>`

TODO


## `<NavContentSegment>`

TODO
-->