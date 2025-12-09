import type { FC, ReactNode } from 'react';
import { Drawer, type DrawerProps, styled } from '@mui/material';

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '30%',
    minWidth: '300px',
    maxWidth: '900px',
    padding: theme.spacing(3),
    boxSizing: 'border-box',
  },
}));

interface SideDrawerProps extends Omit<DrawerProps, 'onClose'> {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  anchor?: 'left' | 'right' | 'top' | 'bottom';
}

export const SideDrawer: FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  children,
  anchor = 'right',
  ...props
}) => {
  return (
    <StyledDrawer anchor={anchor} open={isOpen} onClose={onClose} {...props}>
      {children}
    </StyledDrawer>
  );
};
