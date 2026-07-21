import { Suspense } from "react";
import AddProduct from "./addproduct";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddProduct />
    </Suspense>
  );
}