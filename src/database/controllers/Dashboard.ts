import { Op } from "sequelize";
import { getMonthsUntilNow } from "../../utils/getMonthsUntilNow";
import { Sales } from "../models/Sales";
import { Shopping } from "../models/Shopping";

export class DashboardController {

  static async getFirstMonth() {
    const firstShoppingMonth = await Shopping.findOne({
      attributes: ['createdAt'],
      order: [
        ['id', 'ASC']
      ]
    }) as Shopping

    const firstSaleMonth = await Sales.findOne({
      attributes: ['createdAt'],
      order: [
        ['id', 'ASC']
      ]
    }) as Sales

    if (!firstSaleMonth && !firstShoppingMonth) {
      return null
    }

    if (firstShoppingMonth && !firstSaleMonth) {
      return getMonthsUntilNow(firstShoppingMonth?.createdAt)
    } else if (!firstShoppingMonth && firstSaleMonth) {
      return getMonthsUntilNow(firstSaleMonth?.createdAt)
    }

    if (firstSaleMonth?.createdAt < firstShoppingMonth?.createdAt) {
      return getMonthsUntilNow(firstSaleMonth?.createdAt)
    }

    return getMonthsUntilNow(firstShoppingMonth?.createdAt)
  }

  static async countShoppings(firstDay: string, lastDay: string) {
    return await Shopping.count({
      where: {
        createdAt: {
          [Op.between]: [firstDay, lastDay]
        }
      }
    })
  }

  static async countSales(firstDay: string, lastDay: string) {
    return await Sales.count({
      where: {
        createdAt: {
          [Op.between]: [firstDay, lastDay]
        }
      }
    })
  }

  static async countProfit(firstDay: string, lastDay: string) {
    const shoppingAmount = await Shopping.sum('amountInCents',
      {
        where: {
          createdAt: {
            [Op.between]: [firstDay, lastDay]
          }
        }
      }
    )

    const salesAmount = await Sales.sum('amountInCents',
      {
        where: {
          createdAt: {
            [Op.between]: [firstDay, lastDay]
          }
        }
      })

    return ((salesAmount - shoppingAmount) / 100)
  }
}