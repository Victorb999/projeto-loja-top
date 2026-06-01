import { render, screen, waitFor } from '@testing-library/react'
import ProductsSelectContainer from '../ProductsSelectContainer'
import useStore from '@/store/store'

// Mock dos componentes de UI do Shadcn (necessário para renderizar o SheetContent no JSDOM)
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

const mockProducts = [
    { id: 1, name: 'Produto 1', price: '10', priceSpend: '5', codeBar: '123', description: 'desc', active: true },
    { id: 2, name: 'Produto 2', price: '20', priceSpend: '10', codeBar: '456', description: 'desc', active: true },
]

describe('ProductSelectContainer (Integração)', () => {
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
                json: jest.fn().mockResolvedValue(mockProducts),
            })
    })

    it('deve carregar produtos (lógica real do hook)', async () => {
        render(<ProductsSelectContainer />)

        await waitFor(() => {
            expect(screen.getByText('Produto 1')).toBeInTheDocument()
        })
    })
})
