import {
    calculateSaleTotalPrice,
    mapItemsToSaleApi,
    isFinalizeButtonDisabled
} from "../sale-utils";

describe("sale-utils", () => {
    describe("calculateSaleTotalPrice", () => {
        it("should return 0 for an empty list", () => {
            expect(calculateSaleTotalPrice([])).toBe(0);
        });

        it("should correctly sum the prices of items", () => {
            const items = [{ price: 10 }, { price: 25.5 }, { price: 5 }];
            expect(calculateSaleTotalPrice(items)).toBe(40.5);
        });
    });

    describe("mapItemsToSaleApi", () => {
        it("should correctly map frontend items to API format", () => {
            const items = [
                { id: 1, quantity: 2, price: 50 },
                { id: 2, quantity: 1, price: 100 },
            ];
            const saleId = 123;

            const result = mapItemsToSaleApi(items, saleId);

            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({
                productId: 1,
                saleId: 123,
                quantity: 2,
                unitaryPrice: 50,
                totalPrice: 100,
            });
        });
    });

    describe("isFinalizeButtonDisabled", () => {
        it("should be disabled if no sale is selected", () => {
            expect(isFinalizeButtonDisabled(null, 1, "pix")).toBe(true);
        });

        it("should be disabled if items list is empty", () => {
            expect(isFinalizeButtonDisabled({}, 0, "pix")).toBe(true);
        });

        it("should be disabled if payment method is empty", () => {
            expect(isFinalizeButtonDisabled({}, 1, "")).toBe(true);
        });

        it("should be enabled if all conditions are met", () => {
            expect(isFinalizeButtonDisabled({}, 1, "pix")).toBe(false);
        });
    });
});
