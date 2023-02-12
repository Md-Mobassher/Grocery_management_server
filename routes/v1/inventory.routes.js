const express = require("express");
const inventoryControllers = require("../../controllers/inventory.controller");
const router = express.Router();


router
  .route("/")
  /**
   * @api {get /inventory All inventory
   * @apiDescription Get all the inventory
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the tools.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(inventoryControllers.getAllInventory)

  /**
   * @api {post} /inventory save a inventory
   * @apiDescription save a inventory
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} inventory addeed with id
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .post(inventoryControllers.saveAInventory);
  


router
  .route("/:id")
  /**
   * @api {get} /inventory/:id  get inventory
   * @apiDescription get a specific inventory
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} specific inventory
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get( inventoryControllers.getInventoryDetail)
//   .patch(inventoryControllers.updateTool)
//   .delete(inventoryControllers.deleteTool);

module.exports = router;