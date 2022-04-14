import React from "react";
import {
  createStyles,
  Container,
  Title,
  Text,
  Button,
  Box,
} from "@mantine/core";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  imageContainer: {
    maxWidth: "360px",
  },

  title: {
    fontWeight: 900,
    fontSize: 34,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  control: {
    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
    margin: "0 auto",
    display: "block",
  },

  desktopImage: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

function NotFoundImage() {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <Box className={classes.imageContainer}>
        <Image
          src={"/images/404_guava.jpg"}
          width={360}
          height={360}
          alt="404 image"
        />
      </Box>

      <div>
        <Title className={classes.title}>Something is not right...</Title>
        <Text color="dimmed" size="lg">
          Page you are trying to open does not exist. You may have mistyped the
          address, or the page has been moved to another URL. If you think this
          is an error contact support.
        </Text>
        <Button variant="outline" size="md" mt="xl" className={classes.control}>
          Get back to home page
        </Button>
      </div>
    </Container>
  );
}

export default NotFoundImage;
