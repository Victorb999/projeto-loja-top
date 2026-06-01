import { renderHook, act } from '@testing-library/react'
import { useProduct } from '../useProduct'
import { useToast } from '@/components/ui/use-toast'

// Mock do hook useToast
jest.mock('@/components/ui/use-toast', () => ({
    useToast: jest.fn(),
}))

// Mock do fetch global
global.fetch = jest.fn()

const mockProducts = [
    { id: 1, name: 'Produto A', price: '10.50', priceSpend: '5.00', codeBar: '123', description: 'Desc A', active: true },
    { id: 2, name: 'Produto B', price: '20.00', priceSpend: '10.00', codeBar: '456', description: 'Desc B', active: true },
]

describe('useProduct', () => {
    const mockToast = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
            ; (useToast as jest.Mock).mockReturnValue({ toast: mockToast })
    })

    it('deve inicializar com a lista completa de produtos', () => {
        const { result } = renderHook(() => useProduct(mockProducts))
        expect(result.current.filteredProducts).toHaveLength(2)
    })

    it('deve filtrar produtos por nome (mínimo 3 caracteres)', () => {
        const { result } = renderHook(() => useProduct(mockProducts))

        act(() => {
            result.current.filterProductsByName('Prod')
        })

        expect(result.current.filteredProducts).toHaveLength(2)

        act(() => {
            result.current.filterProductsByName('Produto A')
        })
        expect(result.current.filteredProducts).toHaveLength(1)
    })

    it('deve realizar uma requisição DELETE de produto e mostrar toast', async () => {
        ; (global.fetch as jest.Mock).mockResolvedValue({ ok: true })
        const { result } = renderHook(() => useProduct(mockProducts))

        await act(async () => {
            await result.current.deleteProductRequest(1)
        })

        expect(global.fetch).toHaveBeenCalledWith('/api/product/1', expect.objectContaining({
            method: 'DELETE'
        }))
        expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
            title: "Produto Deletado"
        }))
    })
})
