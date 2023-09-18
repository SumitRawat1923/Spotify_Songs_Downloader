//@ts-nocheck
import Navbar from "../client/Navbar";

function Main({ children, type, info }) {
  console.log(info);
  

  return (
    <div className="bg-gray-bg  w-full relative h-full overflow-y-auto capitalize ">
      <Navbar type={type} info={info} />
      {children} 
    </div>
  );
}

export default Main;

