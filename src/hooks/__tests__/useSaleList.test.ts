import { renderHook, act } from '@testing-library/react'
import { useSaleList } from '../useSaleList'
import { useToast } from '@/components/ui/use-toast'

// Mock do Toast
jest.mock('@/components/ui/use-toast', () => ({
    useToast: jest.fn(),
}))

global.fetch = jest.fn()

const mockSales = [
    { id: 1, totalPrice: '100.00', finalDate: '2024-05-01T10:00:00Z', customer: { name: 'João' } },
    { id: 2, totalPrice: '50.00', finalDate: null, customer: { name: 'Maria' } }, // Venda aberta
]

describe('useSaleList', () => {
    const mockToast = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
            ; (useToast as jest.Mock).mockReturnValue({ toast: mockToast })
    })

    it('deve filtrar vendas por status (aberto/fechado)', () => {
        const { result } = renderHook(() => useSaleList(mockSales as any))

        // Filtrar apenas abertas (finalDate === null)
        act(() => {
            result.current.filterSalesByStatus(true)
        })
        expect(result.current.filteredSales).toHaveLength(1)
        expect(result.current.filteredSales[0].id).toBe(2)

        // Filtrar finalizadas
        act(() => {
            result.current.filterSalesByStatus(false)
        })
        expect(result.current.filteredSales).toHaveLength(1)
        expect(result.current.filteredSales[0].id).toBe(1)
    })

    it('deve realizar requisição de deleção de venda', async () => {
        ; (global.fetch as jest.Mock).mockResolvedValue({ ok: true })
        const { result } = renderHook(() => useSaleList(mockSales as any))

        await act(async () => {
            await result.current.deleteSaleRequest(1)
        })

        expect(global.fetch).toHaveBeenCalledWith('/api/sale/1', expect.objectContaining({
            method: 'DELETE'
        }))
    })
})
