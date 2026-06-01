import { render, screen, fireEvent } from '@testing-library/react'
import { SalesList } from '../SalesList'

// Mock do hook useToast (usado internamente pelo useSaleList)
jest.mock('@/components/ui/use-toast', () => ({
    useToast: () => ({
        toast: jest.fn(),
    }),
}))

// Mock do fetch global
global.fetch = jest.fn()

const mockSales = [
    { id: 1, totalPrice: '100', paymentMethod: 'Card', finalDate: new Date(), createdAt: new Date(), numberItems: 2 },
    { id: 2, totalPrice: '200', paymentMethod: 'Cash', finalDate: null, createdAt: new Date(), numberItems: 1 },
] as any

describe('SalesList (Integração)', () => {
    beforeEach(() => {
        jest.clearAllMocks()
            ; (global.fetch as jest.Mock).mockResolvedValue({ ok: true })
    })

    it('deve renderizar a tabela real com vendas', () => {
        render(<SalesList sales={mockSales} />)

        expect(screen.getByText('Card')).toBeInTheDocument()
        expect(screen.getByText('Cash')).toBeInTheDocument()
    })

    it('deve filtrar por vendas pendentes (lógica real do hook)', () => {
        render(<SalesList sales={mockSales} />)

        fireEvent.click(screen.getByText(/Filtrar pendentes/i))

        // Venda 2 é pendente (finalDate: null), usa pagamento 'Cash'
        expect(screen.getByText('Cash')).toBeInTheDocument()
        expect(screen.queryByText('Card')).not.toBeInTheDocument()
    })

    it('deve filtrar por vendas finalizadas (lógica real do hook)', () => {
        render(<SalesList sales={mockSales} />)

        fireEvent.click(screen.getByText(/Filtrar finalizadas/i))

        // Venda 1 é finalizada (finalDate: Date), usa pagamento 'Card'
        expect(screen.getByText('Card')).toBeInTheDocument()
        expect(screen.queryByText('Cash')).not.toBeInTheDocument()
    })

    it('deve mostrar todas as vendas ao resetar filtro', () => {
        render(<SalesList sales={mockSales} />)

        fireEvent.click(screen.getByText(/Filtrar pendentes/i))
        fireEvent.click(screen.getByText(/Todas/i))

        expect(screen.getByText('Card')).toBeInTheDocument()
        expect(screen.getByText('Cash')).toBeInTheDocument()
    })
})
