import Header from "@app/_components/Header";

const Provider = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default Provider;
