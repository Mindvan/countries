import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ThemeContext } from '../../app/providers/ThemeProvider/model/themeContext'
import { useContext } from 'react'

const NavLink = styled.a`
  padding: 0.45rem 0.7rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text-muted);
  cursor: pointer;
  transition:
    color 0.15s ease,
    background 0.15s ease;

  &:hover {
    color: var(--color-hover-text);
    background: var(--color-hover-bg);
  }

  &:focus-visible {
    outline: 2px solid var(--color-outline);
    outline-offset: 2px;
  }
`

export const Navbar = () => {
  const {theme, toggleTheme} = useContext(ThemeContext)

  return (
    <div>
        <NavLink onClick={toggleTheme}><a>{theme === 'light' ? 'Тема: Светлая' : 'Тема: Тёмная'}</a></NavLink>
        <NavLink><Link to="/">Главная</Link></NavLink>
        <NavLink><Link to="/login">Войти</Link></NavLink>
    </div>
  )
}