# School Equipment Rental and Management Service (Frontend)

This repository, located at [junseng12/DBproject](https://github.com/junseng12/DBproject), contains **only the React JS-based frontend code** for the School Equipment Rental and Management Service project.  
It consists mainly of reusable frontend components and pages.

⚠️ **Please note:** This project **does not include backend code** (e.g., API, database, authentication).  
To run this project in a fully functional state, you must connect it to a separately implemented backend server.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Setup](#environment-setup)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

This service allows users to browse, request, and manage the rental of various school equipment.  
The frontend, built with React JS, enables users to view equipment listings, submit rental requests, and monitor rental statuses. The actual data processing and business logic are handled by a separately managed backend.

## Features

- **Responsive UI:** Optimized user experience across various devices.
- **Equipment Catalog:** Search and view detailed information on available school equipment.
- **Rental Requests:** Submit and monitor rental requests.
- **Dashboard:** View user rental history, active requests, and upcoming returns.
- **Real-time Notifications:** Get status updates through backend integration.

## Tech Stack

- **Frontend:** React JS, HTML5, CSS3, JavaScript (ES6+)
- **Package Manager:** npm or yarn
- **Build Tool:** Create React App (or a similar tool)
- **Version Control:** Git, GitHub

## Installation

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/junseng12/DBproject.git
   cd DBproject
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory with the following content:

   ```env
   REACT_APP_API_URL=https://your-backend-api-url.com
   ```

4. **Run the project:**

   ```bash
   npm start
   # or
   yarn start
   ```

   The app will be available at: http://localhost:3000

## Usage

- Browse equipment list and view detailed info  
- Submit rental requests  
- Check rental status and history on dashboard  
- (With backend) Log in and manage your profile

## Environment Setup

- `package.json`: handles project dependencies and scripts  
- `.env`: defines environment-specific configuration such as API URL

## Contributing

Contributions are welcome!

1. Fork this repository  
2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add your feature"
   ```

4. Push the branch:

   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For any questions or suggestions, please contact: junseng12@gmail.com
