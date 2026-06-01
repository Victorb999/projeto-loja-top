import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ReportSales } from '../ReportSales'

// Mock do hook useToast (usado internamente pelo useSaleReport)
jest.mock('@/components/ui/use-toast', () => ({
    useToast: () => ({
        toast: jest.fn(),
    }),
}))

// Mock do fetch global
global.fetch = jest.fn()

const mockSales = [
    { id: 1, totalPrice: '100', paymentMethod: 'PIX', firstDate: new Date().toISOString(), createdAt: new Date() },
    { id: 2, totalPrice: '200', paymentMethod: 'Dinheiro', firstDate: new Date().toISOString(), createdAt: new Date() },
]

describe('ReportSales (Integração)', () => {
    beforeEach(() => {
        jest.clearAllMocks()
            ; (global.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockSales),
            })
    })

    it('deve buscar dados e exibir totais (lógica real do hook)', async () => {
        const { container } = render(<ReportSales />)

        const dateInputs = container.querySelectorAll('input[type="date"]')
        fireEvent.change(dateInputs[0], { target: { value: '2023-01-01' } })
        fireEvent.change(dateInputs[1], { target: { value: '2023-01-31' } })

        // Esperamos que o fetch seja chamado E que o conteúdo apareça no DOM
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled()
            // Como 'PIX' e 'Dinheiro' aparecem na tabela E nos cards de total, usamos getAllByText
            expect(screen.getAllByText('PIX').length).toBeGreaterThan(0)
            expect(screen.getAllByText(/100\.00/).length).toBeGreaterThan(0)
            expect(screen.getAllByText('Dinheiro').length).toBeGreaterThan(0)
            expect(screen.getAllByText(/200\.00/).length).toBeGreaterThan(0)
        }, { timeout: 3000 })
    })
})
