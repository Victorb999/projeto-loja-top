import { renderHook, act, waitFor } from '@testing-library/react'
import { useSaleReport } from '../useSaleReport'
import { useToast } from '@/components/ui/use-toast'

// Mock do fetch global
global.fetch = jest.fn()

const mockSales = [
    { id: 1, totalPrice: '100.50', paymentMethod: 'pix' },
    { id: 2, totalPrice: '50.00', paymentMethod: 'dinheiro' },
    { id: 3, totalPrice: '30.25', paymentMethod: 'pix' },
]

describe('useSaleReport', () => {
    beforeEach(() => {
        jest.clearAllMocks()
            ; (global.fetch as jest.Mock).mockResolvedValue({
                json: jest.fn().mockResolvedValue(mockSales),
            })
    })

    it('deve buscar vendas quando as datas são fornecidas', async () => {
        const params = { dateInitial: '2024-01-01', dateFinal: '2024-01-31' }
        renderHook(() => useSaleReport({ params }))

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('dateInitial=2024-01-01'))
        })
    })

    it('deve calcular totais por método de pagamento corretamente', async () => {
        const params = { dateInitial: '2024-01-01', dateFinal: '2024-01-31' }
        const { result } = renderHook(() => useSaleReport({ params }))

        await waitFor(() => {
            expect(result.current.filteredSales).toHaveLength(3)
        })

        const totals = result.current.totalByPaymentMethod()

        // Pix: 100.50 + 30.25 = 130.75
        // Dinheiro: 50.00
        expect(totals?.pix).toBeCloseTo(130.75)
        expect(totals?.dinheiro).toBe(50.00)
    })
})
