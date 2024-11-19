import './App.css';
import RootLayout from "./layouts/RootLayout";
import {Home} from "./pages/Home";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {Character} from "./pages/Character";
import {NotFound} from "./pages/NotFound";
import {Localizations} from "./pages/Localizations";
import {Episodes} from "./pages/Episodes";
import React from "react";


const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />}/>
        <Route path='character' element={<Character />}/>
        <Route path='localizations' element={<Localizations />}/>
        <Route path='episodes' element={<Episodes />}/>
        <Route path="*" element={<NotFound />}/>
    </Route>
))

function App() {
  return (
          <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
