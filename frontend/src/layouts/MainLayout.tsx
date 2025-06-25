import { useState } from 'react';
import {
  Nav,
  NavItem,
  NavList,
  Page,
  Masthead,
  MastheadMain,
  MastheadBrand,
  MastheadContent,
  PageSidebar,
  PageSidebarBody,
  PageToggleButton,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Button,
} from '@patternfly/react-core';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BarsIcon } from '@patternfly/react-icons'; // <-- Ahora sí lo usaremos

export function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const headerToolbar = (
    <Toolbar id="main-layout-toolbar">
      <ToolbarContent>
        <ToolbarItem>{user?.email}</ToolbarItem>
        <ToolbarItem>
          <Button variant="primary" onClick={handleLogout}>Logout</Button>
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );

  const header = (
    <Masthead>
      <PageToggleButton
        variant="plain"
        aria-label="Global navigation"
        isSidebarOpen={isSidebarOpen}
        onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        id="main-nav-toggle"
      >
        <BarsIcon />
      </PageToggleButton>
      <MastheadMain>
        <MastheadBrand href="/">Connected Community</MastheadBrand>
      </MastheadMain>
      <MastheadContent>{headerToolbar}</MastheadContent>
    </Masthead>
  );

  const sidebar = (
    <PageSidebar isSidebarOpen={isSidebarOpen} id="main-layout-sidebar">
      <PageSidebarBody>
        <Nav>
          <NavList>
            <NavItem>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/condominiums">Condominios</NavLink>
            </NavItem>
          </NavList>
        </Nav>
      </PageSidebarBody>
    </PageSidebar>
  );

  return (
    <Page
      masthead={header}
      sidebar={sidebar}
      isManagedSidebar
    >
      <Outlet />
    </Page>
  );
}