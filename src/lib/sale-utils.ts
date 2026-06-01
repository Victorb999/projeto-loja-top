export interface SaleItemInput {
    id: number;
    quantity: number;
    price: number;
}

/**
 * Calculates the total price of a list of items.
 */
export const calculateSaleTotalPrice = (items: { price: number }[]) => {
    return items.reduce((acc, item) => acc + item.price, 0);
};

/**
 * Maps frontend item selection to the format expected by the API/Prisma.
 */
export const mapItemsToSaleApi = (items: SaleItemInput[], saleId?: number) => {
    return items.map((item) => {
        return {
            productId: item.id,
            saleId: saleId,
            quantity: item.quantity,
            unitaryPrice: item.price,
            totalPrice: item.price * item.quantity,
        };
    });
};

/**
 * Determines if the finalize sale button should be disabled.
 */
export const isFinalizeButtonDisabled = (
    saleSelected: any | null,
    itemsLength: number,
    paymentMethod: string
) => {
    return saleSelected === null || itemsLength === 0 || paymentMethod === "";
};
