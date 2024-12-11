import {withAuth} from '@kinde-oss/kinde-auth-nextjs/middleware'


export default withAuth({
    loginPage: '/api/auth/[kindeAuth]',
    isReturnToCurrentPage: true,
});

export const config = { matcher:["/dashboard/:path*"]}