# Contributing to KalaSutra AI

First off, thank you for considering contributing to KalaSutra AI! It's people like you that make this project a great educational tool.

## How Can I Contribute?

### Reporting Bugs

If you find a bug, please create an issue on our repository. Include:
* A clear, descriptive title.
* Steps to reproduce the behavior.
* The expected behavior.
* Information about your environment (OS, Node.js version, Python version, Browser).

### Suggesting Enhancements

We're always looking to add new cultural geometries or improve the AI Teacher. When suggesting an enhancement, please include:
* A clear description of the feature or improvement.
* Why this enhancement would be useful.
* Any relevant examples or mockups.

### Pull Requests

1. Fork the repository and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation in the respective `README.md` files (`backend/README.md` or `frontend/README.md`).
4. Ensure your code lints (run `npm run lint` in the frontend directory).
5. Ensure the backend starts without errors.
6. Issue a Pull Request with a clear description of the changes.

## Development Setup

See the [README.md](README.md) for full setup instructions.

### Frontend
The frontend is built with React, Vite, and TailwindCSS.
* Start dev server: `npm run dev`
* Run linter: `npm run lint`

### Backend
The backend is built with FastAPI and the Google GenAI SDK.
* Install requirements: `pip install -r requirements.txt`
* Start server: `uvicorn app.main:app --reload`

## Styleguides

### Git Commit Messages
* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Consider using semantic commit messages (e.g., `feat:`, `fix:`, `docs:`).

### Code Style
* **Python**: Follow PEP 8 guidelines.
* **TypeScript/React**: Follow standard React conventions. Avoid `any` types where possible.

Thank you for contributing!
