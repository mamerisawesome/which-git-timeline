import React, { useState, useEffect } from "react";
import { Text, Box } from "ink";
import Gradient from "ink-gradient";
import BigText from "ink-big-text";
import Spinner from "ink-spinner";

type AppProps = {
  currentBranch: string | null;
  defaultBranch: string;
  isMainBranch: boolean;
}

const App = ({ currentBranch, defaultBranch, isMainBranch }: AppProps) => {
  const [frame, setFrame] = useState<number>(0);
  const [showFinalMessage, setShowFinalMessage] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (frame < 5) {
        setFrame(frame + 1);
      } else {
        setShowFinalMessage(true);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [frame]);

  if (!showFinalMessage) {
    return (
      <Box flexDirection="column" alignItems="center">
        <Text>
          <Spinner type="dots" />
          <Text> Analyzing timeline...</Text>
        </Text>
        <Text>Current branch: <Text color="cyan">{currentBranch}</Text></Text>
        <Text>Default branch: <Text color="green">{defaultBranch}</Text></Text>
      </Box>
    );
  }

  const message = isMainBranch
    ? "You are living in the main timeline"
    : "You are not in the main timeline";

  const gradient = isMainBranch ? "cristal" : "rainbow";

  return (
    <Box flexDirection="column" alignItems="center">
      <Gradient name={gradient}>
        <BigText align="center" text={message} />
      </Gradient>

      <Box marginTop={1}>
        <Text>
          Current branch: <Text color="cyan">{currentBranch}</Text>
          {!isMainBranch && (
            <Text>
              <Text color="red"> is not the default branch</Text>
            </Text>
          )}
        </Text>
      </Box>
    </Box>
  );
};

export default App;
