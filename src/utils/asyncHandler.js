//try catch async handler
// Standard async handler utility for Express route handlers.
// Usage:
// import { asynchandler } from './asyncHandler.js'
// router.get('/', asynchandler(async (req, res) => { ... }))

// Named export `asynchandler` to match imports in controllers.
export const asynchandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => next(error));
  };
};

// Backwards-compatible alias (optional) if some files import `asyncHandler`.
export const asyncHandler = asynchandler;