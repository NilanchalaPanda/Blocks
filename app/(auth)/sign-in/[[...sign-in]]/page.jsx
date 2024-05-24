import { SignIn } from "@clerk/nextjs";

const Login = () => {
  return (
    <div className="flex justify-center items-center md:pt-20">
      <SignIn path="/sign-in" />
    </div>
  );
};

export default Login;
