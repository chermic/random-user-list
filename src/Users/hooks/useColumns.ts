import useMedia from 'react-use/lib/useMedia';
import { SemanticWIDTHSNUMBER } from 'semantic-ui-react/dist/commonjs/generic';

export const useColumns = (): SemanticWIDTHSNUMBER | undefined => {
  const isTablet = useMedia('(min-width: 768px)');
  const isDesktop = useMedia('(min-width: 1024px)');

  if (isDesktop) {
    return 4;
  }

  if (isTablet) {
    return 3;
  }

  return undefined;
};
