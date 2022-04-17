// RichText.tsx in your components folder
import dynamic from "next/dynamic";
import { Skeleton, Box } from "@mantine/core";

export default dynamic(() => import("@mantine/rte"), {
  // Disable during server side rendering
  ssr: false,

  // Render anything as fallback on server, e.g. loader or html content without editor
  loading: () => (
    <Box my="md">
      <Skeleton height={8} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} width="70%" radius="xl" />
    </Box>
  ),
});
