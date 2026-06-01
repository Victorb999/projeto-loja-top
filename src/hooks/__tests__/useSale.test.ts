import { renderHook, act } from '@testing-library/react'
import { useSale } from '../useSale'
import useStore from '@/store/store'
import { useToast } from '@/components/ui/use-toast'

// Mock do Zustand e Toast
jest.mock('@/components/ui/use-toast', () => ({
    useToast: jest.fn(),
}))

global.fetch = jest.fn()

describe('useSale', () => {
    const mockToast = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
            ; (useToast as jest.Mock).mockReturnValue({ toast: mockToast })
        useStore.setState({
            customerSelected: null,
            itemsProductsSelected: [],
            saleSelected: null,
        })
    })

    it('deve registrar uma nova venda se o ID for "new"', async () => {
        const mockNewSale = { id: 10, numberItems: 0, totalPrice: 0 }
            ; (global.fetch as jest.Mock).mockResolvedValue({
                json: jest.fn().mockResolvedValue({ newSale: mockNewSale }),
            })

        renderHook(() => useSale({ id: 'new' }))

        // Verifica se o fetch foi chamado para criar nova venda
        expect(global.fetch).toHaveBeenCalledWith('/api/sales', expect.objectContaining({
            method: 'POST'
        }))
    })

    it('deve buscar uma venda existente se o ID não for "new"', async () => {
        const mockExistingSale = { id: 5, numberItems: 2, totalPrice: 50.0 }
            ; (global.fetch as jest.Mock).mockResolvedValue({
                json: jest.fn().mockResolvedValue(mockExistingSale),
            })

        renderHook(() => useSale({ id: '5' }))

        expect(global.fetch).toHaveBeenCalledWith('/api/sale/5', expect.objectContaining({
            method: 'GET'
        }))
    })

    it('deve desabilitar o botão de finalizar se não houver itens ou forma de pagamento', () => {
        const { result } = renderHook(() => useSale({ id: 'new' }))

        // Inicialmente sem itens e sem pagamento
        expect(result.current.disableButtonFinish).toBe(true)

        // Simulando estado com itens mas sem pagamento
        act(() => {
            useStore.setState({
                itemsProductsSelected: [{ id: 1, name: 'Prod', price: 10, quantity: 1 }],
                saleSelected: { id: 1 } as any
            })
        })
        expect(result.current.disableButtonFinish).toBe(true)

        // Adicionando pagamento
        act(() => {
            result.current.setPaymentMethod('pix')
        })
        expect(result.current.disableButtonFinish).toBe(false)
    })
})
