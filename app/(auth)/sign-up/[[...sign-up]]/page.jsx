import { SignUp } from "@clerk/nextjs";

const Signup = () => {
  return (
    <div className="flex justify-center items-center md:pt-16">
      <SignUp path="/sign-up" />
    </div>
  );
};

export default Signup;
