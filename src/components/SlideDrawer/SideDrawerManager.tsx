import { useSideDrawerStore } from '@/stores';
import { SideDrawer } from './SideDrawer';

export const SideDrawerManager = () => {
  const { isOpen, content, setDrawerValues } = useSideDrawerStore();

  return (
    <SideDrawer isOpen={isOpen} onClose={() => setDrawerValues({ isOpen: false })}>
      {content}
    </SideDrawer>
  );
};
