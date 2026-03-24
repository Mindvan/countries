import { useState } from 'react'
import styled from 'styled-components'

const Page = styled.main`
  min-height: 100%;
  display: grid;
  place-items: center;
`

const Card = styled.form`
  width: 100%;
  max-width: 380px;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-surface);
  box-shadow: 0 1px 3px rgb(15 23 42 / 8%);
`

const Title = styled.h1`
  margin: 0 0 1rem;
  font-size: 1.2rem;
  color: var(--color-text);
`

const Field = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  color: var(--color-text-muted);
`

const Input = styled.input`
  width: 100%;
  margin-top: 0.25rem;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-text);

  &:focus {
    outline: 2px solid var(--color-outline);
    border-color: var(--color-outline);
  }
`

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 0.25rem;
  padding: 0.75rem;
  border: 1px solid var(--color-outline);
  border-radius: 8px;
  background: var(--color-outline);
  color: var(--color-surface);
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: var(--color-outline);
  }
`

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({ email, password })
  }

  return (
    <Page>
      <Card onSubmit={onSubmit}>
        <Title>Авторизация</Title>
        <Field>
          Email
          <Input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Field>
        <Field>
          Пароль
          <Input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Field>
        <SubmitButton type="submit">Войти</SubmitButton>
      </Card>
    </Page>
  )
}