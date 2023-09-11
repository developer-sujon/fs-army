//External Lib Import
const routes = require("express").Router();

//Internal Lib Import
const { authController } = require("../api/v1/auth");
const {
  categoryControllers,
  invoiceControllers,
  bidControllers,
  ticketControllers,
  userControllers,
} = require("../api/v1");
const {
  role: { roleType },
} = require("../constant/enums");
const authentication = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");
const ownership = require("../middlewares/ownership");

//auth routes
routes
  .post("/api/v1/auth/signup", authController.register)
  .post("/api/v1/auth/signin", authController.login);

//category routes
routes
  .route("/api/v1/categories")
  .get(authentication, authorize([roleType.ADMIN]), categoryControllers.findAll)
  .post(
    authentication,
    authorize([roleType.ADMIN]),
    categoryControllers.createItem
  );
routes
  .route("/api/v1/categories/:id")
  .get(
    authentication,
    authorize([roleType.ADMIN]),
    ownership("Category"),
    categoryControllers.findSingle
  )
  .patch(
    authentication,
    authorize([roleType.ADMIN]),
    ownership("Category"),
    categoryControllers.updateProperties
  )
  .delete(
    authentication,
    authorize([roleType.ADMIN]),
    ownership("Category"),
    categoryControllers.removeItem
  );

//invoice routes
routes
  .route("/api/v1/invoices")
  .get(authentication, authorize([roleType.ADMIN]), invoiceControllers.findAll)
  .post(
    authentication,
    authorize([roleType.ADMIN]),
    invoiceControllers.createItem
  );
routes
  .route("/api/v1/invoices/:id")
  .get(
    authentication,
    authorize([roleType.ADMIN]),
    ownership("Invoice"),
    invoiceControllers.findSingle
  )
  .patch(
    authentication,
    authorize([roleType.ADMIN]),
    ownership("Invoice"),
    invoiceControllers.updateProperties
  )
  .delete(
    authentication,
    authorize([roleType.ADMIN]),
    ownership("Invoice"),
    invoiceControllers.removeItem
  );

//bid routes
routes
  .route("/api/v1/bids")
  .get(authentication, authorize([roleType.ADMIN]), bidControllers.findAll)
  .post(authentication, authorize([roleType.ADMIN]), bidControllers.createItem);

routes
  .route("/api/v1/bids/:id")
  .get(
    authentication,
    authorize([roleType.ADMIN]),
    ownership("Bid"),
    bidControllers.findSingle
  )
  .patch(
    authentication,
    authorize([roleType.ADMIN]),
    ownership("Bid"),
    bidControllers.updateProperties
  )
  .delete(
    authentication,
    authorize([roleType.ADMIN]),
    ownership("Bid"),
    bidControllers.removeItem
  );

//ticket routes
routes
  .route("/api/v1/tickets")
  .get(authentication, authorize([roleType.ADMIN]), ticketControllers.findAll)
  .post(
    authentication,
    authorize([roleType.ADMIN]),
    ticketControllers.createItem
  );

routes
  .route("/api/v1/tickets/:id")
  .get(
    authentication,
    authorize([roleType.ADMIN]),
    ownership("Ticket"),
    ticketControllers.findSingle
  )
  .patch(
    authentication,
    authorize([roleType.ADMIN]),
    ownership("Ticket"),
    ticketControllers.updateProperties
  )
  .delete(
    authentication,
    authorize([roleType.ADMIN]),
    ownership("Ticket"),
    ticketControllers.removeItem
  );

//user routes
routes
  .route("/api/v1/users")
  .get(authentication, authorize([roleType.ADMIN]), userControllers.findAll)
  .post(
    authentication,
    authorize([roleType.ADMIN]),
    userControllers.createItem
  );

routes
  .route("/api/v1/users/:id")
  .get(authentication, authorize([roleType.ADMIN]), userControllers.findSingle)
  .patch(
    authentication,
    authorize([roleType.ADMIN]),
    // ownership("Ticket"),
    userControllers.updateProperties
  );

module.exports = routes;
