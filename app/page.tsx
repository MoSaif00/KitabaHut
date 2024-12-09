import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const session = await getUser();
  return (
    <div className="p-10">
      <h1>Hello</h1>
      {session ? (
        <LogoutLink>
          <Button>Log out</Button>
        </LogoutLink>
      ) : (
        <div>
          <RegisterLink>
            <Button>Sign up</Button>
          </RegisterLink>
          <LoginLink>
            <Button>Sign in</Button>
          </LoginLink>
        </div>
      )}

    </div>
  );
}
