import { useLocation } from "react-router-dom";

import { getHashMessage } from "components/helpers";

type Props = {
  children: (hashMessage: string | null) => JSX.Element;
};

const HashMesssage = ({ children }: Props) => {
  const location = useLocation();
  const hashMessage = getHashMessage(location.hash);

  return <>{children(hashMessage)}</>;
};

export default HashMesssage;
