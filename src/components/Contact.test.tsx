import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Contact } from './Contact'

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/nombre/i), 'Ana Pérez')
  await user.type(screen.getByLabelText(/email/i), 'ana@example.com')
  await user.type(screen.getByLabelText(/mensaje/i), 'Necesito una landing para mi negocio.')
}

describe('<Contact />', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('muestra errores accesibles y enfoca el primer campo inválido', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()
    render(<Contact />)

    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }))

    const name = screen.getByLabelText(/nombre/i)
    expect(name).toHaveAttribute('aria-invalid', 'true')
    expect(name).toHaveAccessibleDescription(/ingresá tu nombre/i)
    expect(name).toHaveFocus()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('envía el formulario y anuncia el éxito', async () => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ ok: true }))
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()
    render(<Contact />)

    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }))

    expect(await screen.findByRole('status')).toHaveTextContent(/gracias/i)
    expect(fetchMock).toHaveBeenCalledWith('/api/contact', expect.objectContaining({ method: 'POST' }))
    expect(screen.getByLabelText(/nombre/i)).toHaveValue('')
  })

  it('muestra el error del servidor (p. ej. rate limit)', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(Response.json({ error: 'Demasiados mensajes.' }, { status: 429 })),
    )
    const user = userEvent.setup()
    render(<Contact />)

    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }))

    expect(await screen.findByText('Demasiados mensajes.')).toBeInTheDocument()
  })
})
