import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

//Redux
// import { Provider } from "react-redux";
// import { store, persistor } from "./redux/store";
// import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <StrictMode>
  //     <Provider store={store}>
  //       <PersistGate loading={null} persistor={persistor}>
  //         <App />
  //       </PersistGate>
  //     </Provider>
  // </StrictMode>
  <StrictMode>
    <App />
  </StrictMode>
);