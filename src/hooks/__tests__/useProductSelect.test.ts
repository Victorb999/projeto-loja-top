import { renderHook, act, waitFor } from '@testing-library/react'
import { useProductSelect } from '../useProductSelect'
import useStore from '@/store/store'

// Mock do fetch global
global.fetch = jest.fn()

const mockProducts = [
    { id: 1, name: 'Produto A', price: 10.5 },
    { id: 2, name: 'Produto B', price: 20.0 },
]

describe('useProductSelect', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        useStore.setState({
            productsSelected: [],
            itemsProductsSelected: [],
            saleSelected: null
        })
            ; (global.fetch as jest.Mock).mockResolvedValue({
                json: jest.fn().mockResolvedValue(mockProducts),
            })
    })

    it('deve buscar produtos ao montar o hook', async () => {
        renderHook(() => useProductSelect())

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('/api/products?orderBy=name')
        })
    })

    it('deve selecionar um produto e atualizar o preco total', async () => {
        const { result } = renderHook(() => useProductSelect())

        await waitFor(() => {
            expect(result.current.products).toHaveLength(2)
        })

        act(() => {
            result.current.setProductId('1')
        })

        expect(result.current.productSelected?.name).toBe('Produto A')
    })

    it('deve adicionar um produto ao carrinho', async () => {
        const { result } = renderHook(() => useProductSelect())

        await waitFor(() => {
            expect(result.current.products).toHaveLength(2)
        })

        act(() => {
            result.current.setProductId('1')
        })

        await waitFor(() => {
            expect(result.current.productSelected).not.toBeNull()
        })

        act(() => {
            result.current.setQuant(2)
        })

        act(() => {
            result.current.setProductSelectedById()
        })

        expect(useStore.getState().itemsProductsSelected).toHaveLength(1)
        expect(useStore.getState().itemsProductsSelected[0]).toEqual({
            id: 1,
            name: 'Produto A',
            price: 10.5,
            quantity: 2
        })
    })

    it('deve incrementar a quantidade se o produto ja estiver no carrinho', async () => {
        const { result } = renderHook(() => useProductSelect())

        await waitFor(() => {
            expect(result.current.products).toHaveLength(2)
        })

        // Adiciona primeira vez
        act(() => {
            result.current.setProductId('1')
            result.current.setQuant(1)
        })
        act(() => {
            result.current.setProductSelectedById()
        })

        // Adiciona segunda vez
        act(() => {
            result.current.setQuant(3)
        })
        act(() => {
            result.current.setProductSelectedById()
        })

        expect(useStore.getState().itemsProductsSelected).toHaveLength(1)
        expect(useStore.getState().itemsProductsSelected[0].quantity).toBe(4)
    })
})
