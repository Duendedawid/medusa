import { Request, Response } from "express"
import { IInventoryService } from "../../../../interfaces"

/**
 * @oas [delete] /inventory-itemss/{id}
 * operationId: "DeleteInventoryItemsInventoryItem"
 * summary: "Delete an Inventory Item"
 * description: "Delete an Inventory Item"
 * x-authenticated: true
 * parameters:
 *   - (path) id=* {string} The ID of the Inventory Item to delete.
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Medusa from "@medusajs/medusa-js"
 *       const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       medusa.admin.inventoryItems.delete(inventory_item_id)
 *         .then(({ id, object, deleted }) => {
 *           console.log(id)
 *         })
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl --location --request DELETE 'https://medusa-url.com/admin/inventory-itemss/{id}' \
 *       --header 'Authorization: Bearer {api_token}'
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 * tags:
 *   - InventoryItem
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/AdminInventoryItemsDeleteRes"
 *   "400":
 *     $ref: "#/components/responses/400_error"
 */
export default async (req: Request, res: Response) => {
  const { id } = req.params

  const inventoryService: IInventoryService =
    req.scope.resolve("inventoryService")

  await inventoryService.deleteInventoryItem(id)

  res.status(200).send({
    id,
    object: "inventory_item",
    deleted: true,
  })
}
