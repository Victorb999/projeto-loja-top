import { renderHook, act, waitFor } from '@testing-library/react'
import { useCustomerSelect } from '../useCustomerSelect'
import useStore from '@/store/store'
import { Customer } from '@prisma/client'

// Mock do fetch global
global.fetch = jest.fn()

const mockCustomers = [
    { id: 1, name: 'João Silva', email: 'joao@example.com' },
    { id: 2, name: 'Maria Souza', email: 'maria@example.com' },
] as unknown as Customer[]

describe('useCustomerSelect', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        useStore.setState({ customerSelected: null, saleSelected: null })
            ; (global.fetch as jest.Mock).mockResolvedValue({
                json: jest.fn().mockResolvedValue(mockCustomers),
            })
    })

    it('deve buscar clientes ao montar o hook', async () => {
        const { result } = renderHook(() => useCustomerSelect())

        await waitFor(() => {
            expect(result.current.customers).toHaveLength(2)
        })
        expect(global.fetch).toHaveBeenCalledWith('/api/customers?orderBy=name')
    })

    it('deve selecionar um cliente pelo ID', async () => {
        const { result } = renderHook(() => useCustomerSelect())

        await waitFor(() => {
            expect(result.current.customers).toHaveLength(2)
        })

        act(() => {
            result.current.setCustomerSelectedById('1')
        })

        expect(useStore.getState().customerSelected?.name).toBe('João Silva')
    })

    it('deve remover o cliente selecionado', async () => {
        const { result } = renderHook(() => useCustomerSelect())

        act(() => {
            useStore.setState({ customerSelected: mockCustomers[0] })
        })

        expect(useStore.getState().customerSelected).not.toBeNull()

        act(() => {
            result.current.removeClientSelected()
        })

        expect(useStore.getState().customerSelected).toBeNull()
    })
})
