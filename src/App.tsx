import { BrowserRouter, Routes, Route } from "react-router-dom";
import Editor from "./pages/Editor";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="editor" element={<Editor />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
