import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}
//매번 connection 만들지 않도록 방지
//이미 globalThis에 prisma있다면 new PrismaClient()를 호출 방지 할 수 있다.
//model만들어주소 npx prisma db push 명령어 쳐주자.
//npx prisma generate도 같이하자
//npx prisma studio 쓰면 관리자 페이지 접속 가능하다.
const prismadb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prismadb;
export default prismadb;