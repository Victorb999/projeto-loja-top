import { render, screen, fireEvent } from '@testing-library/react'
import { CustomerList } from '../CustomerList'
import { Customer } from '@prisma/client'

// Mock do hook useToast do Shadcn UI (usado internamente pelo useCustomer)
jest.mock('@/components/ui/use-toast', () => ({
    useToast: () => ({
        toast: jest.fn(),
    }),
}))

// Mock do fetch global
global.fetch = jest.fn()

const mockCustomers = [
    { id: 1, name: 'João Silva', email: 'joao@example.com', cpfcnpj: '123' },
    { id: 2, name: 'Maria Souza', email: 'maria@example.com', cpfcnpj: '456' },
] as unknown as Customer[]

describe('CustomerList (Integração)', () => {
    beforeEach(() => {
        jest.clearAllMocks()
            ; (global.fetch as jest.Mock).mockResolvedValue({ ok: true })
    })

    it('deve renderizar a tabela real com os dados iniciais', () => {
        render(<CustomerList customers={mockCustomers} />)

        expect(screen.getByPlaceholderText(/filter by name/i)).toBeInTheDocument()
        expect(screen.getByText('João Silva')).toBeInTheDocument()
        expect(screen.getByText('Maria Souza')).toBeInTheDocument()
    })

    it('deve filtrar a tabela real ao digitar no input (lógica real do hook)', () => {
        render(<CustomerList customers={mockCustomers} />)

        const input = screen.getByPlaceholderText(/filter by name/i)
        fireEvent.change(input, { target: { value: 'João' } })

        // Agora verificamos que Maria Souza sumiu e João Silva permaneceu,
        // garantindo que o hook useCustomer real filtrou a lista.
        expect(screen.getByText('João Silva')).toBeInTheDocument()
        expect(screen.queryByText('Maria Souza')).not.toBeInTheDocument()
    })

    it('deve resetar a lista quando o input for limpo (lógica real do hook)', () => {
        render(<CustomerList customers={mockCustomers} />)

        const input = screen.getByPlaceholderText(/filter by name/i)
        fireEvent.change(input, { target: { value: 'João' } })
        fireEvent.change(input, { target: { value: '' } })

        expect(screen.getByText('João Silva')).toBeInTheDocument()
        expect(screen.getByText('Maria Souza')).toBeInTheDocument()
    })
})
