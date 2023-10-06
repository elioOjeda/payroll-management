import { MantineProvider } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/supabase";
import styled from "styled-components";
import { AppConsumer, AppProvider } from "./context/AppContext";
import PrivateRouter from "./routes/PrivateRouter";
import PublicRouter from "./routes/PublicRouter";
import { Notifications } from "@mantine/notifications";

const Container = styled.div`
  flex: 1;
  overflow-y: auto;
  margin: 0;
  padding: 0;
`;

function App() {
  const theme = useColorScheme();

  return (
    <MantineProvider
      theme={{ colorScheme: theme }}
      withGlobalStyles
      withNormalizeCSS
    >
      <ModalsProvider
        labels={{ cancel: "Cancelar", confirm: "Confirmar" }}
        modalProps={{ styles: { title: { fontWeight: "bold" } } }}
      >
        <Notifications position="top-right" />

        <QueryClientProvider client={queryClient}>
          <Container>
            <AppProvider>
              <AppConsumer>
                {({ session }) =>
                  session ? <PrivateRouter /> : <PublicRouter />
                }
              </AppConsumer>
            </AppProvider>
          </Container>
        </QueryClientProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
