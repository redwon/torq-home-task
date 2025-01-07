# Vue 3 + TypeScript + Vite IP Lookup Application

This application allows users to look up geographical information about IP addresses using the ipapi.co API.

## Features

- IP address validation
- Country information lookup
- Timezone display
- LRU cache for API responses
- Responsive design

## Local Development

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies: `npm install`


### Running the Application

To start the development server: `npm run dev`

The application will be available at `http://localhost:5173`

### Running Tests

This project uses Vitest for testing. You can run tests using these commands:

#### Run tests in console
`npm run test`

#### Run tests with UI
`npm run test:ui`

#### Generate coverage report
`npm run coverage`

## CI/CD

This project uses GitHub Actions for continuous integration and deployment:

- All tests are run on push and pull requests
- Successful builds on the main branch are automatically deployed to GitHub Pages

## API Usage

This application uses the [ipapi.co](https://ipapi.co/) service for IP lookups:

- Free tier includes 1,000 requests per day
- Results are cached using LRU cache (max 50 entries)
- API may have rate limiting and availability constraints

## Technical Stack

- Vue 3 with TypeScript
- Vite for build tooling
- Vitest for testing
- Axios for API requests
- LRU Cache for response caching

## Project Structure

The template uses Vue 3 `<script setup>` SFCs. Check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

For TypeScript support, refer to the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).
