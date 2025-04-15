# PathFinder

A modern Angular 18 application that demonstrates advanced URL parameter handling for dynamic data filtering.

![PathFinder Logo](src/assets/pathfinder-logo.png)

## Overview

PathFinder is a sophisticated Angular application that showcases how to handle optional URL parameters for filtering data based on city, program, and category. The application supports a flexible URL structure:

```
DOMAIN.COM/CITY-NAME/PROGRAM-NAME/CATEGORY-NAME
```

Where each parameter is optional, allowing for various URL combinations:

1. `/city-name/` - Shows all programs in a specific city
2. `/city-name/program-name` - Shows details for a specific program in a city
3. `/city-name/program-name/category-name` - Shows filtered program details by category

## Key Features

- **Smart URL Parameter Handling**: Efficiently processes optional URL parameters
- **Dynamic Routing**: Supports multiple URL structure variations
- **Intelligent Validation**: Redirects to 404 page for invalid parameters
- **Reactive State Management**: Uses Angular Signals for state management
- **Modern UI**: Clean, responsive design with smooth animations
- **Type Safety**: Fully typed with TypeScript interfaces

## Technology Stack

- **Angular 18**: Latest version with standalone components
- **TypeScript**: For type safety and better developer experience
- **RxJS**: For reactive programming
- **Angular Signals**: For state management
- **SCSS**: For advanced styling capabilities

## Project Structure

The application follows a clean, modular architecture:

```
src/
├── app/
│   ├── components/     # UI components
│   ├── models/         # TypeScript interfaces
│   ├── services/       # Data and validation services
│   └── shared/         # Shared utilities
├── assets/            # Static assets
└── environments/      # Environment configurations
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm (v8+)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pathfinder.git
   cd pathfinder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:4200`

## Deployment

The application can be easily deployed to Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure the build settings:
   - Build Command: `ng build`
   - Output Directory: `dist/url-parameter-app/browser`

## Development

### Code Scaffolding

Generate new components, services, etc. using Angular CLI:

```bash
ng generate component components/new-component
```

### Building for Production

```bash
ng build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Angular Team for the excellent framework
- The open-source community for inspiration and support
