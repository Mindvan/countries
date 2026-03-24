import { Outlet } from 'react-router-dom'
import { useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../providers/ThemeProvider/model/themeContext'
import { Footer } from '../../widgets/footer'
import { Header } from '../../widgets/header'

const Page = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--color-bg);
`

const Container = styled.div`
  flex: 1;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0.75rem 1.25rem 5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const AppLayout = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <Page data-theme={theme}>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </Page>
  )
}
