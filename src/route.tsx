import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from '@/layout';
import { Callback, Login } from '@/pages/auth';
import Todo from '@/pages/todo';
import {
  IconAutomation,
  IconCalendar,
  IconDashboard,
  IconFiles,
  IconListCheck,
  IconPalette,
} from '@tabler/icons-react';

export interface RouteConfig {
  name: string;
  path: string;
  icon: React.ComponentType<any>;
  component: JSX.Element;
  children?: RouteConfig[];
}

export const routes: RouteConfig[] = [
  { name: '控制台', path: '/dashboard', icon: IconDashboard, component: <>控制台</> },
  {
    name: '任务',
    path: '/todos',
    icon: IconListCheck,
    component: <Todo />,
  },
  {
    name: '日历',
    path: '/calendar',
    icon: IconCalendar,
    component: <>日历</>,
  },
  { name: '文件', path: '/files', icon: IconFiles, component: <>文件</> },
  { name: '画板', path: '/draw', icon: IconPalette, component: <>画板</> },
  { name: '自动化', path: '/automation', icon: IconAutomation, component: <>自动化</> },
];

const flattenTree = (tree: RouteConfig[]): RouteConfig[] => {
  return tree.reduce((result: RouteConfig[], node: RouteConfig) => {
    result.push(node);
    if (node.children) {
      result.push(...flattenTree(node.children));
    }
    return result;
  }, []);
};

export const flattenRoutes = flattenTree(routes);

/**
 * 生成路由树
 * @param routes 路由
 * @returns 路由树
 */
const generateRoutes = (routes: RouteConfig[]): JSX.Element[] => {
  return routes.map((route, idx) => {
    const { path, component, children } = route;

    if (children && children.length > 0) {
      // 如果有子路由，递归生成子Route
      return (
        <Route path={path} key={path} element={component}>
          <Route>{generateRoutes(children)}</Route>
          <Route path={path} element={<Navigate to={children[0].path} replace />} />
        </Route>
      );
    }
    // 如果没有子路由，直接返回Route
    return <Route path={path} key={path} element={component} index={idx === 0} />;
  });
};

export const authedRoutes = (
  <Routes>
    <Route element={<Layout />}>{generateRoutes(routes)}</Route>
    <Route path="/" element={<Navigate to={routes[0].path} replace />} />
    <Route path="/login" element={<Navigate to="/" replace />} />
    <Route path="/callback" element={<Callback />} />
  </Routes>
);

export const noneAuthedRoutes = (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/callback" element={<Callback />} />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);
