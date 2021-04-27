# The BasePage component

The `<BasePage />` component is a component that handled the mounting logic of every page on the app.

It does a few things: 

- Sets the content of each page's `<h1 />` tag
- Hides the nav when the page mounts
- Waits for related required contexts (eg, User and Artist) to load and toggles the global loading state if necessary.

## Props

The `<BasePage />` component accepts several (optional) props:

- **headerConfig** `PropTypes.object`

  The text and punctuation of the page header

- **artistRequired** `PropTypes.bool`

  Does the page require current user artist to be loaded before it is ready?

- **staticPage** `PropTypes.bool`

  Does the page require any API calls to be finished before it is ready?

- **authPage** `PropTypes.bool`

  Is the page part of the authorisation flow?

- **children** `PropTypes.node.isRequired`

  The page contents
