import { useParams } from "react-router-dom";

export default function TestUseParam() {
  const { storeId } = useParams();

  console.log(storeId);

  return (
    <div>
      <h3>This is test for param/ memoryrouter</h3>
      <div>{storeId}</div>
    </div>
  );
}
