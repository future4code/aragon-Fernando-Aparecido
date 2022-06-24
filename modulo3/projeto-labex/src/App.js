import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetalhesDeViagem from "./paginas/DetalhesDeViagem";
import PaginaAdmin from "./paginas/PaginaAdmin";
import PaginaInicial from "./paginas/PaginaInicial";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<PaginaInicial/>} />
          <Route path={"/admin"} element={<PaginaAdmin/>} />
          <Route path={"/admin/:id/detalhes"}element={<DetalhesDeViagem/>} />
          <Route path={"*"} element={<></>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
