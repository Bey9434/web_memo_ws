import Split from "react-split";
import { ClusterList } from "./ClusterList";
import { MemoList } from "./MemoList";
import { MemoForm } from "./MemoForm";

export default function MainLayout() {
  return (
    <Split
      className="split"
      sizes={[20, 40, 40]}
      minSize={180}
      gutterSize={6}
      direction="horizontal"
    >
      <aside className="sidebar">
        <ClusterList />
      </aside>
      <section className="memo-list-container">
        <MemoList />
      </section>
      <section className="form-container">
        <MemoForm />
      </section>
    </Split>
  );
}
