import React from "react";
import { UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";

interface NavbarProps {
  // Define any props you need for your navbar component
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const User = () => {
    const { isSignedIn, user, isLoaded } = useUser();
    if (!isLoaded) {
      return null;
    }

    if (isSignedIn) {
      return <div>Welcome {user.fullName}</div>;
    }
  };

  return (
    <div className="w-full py-8 px-8 flex items-center justify-between">
      <UserButton afterSignOutUrl="#" />
      <User />
    </div>
  );
};

export default Navbar;
