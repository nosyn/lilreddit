import { ReactNode } from "react";
import { Box, Container, createStyles } from "@mantine/core";
import NavBar from "../NavBar";
import { NAVBAR_HEIGHT, NAVBAR_MARGIN_BOTTOM } from "../../configs/uiConfigs";

interface AppLayoutProps {
  children: ReactNode;
}

const useStyles = createStyles(() => ({
  root: {},
  container: {
    height: `calc(100vh - ${NAVBAR_HEIGHT}px - ${NAVBAR_MARGIN_BOTTOM}px)`,
    border: "1px solid red",
  },
}));

const AppLayout = ({ children }: AppLayoutProps) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.root}>
      <NavBar />
      <Container className={classes.container} size="lg">
        {children}
      </Container>
    </Box>
  );
};

export default AppLayout;
