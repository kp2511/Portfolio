import React from 'react';
import { Nav, NavLink, NavbarContainer, Span, NavLogo, NavItems, GitHubButton, ButtonContainer, MobileIcon, MobileMenu, MobileLink } from './NavbarStyledComponent';
import { DiCssdeck } from 'react-icons/di';
import { FaBars } from 'react-icons/fa';
import { Bio } from '../../utils/constants';
import { IoIosMoon } from "react-icons/io";
import { MdOutlineWbSunny } from "react-icons/md";
import { ImCross } from "react-icons/im";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to='/'>
          <div className='portfolio-icon'>
            <DiCssdeck size="3rem" /> <Span>Portfolio</Span>
          </div>
        </NavLogo>
        <MobileIcon>
          {darkMode ?
            <MdOutlineWbSunny color='white' size="1.5rem" className='mobile-icons' onClick={() => { setDarkMode(!darkMode) }} />
            :
            <IoIosMoon size="2rem" className='mobile-icons' onClick={() => { setDarkMode(!darkMode) }} />
          }
          {isOpen ?
            <ImCross size="1.25rem" style={{ cursor: 'pointer' }} onClick={() => { setIsOpen(!isOpen) }} /> :
            <FaBars onClick={() => { setIsOpen(!isOpen) }} />
          }
        </MobileIcon>
        <NavItems>
          <NavLink href="#about">About</NavLink>
          <NavLink href='#skills'>Skills</NavLink>
          <NavLink href='#experience'>Experience</NavLink>
          <NavLink href='#projects'>Projects</NavLink>
          <NavLink href='#education'>Education</NavLink>
        </NavItems>
        <ButtonContainer>
          <GitHubButton href={Bio.github} target="_blank">Github Profile</GitHubButton>
        </ButtonContainer>

        {darkMode ?
          <MdOutlineWbSunny color='white' size="4rem" className='top-react-icons' onClick={() => { setDarkMode(!darkMode) }} />
          :
          <IoIosMoon size="4rem" className='top-react-icons' onClick={() => { setDarkMode(!darkMode) }} />
        }
        <MobileMenu isOpen={isOpen}>
          <MobileLink href="#about" onClick={() => {
            setIsOpen(!isOpen)
          }}>About</MobileLink>
          <MobileLink href='#skills' onClick={() => {
            setIsOpen(!isOpen)
          }}>Skills</MobileLink>
          <MobileLink href='#experience' onClick={() => {
            setIsOpen(!isOpen)
          }}>Experience</MobileLink>
          <MobileLink href='#projects' onClick={() => {
            setIsOpen(!isOpen)
          }}>Projects</MobileLink>
          <MobileLink href='#education' onClick={() => {
            setIsOpen(!isOpen)
          }}>Education</MobileLink>
          <GitHubButton href={Bio.github} target="_blank">Github Profile</GitHubButton>
        </MobileMenu>
      </NavbarContainer>
    </Nav>
  )
}

export default Navbar;