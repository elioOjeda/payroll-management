import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/public/SignIn";

export default function PublicRouter() {
  return (
    <Routes>
      <Route path="sign-in" element={<SignIn />} />

      <Route path="*" element={<SignIn />} />
    </Routes>
  );
}
