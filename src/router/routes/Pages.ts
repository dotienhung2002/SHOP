import { lazy } from "react";

const AppRoutes = [
  {
    path: "/",
    element: lazy(() => import("@Views/pages/home/index")),
  },
];

export default AppRoutes;

//  lazy(() => import("../../views/apps/invoice/list")),

// path:"",
// action,
// caseSensitive,
// children,element,errorElement,handle,hasErrorBoundary,id,index,loader,shouldRevalidate,
