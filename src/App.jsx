import "./index.css";
import Button from "./components/Button";
import Quiz from "./components/Quiz";
import { useGlobalContext } from "./context";

const App = () => {
  const {mode} = useGlobalContext();

  return (
    <>
      <main
        id="main-bg"
        className="flex h-screen justify-center items-center bg-slate-400 p-10"
      >
        {!mode ? (
          <Button/>
        ) : (
          <Quiz/>
        )}
      </main>
    </>
  );
};

export default App;
