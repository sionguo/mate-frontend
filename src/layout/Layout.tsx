import { useAuth } from 'react-oidc-context';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { routes } from '@/route';
import {
  Box,
  Flex,
  Grid,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react';
import { IconMoonStars, IconSun, IconTriangle, IconUser } from '@tabler/icons-react';

const Layout = () => {
  const { pathname } = useLocation();
  const auth = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex w="100vw" h="100vh">
      <Stack w="48px" align="center" borderRight={'1px solid gray'}>
        <Box borderBottom={'1px solid gray'}>
          <IconButton aria-label="回到主页" icon={<IconTriangle />} as={Link} to={'/'} variant="ghost" />
        </Box>
        <Grid padding="4px" gap="4px">
          {routes.map(item => {
            return (
              <Tooltip key={item.path} label={item.name}>
                <IconButton
                  aria-label={item.name}
                  icon={<item.icon />}
                  as={Link}
                  to={item.path}
                  variant="ghost"
                  isActive={pathname.includes(item.path)}
                />
              </Tooltip>
            );
          })}
        </Grid>

        <Grid padding="4px" gap="4px" marginTop="auto">
          <IconButton
            aria-label="切换主题"
            onClick={toggleColorMode}
            icon={colorMode === 'light' ? <IconMoonStars /> : <IconSun />}
            variant="ghost"
          />

          <Menu placement="right-start">
            <MenuButton as={IconButton} icon={<IconUser />} variant="ghost" />
            <MenuList>
              <MenuItem onClick={() => void auth.signoutRedirect()}>退出登录</MenuItem>
            </MenuList>
          </Menu>
        </Grid>
      </Stack>
      <Flex grow="1">
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default Layout;
