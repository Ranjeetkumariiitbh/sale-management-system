# Retail Sales Management System – TruEstate SDE Intern Assignment

## 1. Overview (3–5 lines)

This repository contains a full-stack Retail Sales Management System built for the TruEstate SDE Intern assignment.  
It loads the provided sales dataset on the backend, exposes APIs for querying it, and renders a responsive UI on the frontend.  
The system supports search, multi-criteria filters, sorting, and server-side pagination over a large structured CSV dataset.

## 2. Tech Stack

- **Frontend:** React, Vite, Fetch API, CSS
- **Backend:** Node.js, Express, csv-parser
- **Dev Tools:** Nodemon (for backend auto-restart)
- **Data Source:** Provided retail sales CSV dataset

## 3. Search Implementation Summary

- Search is implemented on the backend across **Customer Name** and **Phone Number** fields.  
- The frontend sends a `search` query parameter to `GET /api/sales`, which is processed case-insensitively.  
- A single query pipeline combines search with all active filters and sorting so that search results remain consistent when filters or sorting change.

## 4. Filter Implementation Summary

- Supported filters:
  - **Customer Region** (multi-select)
  - **Gender** (multi-select)
  - **Age Range** (`ageMin`, `ageMax`)
  - **Product Category** (multi-select)
  - **Tags** (multi-select)
  - **Payment Method** (multi-select)
  - **Date Range** (`dateFrom`, `dateTo`)
- Filter state is kept in a custom React hook and sent as query parameters to the backend.  
- The backend parses these parameters, applies them in a single pass over the in-memory dataset, and returns only the filtered results.

## 5. Sorting Implementation Summary

- Sorting options:
  - **Date (Newest First)** – default
  - **Quantity**
  - **Customer Name (A–Z)**
- Sort configuration (`sortBy`, `sortDir`) is stored in React state and included on every `/api/sales` request.  
- The backend sorts the filtered dataset before pagination so that sorting always respects the current search and filter state.

## 6. Pagination Implementation Summary

- Pagination is implemented on the backend with:
  - `page` (1-based page index)
  - `pageSize` (fixed at 10, as per assignment)
- The backend responds with:
  ```json
  {
    "total": <number of matching records>,
    "page": <current page>,
    "pageSize": 10,
    "totalPages": <computed from total and pageSize>,
    "items": [ /* current page records */ ]
  }
backend/data/truestate_assignment_dataset.csv
cd backend
npm install
# ensure the CSV file is placed at: backend/data/truestate_assignment_dataset.csv
npm run dev
# Backend will run on: http://localhost:4000
cd frontend
npm install
# configure backend URL
echo VITE_API_URL=http://localhost:4000 > .env
npm run dev
# Frontend will run on: http://localhost:5173
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/0296bbc8-d67b-43d7-ad94-b73bec3095ce" />
<img width="1919" height="1053" alt="image" src="https://github.com/user-attachments/assets/bdbe895c-a9b7-4a02-bec4-6949379c0805" />

