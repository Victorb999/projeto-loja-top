import { renderHook, act } from '@testing-library/react'
import { useCustomer } from '../useCustomer'
import { useToast } from '@/components/ui/use-toast'
import { Customer } from '@prisma/client'

// Mock do hook useToast do Shadcn UI
jest.mock('@/components/ui/use-toast', () => ({
    useToast: jest.fn(),
}))

// Mock do fetch global
global.fetch = jest.fn()

const mockCustomers = [
    { id: 1, name: 'João Silva', email: 'joao@example.com' },
    { id: 2, name: 'Maria Souza', email: 'maria@example.com' },
    { id: 3, name: 'José Oliveira', email: 'jose@example.com' },
] as unknown as Customer[]

describe('useCustomer', () => {
    const mockToast = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
            ; (useToast as jest.Mock).mockReturnValue({ toast: mockToast })
    })

    it('deve inicializar com a lista completa de clientes', () => {
        const { result } = renderHook(() => useCustomer(mockCustomers))
        expect(result.current.filteredCustomers).toHaveLength(3)
    })

    it('deve filtrar clientes por nome (mínimo 3 caracteres)', () => {
        const { result } = renderHook(() => useCustomer(mockCustomers))

        act(() => {
            result.current.filterCustomersByName('Mar')
        })

        expect(result.current.filteredCustomers).toHaveLength(1)
        expect(result.current.filteredCustomers[0].name).toBe('Maria Souza')
    })

    it('deve resetar a lista se o filtro for vazio', () => {
        const { result } = renderHook(() => useCustomer(mockCustomers))

        act(() => {
            result.current.filterCustomersByName('Mar')
            result.current.filterCustomersByName('')
        })

        expect(result.current.filteredCustomers).toHaveLength(3)
    })

    it('deve remover um cliente localmente com handleDelete', () => {
        const { result } = renderHook(() => useCustomer(mockCustomers))

        act(() => {
            result.current.handleDelete(1)
        })

        expect(result.current.filteredCustomers).toHaveLength(2)
        expect(result.current.filteredCustomers.find(c => c.id === 1)).toBeUndefined()
    })

    it('deve realizar uma requisição DELETE e mostrar toast de sucesso', async () => {
        ; (global.fetch as jest.Mock).mockResolvedValue({ ok: true })
        const { result } = renderHook(() => useCustomer(mockCustomers))

        await act(async () => {
            await result.current.deleteCustomerRequest(1)
        })

        expect(global.fetch).toHaveBeenCalledWith('/api/customer/1', expect.objectContaining({
            method: 'DELETE'
        }))
        expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
            title: "Cliente Deletado"
        }))
    })

    it('deve mostrar toast de erro se a requisição DELETE falhar', async () => {
        ; (global.fetch as jest.Mock).mockRejectedValue(new Error('Falha na API'))
        const { result } = renderHook(() => useCustomer(mockCustomers))

        await act(async () => {
            await result.current.deleteCustomerRequest(1)
        })

        expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
            variant: "destructive"
        }))
    })
})
