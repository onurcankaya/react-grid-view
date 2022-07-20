## React Grid View

You can see the deployed version here: https://react-grid-view.netlify.app

![app-screenshot](./src/assets/images/app.png)

#### Install dependencies

```
yarn
```

#### Run

```
yarn start
```

#### Run tests

```
yarn test
```

### Steps

- Initialized the app with create-react-app
- Implemented fetching of the data provided when the app first loads.
- Built a dynamic grid system to showcase the images in a grid layout.
  - By measuring the height of each image on load event, I calculated the `grid-row-end` span dynamically to make the grid system more dynamic, fluid and responsive.
- Implemented a Modal component to show the larger version of each image in a modal view
- Implemented a Search form to dynamically search through the images based on the image title, on input change.
- Implemented a Pagination component to simulate a real-word image gallery that has pagination.
- I wanted to showcase my experience with testing, but I did not want to spend too much time testing every single component, so I have picked the most complex component I created, which is the Pagination component, and written tests with 100% coverage, including some edge cases.
- I have also added my preferred eslint & prettier configuration, for my own developer experience.

<br>

As my tech stack I used:

- React
- TypeScript
- Styled Components
- Jest
- React Testing Library<br>

<br>
