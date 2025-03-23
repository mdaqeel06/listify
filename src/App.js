import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppContextProvider } from "./context/appContext";
import Layout from "./components/Layout";
import ScreenBlocker from "./components/ScreenBlocker";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <AppContextProvider>
        <ScreenBlocker>
          <Layout />
        </ScreenBlocker>
      </AppContextProvider>
    </DndProvider>
  );
};

export default App;
