import { Helmet } from 'react-helmet';
import { useAuth } from 'react-oidc-context';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { flattenRoutes, routes } from '@/route';
import {
  Avatar,
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
import { IconMoonStars, IconSquareLetterM, IconSun } from '@tabler/icons-react';

const Layout = () => {
  const { pathname } = useLocation();
  const auth = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const getTitle = (path: string): string => {
    const r = flattenRoutes.find(route => {
      return route.path === path;
    });
    const paths = [r?.name]; // 首先将原路径放入数组
    let currentPath = path;

    while (currentPath.includes('/')) {
      // 如果当前路径中还有'/'
      // 移除最后一个 '/' 后的字符，得到上一级路径
      currentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
      if (currentPath) {
        // 避免添加空字符串（当路径仅为'/'时）
        const rr = flattenRoutes.find(route => {
          return route.path === currentPath;
        });
        paths.push(rr?.name);
      }
    }

    // 添加根路径
    if (path !== '/') {
      paths.push('Mate');
    }

    return paths.join(' - '); // 反转数组，使路径按从具体到最上级的顺序排列
  };

  return (
    <>
      <Helmet>
        <title>{getTitle(pathname)}</title>
      </Helmet>
      <Flex w="100vw" h="100vh">
        <Stack w="48px" align="center" borderRight={'1px solid gray'}>
          <Box borderBottom={'1px solid gray'}>
            <IconButton aria-label="回到主页" icon={<IconSquareLetterM />} as={Link} to={'/'} variant="ghost" />
          </Box>
          <Grid padding="4px" gap="4px" overflow="scroll">
            {routes.map(item => {
              return (
                <Tooltip
                  key={item.path}
                  label={item.name}
                  placement="right"
                  hasArrow
                  modifiers={[
                    {
                      name: 'offset',
                      options: {
                        offset: [0, 10],
                      },
                    },
                  ]}
                >
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
              <MenuButton>
                <Avatar name={auth.user?.profile.name} size="sm" />
              </MenuButton>
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
    </>
  );
};

export default Layout;
