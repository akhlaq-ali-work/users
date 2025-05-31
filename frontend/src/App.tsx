// import { Button } from "./components/ui/button";

// function App() {
//   return (
//     <div>
//       <p className="text-blue-500">hye hello whats up</p>
//       <Button
//         onClick={() => {
//           alert("Click me! clicked");
//         }}
//       >
//         Click me!
//       </Button>
//     </div>
//   );
// }

// export default App;

import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RouterConfig from "./router/router";
import { useDispatch } from "react-redux";
import { useCheckAuth } from "./hooks/useAuth";
import { loginSuccess } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const { data, isSuccess } = useCheckAuth();

  useEffect(() => {
    if (isSuccess && data.isAuthenticated) {
      dispatch(loginSuccess());
    }
  }, [data, isSuccess]);
  return (
    <Router>
      <RouterConfig />
    </Router>
  );
}

export default App;
