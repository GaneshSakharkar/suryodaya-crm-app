import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  const client = new QueryClient();

  return (
    <>
      <QueryClientProvider client={client}>
        <RouterProvider router={router}></RouterProvider>;
      </QueryClientProvider>
    </>
  );
};

export default App;
