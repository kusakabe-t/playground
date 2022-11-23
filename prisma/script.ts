import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await findUsersWithPostTrue()
  // await createUserWithPost('Bob', 'bob@prisma.io', 'hello', 'hello world')
}

async function findUsers() {
  const users = await prisma.user.findMany()
  console.log(users)
}

async function findUsersWithPostTrue() {
  const usersWithPosts = await prisma.user.findMany({
    include: {
      posts: true
    }
  })
  console.log(usersWithPosts)
}

async function createUser(name: string, email: string) {
  const user = await prisma.user.create({
    data: {
      name,
      email,
    }
  })
  console.log(user)
}

async function createUserWithPost(name: string, email: string, title: string, content: string) {
 const user = await prisma.user.create({
   data: {
     name,
     email,
     posts: {
       create: {
         title,
         content
       }
     }
   }
 })
  console.log(user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
