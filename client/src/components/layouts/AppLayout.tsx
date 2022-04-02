import { ReactNode } from "react";
import { Box, Container, createStyles } from "@mantine/core";
import NavBar from "../NavBar";
import { NAVBAR_HEIGHT, NAVBAR_MARGIN_BOTTOM } from "../../configs/uiConfigs";

interface AppLayoutProps {
  children: ReactNode;
}

const useStyles = createStyles(() => ({
  container: {
    height: `calc(100vh - ${NAVBAR_HEIGHT}px - ${NAVBAR_MARGIN_BOTTOM}px)`,
  },
}));

const AppLayout = ({ children }: AppLayoutProps) => {
  const { classes } = useStyles();
  return (
    <Box>
      <NavBar />
      <Container className={classes.container} size="lg">
        {children}
      </Container>
    </Box>
  );
};

export default AppLayout;
