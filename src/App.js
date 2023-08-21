import "./App.css";
import PostForm from "./components/postForm";
import PostsList from "./components/postsList";

function App() {
  return (
    <div className="App my-10 flex flex-col gap-3">
      <PostsList></PostsList>
      <PostForm></PostForm>
    </div>
  );
}

export default App;
