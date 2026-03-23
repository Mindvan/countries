import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { Footer } from '../../widgets/footer'
import { Header } from '../../widgets/header'

const Page = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
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
  return (
    <Page>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </Page>
  )
}
