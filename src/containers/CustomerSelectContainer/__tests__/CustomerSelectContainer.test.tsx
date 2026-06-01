import { render, screen, waitFor } from '@testing-library/react'
import CustomerSelectContainer from '../CustomerSelectContainer'
import { Customer } from '@prisma/client'
import useStore from '@/store/store'

// Mock dos componentes de UI do Shadcn
jest.mock('@/components/ui/sheet', () => ({
    Sheet: ({ children }: any) => <div data-testid="mock-sheet">{children}</div>,
    SheetContent: ({ children }: any) => <div data-testid="mock-sheet-content">{children}</div>,
    TableHeader: ({ children }: any) => <div>{children}</div>,
    SheetHeader: ({ children }: any) => <div>{children}</div>,
    SheetTitle: ({ children }: any) => <div>{children}</div>,
    SheetDescription: ({ children }: any) => <div>{children}</div>,
    SheetTrigger: ({ children }: any) => <div>{children}</div>,
}))

// Mock do SelectList para facilitar o teste de integração
jest.mock('@/components/SelectList/SelectList', () => ({
    SelectList: ({ items, onSelect }: any) => (
        <div data-testid="mock-select-list">
            {items.map((item: any) => (
                <button key={item.id} onClick={() => onSelect(item.id)}>
                    {item.name}
                </button>
            ))}
        </div>
    )
}))

// Mock do fetch global
global.fetch = jest.fn()

const mockCustomers = [
    { id: 1, name: 'João Silva', email: 'joao@example.com' },
    { id: 2, name: 'Maria Souza', email: 'maria@example.com' },
] as unknown as Customer[]

describe('CustomerSelectContainer (Integração)', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        useStore.setState({
            customerSelected: null,
            productsSelected: [],
            itemsProductsSelected: [],
            saleSelected: null,
        })
            ; (global.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockCustomers),
            })
    })

    it('deve carregar clientes (lógica real do hook)', async () => {
        render(<CustomerSelectContainer />)

        await waitFor(() => {
            expect(screen.getByText('João Silva')).toBeInTheDocument()
        })
    })
})
