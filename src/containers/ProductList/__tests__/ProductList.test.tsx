import { render, screen, fireEvent } from '@testing-library/react'
import { ProductList } from '../ProductList'

// Mock do hook useToast (usado internamente pelo useProduct)
jest.mock('@/components/ui/use-toast', () => ({
    useToast: () => ({
        toast: jest.fn(),
    }),
}))

// Mock do fetch global
global.fetch = jest.fn()

const mockProducts = [
    { id: 1, name: 'Teclado Mecânico', price: '200', priceSpend: '100', codeBar: '123', description: 'Teclado', active: true },
    { id: 2, name: 'Mouse Gamer', price: '150', priceSpend: '70', codeBar: '456', description: 'Mouse', active: true },
] as any

describe('ProductList (Integração)', () => {
    beforeEach(() => {
        jest.clearAllMocks()
            ; (global.fetch as jest.Mock).mockResolvedValue({ ok: true })
    })

    it('deve renderizar a tabela real com produtos', () => {
        render(<ProductList products={mockProducts} />)

        expect(screen.getByText('Teclado Mecânico')).toBeInTheDocument()
        expect(screen.getByText('Mouse Gamer')).toBeInTheDocument()
    })

    it('deve filtrar a lista ao pesquisar (lógica real do hook)', () => {
        render(<ProductList products={mockProducts} />)

        const input = screen.getByPlaceholderText(/filter by name/i)
        fireEvent.change(input, { target: { value: 'Teclado' } })

        expect(screen.getByText('Teclado Mecânico')).toBeInTheDocument()
        expect(screen.queryByText('Mouse Gamer')).not.toBeInTheDocument()
    })
})
