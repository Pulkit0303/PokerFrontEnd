import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GroupList, GroupDetail, SessionDetail, SessionList } from "./pages";
import SignInPage from "./components/auth/SignInPage";
import SignUpPage from "./components/auth/SignUpPage";
function App() {
  return (
    <Router>
      <div>
        <SignedOut>
          <Routes>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="*" element={<SignInPage />} />
          </Routes>
        </SignedOut>

        <SignedIn>
          <main className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<GroupList />} />
              <Route path="/groups" element={<GroupList />} />
              <Route path="/groups/:groupId" element={<GroupDetail />} />
              <Route
                path="/groups/:groupId/sessions"
                element={<SessionList />}
              />
              <Route
                path="/groups/:groupId/sessions/:sessionId"
                element={<SessionDetail />}
              />
            </Routes>
          </main>
        </SignedIn>
      </div>
    </Router>
  );
}

export default App;
