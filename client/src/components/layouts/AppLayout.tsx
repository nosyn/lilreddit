import { ReactNode } from "react";
import { Box, Container, createStyles } from "@mantine/core";
import NavBar from "../NavBar";
import { NAVBAR_HEIGHT } from "../../configs";

interface AppLayoutProps {
  children: ReactNode;
}

const useStyles = createStyles(() => ({
  container: {
    paddingTop: `calc(${NAVBAR_HEIGHT}px + 10px)`,
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
