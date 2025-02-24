import { getAuthSession } from "@/lib/auth";
import { DropdownUserMenu } from "./dropdown-usermenu";
import LoginButton from "./login-button";

// export type LoginLogoutContainerProps = {};

export const LoginLogoutContainer = async () =>
  // props: LoginLogoutContainerProps
  {
    const session = await getAuthSession();

    const user = session?.user;

    if (!user) {
      return <LoginButton />;
    }

    return <DropdownUserMenu user={user} />;
  };
